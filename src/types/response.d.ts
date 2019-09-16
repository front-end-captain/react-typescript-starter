declare namespace ResponseSharp {
  export interface ResponseData<T = any> {
    /**
     * 状态码
     *
     * @type {number}
     */
    code: number;

    /**
     * 消息
     *
     * @type {number}
     */
    message?: string;

    /**
     * 数据
     *
     * @type {T}
     */
    data: T;
  }

  export interface ResponsePagination {
    page: number;
    pageSize: number;
    total: number;
  }

  export interface ServerTimeData {
    timestamp: number;
    date: string;
    dateString: string;
  }
}
