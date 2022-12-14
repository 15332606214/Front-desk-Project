// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true
// })

module.exports = {
  lintOnSave:'warning',

// 代理跨域
  devServer: { //只用于开发环境
    proxy: {
      '/api': { //只能请求路由以/api开头的请求进行代理转发
        target:'http://gmall-h5-api.atguigu.cn', //转发的目标url
        changeOrigin:true //支持跨域
      }
    }
  }
}
