import { useState, useEffect, useRef } from "react";

import { useRequest, FetchCallback } from "./useRequest";
import { ResponsePagination } from "@/types/response";

type Condition = Partial<{
  [key: string]: any;
}>;

interface TableData {
  pagination?: ResponsePagination;
  list?: [];
}

const useTable = <T>(fetchCallback: FetchCallback<T>, searchConditions: Condition = {}) => {
  const defaultSize = 10;
  const defaultPage = 1;

  const [currentPage, setCurrentPage] = useState<number>(defaultPage);
  const [pageSize, setPageSize] = useState<number>(defaultSize);
  const [condition, setCondition] = useState<Condition>({ ...searchConditions });
  const [reload, setReload] = useState<boolean>(false);

  const prevReloadRef = useRef<boolean>(reload);

  const { fetching, data, error, doSendRequest } = useRequest<T>(fetchCallback, {
    page: currentPage,
    size: pageSize,
    ...condition,
  });

  useEffect(() => {
    if (reload && !prevReloadRef.current) {
      doSendRequest();
    }
  }, [reload]);

  const handlePaginationChange = (current: number, pageSize: number | undefined) => {
    setCurrentPage(current);
    setPageSize(pageSize || defaultSize);
  };

  const handleSearch = (condition = {}) => {
    setCondition(condition);
  };

  const reloadTable = () => {
    setReload(!reload);
  };

  const resetPagination = () => {
    setCurrentPage(defaultPage);
    setPageSize(defaultSize);
  };

  const dataSource = (data as TableData).list || [];
  const pagination = (data as TableData).pagination || { total: 0 };

  return {
    loading: fetching,
    error,
    data: dataSource,
    pagination,
    handlePaginationChange,
    currentPage,
    pageSize,
    handleSearch,
    reloadTable,
    resetPagination,
  };
};

export { useTable };
