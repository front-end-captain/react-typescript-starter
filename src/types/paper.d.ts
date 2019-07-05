import { ResponsePagination } from "./response";

export interface getPaperListQuery {
  page?: number;
  size?: number;
  name?: string;
  // 1 是获取全部; 默认为 0
  all: 1 | 0;
}

export interface PaperListItem {
  id: number;
  name: string;
  examTime: number;
  createTime: number;
  creator: string;
}

export type PaperList = PaperListItem[];

export type PaperListData = { pagination: ResponsePagination, list: PaperList };

export type DelPaperResult = number;

export type CheckPaperCanEditResult = number;
