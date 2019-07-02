import { useState, useEffect, useRef } from "react";

import { useRequest, FetchCallback } from "./useRequest";

const useTable = (fetchCallback: FetchCallback, searchConditionList = {}) => {
  const defaultSize = 10;
  const defaultPage = 1;
  const [currentPage, setCurrentPage] = useState(defaultPage);
  const [pageSize, setPageSize] = useState(defaultSize);
  const [condition, setCondition] = useState({ ...searchConditionList });
  const [reload, setReload] = useState(false);
  const prevReloadRef = useRef(reload);

  const { loading, data, error, doRequest } = useRequest(fetchCallback, {
    page: currentPage,
    size: pageSize,
    ...condition,
  });

  useEffect(() => {
    if (reload && !prevReloadRef.current) {
      doRequest();
    }
  }, [reload]);

  const handlePaginationChange = (current: number, pageSize: number) => {
    setCurrentPage(current);
    setPageSize(pageSize);
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

  const dataSource = data.list ? data.list : [];
  const pagination = data.pagination ? data.pagination : {};

  return {
    loading,
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
