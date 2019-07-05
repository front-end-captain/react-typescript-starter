import { serialize } from "@/utils/utils";
import { request } from "../request";

import { ResponseData } from "@/types/response";

import { getPaperListQuery, PaperListData, CheckPaperCanEditResult } from "@/types/paper";


export const getPapers = (params: getPaperListQuery) => {
  return request.get<ResponseData<PaperListData>>(`/papers?${serialize(params)}`);
};


export const deletePaper = ({ paperId }: { paperId: number} ) => {
  return request.delete(`/papers/${paperId}`);
};

export const checkPaperCanEdit = (paperId: number) => {
  return request.get<ResponseData<CheckPaperCanEditResult>>(`/papers/check/editable/${paperId}`)
};
