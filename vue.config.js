//vue.config.js
//开启跨域代理
module.exports = {
  devServer: {
   proxy : {
      "/api" : {
        target : "http://community.chavy.top", //服务器地址
        changeOrigin: true,  //是跨域请求
        ws : true,
        pathRewrite: {
          '^/api': '/api'
        }
      }
   }
  }
}
