const Router = require("express").Router();

let PAPER_LIST = require("./../db/paperList.js");
let COURSE_LIST = require("./../db/courseList.js");

/**
 * 获取试卷列表
 * @param {number} page?
 * @param {number} size?
 * @param {string} name? paper name
 * @param {boolean} all? 获取所有
 */
Router.post("/list", (request, response) => {
  let {
    body: { page = 1, size = 10, name = "", all = 0 },
  } = request;

  page = Number(page);
  size = Number(size);
  name = name.trim();
  all = Number(all);

  if (all === 1) {
    return response.json({
      code: 1,
      message: "success",
      data: {
        pagination: { page: Number(page), pageSize: Number(size), total: PAPER_LIST.length },
        list: PAPER_LIST.map((paper) => {
          return {
            id: paper.id,
            name: paper.name,
            examTime: paper.examTime,
            createTime: paper.createTime,
            creator: paper.creator,
          };
        }),
      },
    });
  }

  let paperList = [];

  if (name) {
    paperList = PAPER_LIST.filter((paper) => {
      return paper.name === name;
    }).map((paper) => {
      return {
        id: paper.id,
        name: paper.name,
        examTime: paper.examTime,
        createTime: paper.createTime,
        creator: paper.creator,
      };
    });

    return response.json({
      code: 1,
      message: "success",
      data: {
        pagination: { page: Number(page), pageSize: Number(size), total: paperList.length },
        list: paperList,
      },
    });
  }

  paperList = PAPER_LIST.slice(size * (page - 1), size * page).map((paper) => {
    return {
      id: paper.id,
      name: paper.name,
      examTime: paper.examTime,
      createTime: paper.createTime,
      creator: paper.creator,
    };
  });

  return response.json({
    code: 1,
    message: "success",
    data: {
      pagination: { page: Number(page), pageSize: Number(size), total: PAPER_LIST.length },
      list: paperList,
    },
  });
});

/**
 * 获取某一个试卷的详情
 * @param {number} 试卷ID
 */
Router.get("/:id", (request, response) => {
  const paperId = request.params.id;

  const targetPaper = PAPER_LIST.find((paper) => paper.id === Number(paperId));

  if (!targetPaper) {
    return response.json({ code: -1, message: "paper not found", data: null });
  }

  return response.json({ code: 1, message: "success", data: targetPaper });
});

/**
 * 创建试卷
 * @method {post}
 * @param {object} { name: string; examTime: number; creator: string; totalScore: number; questions: Array<questionItem> }
 * questionItem: { type: 1 | 2, stem: string; options: []string; answer: []number; explain: string }
 */
Router.post("/", (request, response) => {
  const {
    body: { paper },
  } = request;

  const id = PAPER_LIST.length + 1;
  const createTime = new Date().getTime();

  const newPapers = PAPER_LIST.concat([{ ...paper, id, createTime }]);

  PAPER_LIST = newPapers;

  response.status(200);
  response.json({ code: 1, message: "success", data: id });
});

/**
 * 删除试卷
 *
 * @param {number} 试卷ID
 */
Router.delete("/:id", (request, response) => {
  const paperId = request.params.id;

  const targetPaper = PAPER_LIST.find((paper) => paper.id === Number(paperId));

  if (!targetPaper) {
    return response.status(200).json({ code: -1, message: "paper not exist", data: null });
  }

  let targetPaperBoundByCourse;

  let contentList = [];
  COURSE_LIST.forEach((course) => {
    course.catalogs.forEach((catalog) => {
      catalog.contents.forEach((content) => {
        if (content.type === 2) {
          contentList.push(content);
        }
      });
    });
  });

  targetPaperBoundByCourse = contentList.some((content) => {
    return content.relatedContentId === Number(paperId);
  });

  // 试卷被某一个课程关联，不允许删除
  if (targetPaperBoundByCourse) {
    return response.status(200).json({
      code: -2,
      message: "the paper you will deleted was be bound someone course",
      data: null,
    });
  }

  const newPapers = PAPER_LIST.filter((paper) => {
    return paper.id !== Number(paperId);
  });

  PAPER_LIST = newPapers;

  response.status(200);
  response.json({ code: 1, message: "success", data: paperId });
});

/**
 * 更新试卷
 * @param {object} { id: number; name: string; examTime: number; creator: string; questions: Array<questionItem> }
 * questionItem: { type: 1 | 2, stem: string; options: []string; answer: []number; explain: string }
 */
Router.put("/", (request, response) => {
  const {
    body: { paper },
  } = request;

  const targetId = paper.id;

  const targetPaper = PAPER_LIST.find((paper) => paper.id === Number(targetId));

  if (!targetPaper) {
    return response.status(200).json({ code: -1, message: "paper not exist", data: null });
  }

  const updatedPaper = paper;

  const newPapers = PAPER_LIST.map((paper) => {
    if (paper.id === Number(targetId)) {
      return updatedPaper;
    }

    return paper;
  });

  PAPER_LIST = newPapers;

  response.status(200);
  response.json({ code: 1, message: "success", data: targetId });
});

Router.get("/check/:paperName", (request, response) => {
  const { paperName } = request.params;

  const repeated = PAPER_LIST.some((item) => {
    return item.name === paperName;
  });

  return response.json({ code: 1, message: "success", data: repeated });
});


Router.get("/check/editable/:paperId", (request, response) => {
  const { paperId } = request.params;

  const editable = true;

  if (editable) {
    return response.json({ code: 1, message: "can edit", data: paperId });
  }

  return response.json({ code: -1, message: "can not edit", data: paperId });
});

module.exports = Router;
