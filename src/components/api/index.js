import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, //当前请求为跨域类型时在请求中协带cookie
  timeout: 10000,
});

export const get = (url, params) => {
  return instance({
    methods: "GET",
    url,
    params,
  });
};

export default instance;
