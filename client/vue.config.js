module.exports = {
  publicPath: "./",
  // baseUrl: "./",
  outputDir: "publish",
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 7779,
    // proxy: {
    //   // 配置多个代理(配置一个 proxy: 'http://localhost:4000' )
    //   "/api": {
    //     target: "http://localhost:7788",
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}