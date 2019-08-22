import { request } from "../request";

import { ResponseData } from "@/types/response";
import schema from "@/types/types.json";

import { Validator } from "jsonschema";

import { getPaperListQuery, PaperListData, CheckPaperCanEditResult } from "@/types/paper";
import { AxiosResponse } from "axios";

const v = new Validator();
v.addSchema(schema, "/api");

const validateResponseData = (response: AxiosResponse<ResponseData>, type: string) => {
  const data = response.data.data;
  const result = v.validate(data, {
    $ref: `api#/definitions/${type}`,
  });

  // 校验失败，数据不符合预期， 此处应该进行 前端异常上报， 如 sentry 之类的
  if (!result.valid) {
    console.log("data is ", data);
    console.log("errors", result.errors.map((item) => item.toString()));
  }

  return response;
};

export const getPapers = (params: getPaperListQuery) => {
  return request.post<ResponseData<PaperListData>>("/papers/list", { ...params }).then((response) => validateResponseData(response, "PaperListData"));
};


export const deletePaper = ({ paperId }: { paperId: number} ) => {
  return request.delete(`/papers/${paperId}`);
};

export const checkPaperCanEdit = (paperId: number) => {
  return request.get<ResponseData<CheckPaperCanEditResult>>(`/papers/check/editable/${paperId}`)
};
