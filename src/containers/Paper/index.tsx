import React, { useEffect, FunctionComponent, FormEvent } from "react";
import { Button, Form, Col, Input, Row, Card, Divider, Table, message } from "antd";
import Moment from "moment";
import { ColumnProps } from "antd/es/table/interface";

import { useTable } from "@/hooks/useTable";
import { useTriggerRequest } from "@/hooks/useRequest";
import { getPapers, deletePaper, checkPaperCanEdit } from "@/api/paper";

import { StandardTableWrapper } from "@/style/public.css";
import { PaperListData, PaperListItem, DelPaperResult, CheckPaperCanEditResult } from "@/types/paper";
import { FormComponentProps } from "antd/lib/form";

const { Item: FormItem } = Form;

interface ExamPapersProps extends FormComponentProps {};

const ExamPapersComponent: FunctionComponent<ExamPapersProps> = (props) => {
  const {
    data,
    loading,
    handlePaginationChange,
    currentPage,
    pageSize,
    pagination,
    handleSearch,
    reloadTable,
  } = useTable<PaperListData>(getPapers, { name: "" });

  const {
    doSendRequest: delPaper,
    responseData: delPaperResult,
    fetching: deletingPaper
  } = useTriggerRequest<DelPaperResult>(
    deletePaper,
    reloadTable,
  );

  const {
    doSendRequest: checkPaperEditable,
    fetching: checkingPaperEditable,
    responseData: checkPaperEditableResult,
  } = useTriggerRequest<CheckPaperCanEditResult>(checkPaperCanEdit);

  console.log(delPaperResult);

  // 删除试卷处理
  useEffect(() => {
    if (delPaperResult.code === -2 && !deletingPaper) {
      message.error("本试卷已被关联，请解绑后删除");
    }
  }, [delPaperResult, deletingPaper, delPaper]);

  useEffect(() => {
    if (checkPaperEditableResult.code === 1 && !checkingPaperEditable) {
      console.log("can edit");
    }
    if (checkPaperEditableResult.code === -1 && !checkingPaperEditable) {
      message.error("当前时间段属于考试时间，请稍候进行修改");
    }
  }, [checkPaperEditableResult, checkingPaperEditable, checkPaperEditable]);

  const onSearch = (event: FormEvent) => {
    event.preventDefault();

    const {
      form: { validateFields },
    } = props;

    validateFields((error, fieldsValue) => {
      if (error) {
        return;
      }

      handleSearch({ ...fieldsValue });
    });
  };

  const renderSearchForm = () => {
    const {
      form: { getFieldDecorator },
    } = props;

    return (
      <Form layout="inline" onSubmit={onSearch}>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="试卷名称">
              {getFieldDecorator("name")(<Input placeholder="请输入试卷名称" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span>
              <Button type="primary" icon="search" htmlType="submit">
                查询
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  };

  const papersTableColumn: Array<ColumnProps<PaperListItem>> = [
    {
      title: "试卷名称",
      dataIndex: "name",
    },
    {
      title: "试卷时长",
      dataIndex: "examTime",
      render: (record) => {
        return `${record} 分钟`;
      },
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      render: (record) => {
        return Moment(record).format("YYYY-MM-DD HH:mm:mm");
      },
    },
    {
      title: "创建人",
      dataIndex: "creator",
    },
    {
      title: "操作",
      render: (record) => (
        <>
          <Button type="link">
            查看
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={() => checkPaperEditable({ paperId: record.id })}>
            编辑
          </Button>
          <Divider type="vertical" />
          <Button type="link" loading={deletingPaper} onClick={() => delPaper({ paperId: record.id })}>
            删除
          </Button>
        </>
      ),
    },
  ];

  const realLoading = typeof loading === "object" ? false : loading;

  return (
    <Card>
      <StandardTableWrapper>
        <div className="table-list-form ">{renderSearchForm()}</div>
        <div className="table-list-operator" style={{ marginBottom: "20px" }}>
          <Button
            key="create"
            icon="plus"
            type="primary"
          >
            新建试卷
          </Button>
        </div>

        <Table
          loading={realLoading}
          columns={papersTableColumn}
          dataSource={data}
          rowKey={(record) => record.id.toString()}
          pagination={{
            total: pagination.total,
            showSizeChanger: false,
            current: currentPage,
            pageSize,
            onChange: handlePaginationChange,
          }}
        />
      </StandardTableWrapper>
    </Card>
  );
};

const ExamPapers = Form.create<ExamPapersProps>()(ExamPapersComponent);

export { ExamPapers };
