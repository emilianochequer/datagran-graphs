import { REQUEST_URL } from "../utils/constants";

const get = (action = "/", params, source) => {
  return fetch(`${REQUEST_URL}${action}`, {
    params: {
      ...params,
    },
    ...source,
  });
};

export default { get };
