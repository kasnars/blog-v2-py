module.exports = {
  publicPath:'./',
  devServer: {
    proxy: {
      "/juheapi": { //自定义
        target: "http://apis.juhe.cn", //这里可以跟随项目实际部署服务器来
        changeOrigin: true,
        ws: true,
      }
    }
  }
}