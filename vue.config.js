// -----------------------------
const [TYPE, STATUS] = ['LOTTERY_365', ''] // 365皮肤
// const [TYPE, STATUS] = ['LOTTERY_TF', ''] // 同发皮肤
// const [TYPE, STATUS] = ['LOTTERY_HM', ''] // 黑马皮肤
// const [TYPE, STATUS] = ['LOTTERY_IG', ''] // IG皮肤
// -----------------------------
module.exports = {
  lintOnSave: 'warning',
  publicPath: './',
  outputDir: `${TYPE}${STATUS}`,
  devServer: {
    port: 8080,
    open: true
  },
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      // 增加环境变量
      let appIcon = ''
      switch (TYPE) {
        case 'LOTTERY_365':
          appIcon = `"365_"`
          break
        case 'LOTTERY_HM':
          appIcon = `"hm_"`
          break
        case 'LOTTERY_TF':
          appIcon = `"tf_"`
          break
        case 'LOTTERY_IG':
          appIcon = `"ig_"`
          break
      }
      Object.assign(args[0]['process.env'], { 'APP_ICO': appIcon }) // 图标路径
      Object.assign(args[0]['process.env'], { [TYPE]: 'true' }) // 文件环境变量
      !args[0]['process.build'] && (args[0]['process.build'] = {})
      Object.assign(args[0]['process.build'], {
        [TYPE]: 'true',
        TYPE: `"${TYPE}"`,
        STATUS: `"${STATUS}"`
      })// js环境变量
      return args
    })
  },
  css: {
    loaderOptions: {
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.scss` 这个文件
        data: `@import "@/style/${TYPE}${STATUS}.global.scss";`
      }
    }
  }
}
