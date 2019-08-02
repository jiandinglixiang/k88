import { Http } from '../grounder/http.js'
import Toast from '../common/toast.js'

// 错误拦截提示
export default {
  post (...arg) {
    return Http.post(...arg).catch(function (err) {
      if (err.msg) Toast(err.msg)
      return Promise.reject(err)
    })
  },
  get (...arg) {
    return Http.get(...arg).catch(function (err) {
      switch (err.code) {
        case 1090301:
          err.msg = '商品已下架'
          break
        case 1090302:
          err.msg = '积分不足'
          break
        case 1090303:
          err.msg = '每日兑换次数限制'
          break
        case 1060202:
          err.msg = '红包已失效'
          break
        case 1060201:
          err.msg = '兑换码无效'
          break
        case 1060207:
          err.msg = '超过兑换次数'
          break
        case 1060101:
          err.msg = '红包不存在'
          break
        case 1060102:
          err.msg = '红包已失效'
          break
      }
      if (err.msg) Toast(err.msg)
      return Promise.reject(err)
    })
  }
}
