// -----------------------------
const { baseURL } = require('./baseURL')
const outputURL = baseURL().match(/(\w+):\/\/([^/:]+)(:\d*)?([^# ]*)/)
const environmentType = 'K88'// 365电竞
// -----------------------------
module.exports = {
  // lintOnSave: 'warning',
  publicPath: './',
  outputDir: `${environmentType}-${(outputURL && outputURL[2]) || 'dev'}`,
  devServer: {
    port: 8080,
    open: false,
    overlay: {
      warnings: true,
      errors: true
    },
    proxy: {
      '^/dev/H5': {
        target: 'http://tgapi.666esport.com', // 代理转发地址
        changeOrigin: true,
        pathRewrite: { '^/dev/H5': '/H5' }
      },
      '^/prod/H5': {
        target: 'http://tgapi.k888.bet', // 代理转发地址
        secure: false,
        changeOrigin: true,
        pathRewrite: { '^/prod/H5': '/H5' }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      // 增加环境变量
      let appIcon = `'${environmentType}_favicon.ico'`
      let appName = `'${environmentType}体育'`
      Object.assign(args[0]['process.env'], { 'APP_ICON': `${appIcon}` })
      Object.assign(args[0]['process.env'], { 'APP_NAME': `${appName}` })
      Object.assign(args[0]['process.env'], { [environmentType]: 'true' })
      return args
    })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/style/LOTTERY_${environmentType}.global.scss";`
      }
    }
  }
}
