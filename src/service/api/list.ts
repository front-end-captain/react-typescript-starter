import { serialize } from "@/src/utils/utils";
import { request } from "./../request";


type Params = {
  currentPage?: number;
  pageSize?: number;
  name?: string;
};

/**
 *
 * @param {object} params { currentPage?: number; pageSize?: number; name?: string }
 */
export const getList = (params: Params) => {
  return request.get(`/list?${serialize(params)}`);
};

