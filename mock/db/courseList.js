module.exports = [
  {
    id: 1,
    createTime: 1558432473444,
    name: "初培阶段一",
    stage: 1,
    type: 1,
    creator: "joey",
    userId: 0,
    status: -1,
    catalogs: [
      {
        index: 1000,
        name: "培训理论讲解1",
        contents: [
          {
            index: 1,
            type: 1,
            name: "培训理论讲解",
            relatedContentId: "cf1561601980931",
            relatedContentName: "培训课件1",
            searchCondition: [1, 2, 3, 4],
          },
          {
            index: 2,
            type: 2,
            name: "培训理论考核",
            relatedContentId: 1,
            relatedContentName: "培训试卷",
            searchCondition: "培训",
          },
        ],
      },
      {
        index: 1001,
        name: "实训课程第二期",
        contents: [
          {
            index: 1,
            type: 1,
            name: "培训理论讲解1",
            relatedContentId: "cf1561530338626",
            relatedContentName: "培训课件2",
            searchCondition: [1, 2, 1, 1],
          },
          {
            index: 2,
            type: 2,
            name: "培训理论考核2",
            relatedContentId: 2,
            relatedContentName: "培训试卷2",
            searchCondition: "培训",
          },
          {
            index: 3,
            type: 1,
            name: "培训理论讲解3",
            relatedContentId: "cf1561534245110",
            relatedContentName: "培训课件3",
            searchCondition: [1, 2, 4, 1],
          },
        ],
      },
    ],
  },
];
