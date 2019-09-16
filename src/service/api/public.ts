import { domain } from "../domain";

export const getServerTime: () => Promise<ResponseSharp.ServerTimeData> = function() {
  return new Promise<ResponseSharp.ServerTimeData>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("post", `${domain}/public/time`);

    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response: ResponseSharp.ResponseData<ResponseSharp.ServerTimeData> = JSON.parse(xhr.response);

        if (response.code === 1) {
          resolve(response.data);
        } else {
          reject(new Error("fetch server time fail"));
        }
      }
    };

    xhr.send();
  });
};
