import { request } from "../request";

import { ResponseData } from "@/types/response";

import { getPaperListQuery, PaperListData, CheckPaperCanEditResult } from "@/types/paper";

const testData = {
  title: "viking",
  sex: 1,
  list: [{ name: "tom", age: 1 }, { name: "tom", age: 1 }],
  city: { key: 1, value: "北京", arr: [1, { name: "hello" }] }
};

export const getPapers = (params: getPaperListQuery) => {
  return request.post<ResponseData<PaperListData>>("/papers/list", { ...params, ...testData });
};


export const deletePaper = ({ paperId }: { paperId: number} ) => {
  return request.delete(`/papers/${paperId}`);
};

export const checkPaperCanEdit = (paperId: number) => {
  return request.get<ResponseData<CheckPaperCanEditResult>>(`/papers/check/editable/${paperId}`)
};
