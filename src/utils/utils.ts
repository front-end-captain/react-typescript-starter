const extractSearch = (input: string) => {
  const queryStart = input.indexOf("?");
  if (queryStart === -1) {
    return "";
  }
  return input.slice(queryStart + 1);
};


/**
 * @description 将 URL 的查询部分解析为键值对形式
 *
 * @param {string} input URL
 */
export const parseUrl = (input: string) => {
  let searchStr = extractSearch(input);

  const ret = Object.create(null);

  searchStr = searchStr.trim().replace(/^[?#&]/, "");

  for (const param of searchStr.split("&")) {
    let [key, value] = param.replace(/\+/g, " ").split("=");
    if (key) {
      ret[key] = value ? value : null;
    }
  }

  return {
    url: input.split("?")[0] || "",
    query: ret,
  };
};

/**
 * 将一个对象序列化为 query string
 * { page: 1, size: 10 } => page=1&size=10
 *
 * @param {object} params
 * @see https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
 */
export const serialize = (params = {}) => {
  const searchParams = new URLSearchParams(params);

  return searchParams.toString();
};
