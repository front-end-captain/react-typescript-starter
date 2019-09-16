import { request } from "../request";

import schema from "@/types/types.json";

import { Validator } from "jsonschema";

import { getPaperListQuery, PaperListData, CheckPaperCanEditResult, DelPaperResult } from "@/types/paper";
import { AxiosResponse } from "axios";

const v = new Validator();
v.addSchema(schema, "/api");

const validateResponseData = (response: AxiosResponse<ResponseSharp.ResponseData>, type: string) => {
  const data = response.data.data;
  const result = v.validate(data, {
    $ref: `api#/definitions/${type}`,
  });

  if (!result.valid) {
    // console.log("data is ", data);
    // console.log(result);
    // console.error("errors", result.errors.map((item) => item.toString()));
    console.table(result.errors);
  }

  return response;
};

const requestUrlAndResponseMap: { [key: string]: { url: string, responseTypeName: string } } = {
  getPapers: {
    url: "/papers/list",
    responseTypeName: "PaperListData",
  },
};

export const getPapers = (params: getPaperListQuery) => {
  return request
    .post<ResponseSharp.ResponseData<PaperListData>>(requestUrlAndResponseMap[getPapers.name].url, { ...params })
    .then((response) => validateResponseData(response, requestUrlAndResponseMap[getPapers.name].responseTypeName));
};

export const deletePaper = ({ paperId }: { paperId: number }) => {
  return request
    .post<ResponseSharp.ResponseData<DelPaperResult>>(`/papers/${paperId}`)
    .then((response) => validateResponseData(response, "DelPaperResult"));
};

export const checkPaperCanEdit = (paperId: number) => {
  return request
    .post<ResponseSharp.ResponseData<CheckPaperCanEditResult>>(`/papers/check/editable/${paperId}`)
    .then((response) => validateResponseData(response, "CheckPaperCanEditResult"));
};
