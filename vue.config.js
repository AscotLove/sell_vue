const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    open: true,

    proxy: {
      '/4000': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://192.168.3.113:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/4000': ""
        }
      },
      '/baidu': { // 匹配所有以 '/baidu'开头的请求路径
        target: 'http://www.baidu.com', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/baidu'
          '^/baidu': ''
        }
      }
    },
    overlay: {
      warnings: false,
      errors: false
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        'components': resolve('src/components'),
        "pages": resolve('src/pages'),
        "@store": resolve('src/store')
      }
    },
  }
}