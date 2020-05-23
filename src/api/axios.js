// 设置了baseUrl和超时时间的axios实例
import axios from "axios";
const instance  = axios.create({
  baseURL : "http://community.chavy.top",
  timeout : 3000
});
export default instance;

//请求拦截器
instance.interceptors.request.use((config) => {
  /*config.headers.token = localStorage.token;*/
/*  config.headers['Access-Control-Allow-Origin'] = '*';*/
  return config;
}, function (error) {
  return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use((config) => {
  console.log(config);
  /*const data = response.data;
  const status = data.status;
  const realData = data.data;*/
  /*return Promise.reject(data);*/
  return config;
}, function (error) {
  return Promise.reject(error);
});

