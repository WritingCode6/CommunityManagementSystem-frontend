// 设置了baseUrl和超时时间的axios实例
// 在打包部署时使用
/*import axios from "axios";

const instance  = axios.create({
  baseURL : "http://community.chavy.top",
  timeout : 3000,
  withCredentials: true
});

//请求拦截器
instance.interceptors.request.use((config) => {
  /!*config.headers.token = localStorage.token;*!/
  //console.log(config)
  return config;
}, function (error) {
  //console.log(error)
  return Promise.reject(error);
});

//响应拦截器
instance.interceptors.response.use((config) => {
  //console.log(config);
  return config;
}, function (error) {
  //console.log(error)
  return Promise.reject(error);
});

export default instance;*/
