// http服务
import Axios from 'axios'
import { user } from '../common/store'
import md5 from 'js-md5'
import { baseURL } from '../../baseURL'
import store from '../store'
import Toast from '../common/toast.js'

function randomWord (randomFlag, min, max) {
  var str = ''
  var range = min
  var arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (var i = 0; i < range; i++) {
    var pos = Math.round(Math.random() * (arr.length - 1))
    str = str + arr[pos]
  }
  return str
}

function codeInit (data) {
  // code识别初始化message
  if (!data) {
    console.log(data)
    return {}
  }
  switch (data.code * 1) {
    case 10003:
      data.msg = '登录已过期,请重新登录!'
      store && store.commit('CLEAR_TOKEN')
      Toast(data.msg)
      break
    case 1022303:
      data.msg = '昵称包含敏感词'
      break
    case 10006:
      data.msg = '余额不足,请充值'
      break
    default:
  }
  return data
}

function transform (data) {
  const type = Object.prototype.toString.call(data)
  if (type === '[object FormData]') {
    return data
  } else if (type === '[object Object]') {
    return JSON.stringify(data)
  }
  return data
  // const formData = new FormData()
  // data && Object.keys(data).forEach(function (key) {
  //   // console.log(key)
  //   formData.append(key, data[key] || '')
  // })
  // return formData
}

const Request = Axios.create({
  'timeout': 15000,
  'baseURL': baseURL(),
  'headers': { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
  'transformRequest': [transform],
  'transformResponse': [codeInit],
  'withCredentials': false, // default
  'responseType': 'json', // default
  'xsrfCookieName': 'XSRF-TOKEN', // default
  'xsrfHeaderName': 'X-XSRF-TOKEN' // default
})
/*
// 添加请求拦截器
Request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log(config)
  return config
})

添加响应拦截器
Request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log(response)

  return response
}, function (error) {
  console.log(error)
  Toast('错误')
  return Promise.reject(error)
})
*/
export const Http = {
  async get (url, params = {}, data = {}) {
    const data1 = await Request.get('/Index/getTime')
    if (data1.data.code * 1 !== 0) return Promise.reject(new Error({ msg: '错误' }))
    const Token = user.getToken() || ''
    const secretKey = 'ikD12opAwZE1Sobg'
    const nonce = randomWord(true, 5, 32)
    const timestamp = data1.data.data - ((Date.parse(new Date())) / 1000) + ((Date.parse(new Date())) / 1000)
    const sign = md5(Token + timestamp + nonce + secretKey)
    params.timestamp = timestamp
    params.nonce = nonce
    params.ssign = sign
    params.token = Token
    return Request.get(url, { params, data }).then(function (response) {
      if (response.data.code * 1 !== 0) return Promise.reject(response.data)
      return response.data.data
    })
  },
  async post (url, data = {}, params = {}) {
    const data1 = await Request.get('/Index/getTime')
    if (data1.data.code * 1 !== 0) return Promise.reject(new Error({ msg: '错误' }))
    const Token = user.getToken() || ''
    const secretKey = 'ikD12opAwZE1Sobg'
    const nonce = randomWord(true, 5, 32)
    const timestamp = data1.data.data - ((Date.parse(new Date())) / 1000) + ((Date.parse(new Date())) / 1000)
    const sign = md5(Token + timestamp + nonce + secretKey)
    params.timestamp = timestamp
    params.nonce = nonce
    params.ssign = sign
    params.token = Token
    return Request.post(url, data, { params }).then(function (response) {
      if (response.data.code * 1 !== 0) return Promise.reject(response.data)
      return response.data.data
    })
  }
}

export const HTTP = {
  demo1 (name, name2) {
    return Http.get('/Index/getTime', { name, name2 }, {})
  },
  demo2 (name, name2) {
    return Http.post('/Index/getTime', { name, name2 }, {})
  },
  getOrderDetail (OrderId) {
    return Http.get('/Order/detail', { order_id: OrderId })
  },
  getOrderDetailRequest (OrderId) {
    return Http.get('/Order/program', { order_id: OrderId, offset: 0, limit: 100000 })
  },
  getLotteryGetJcList (lotteryId, playType) {
    return Http.get('/Lottery/getJcList', { 'lottery_id': lotteryId, 'play_type': playType })
  },
  getUserInfo () {
    return Http.get('/User')
  },
  getUserCouponList (id) {
    return Http.get('/User/couponList', { lottery_id: id })
  },
  postWebBetPreBetYp (Orders) {
    // {"Orders":[{"series":"101","lottery_id":901,"play_type":1,"stake_count":"1","total_amount":"122","schedule_orders":[{"bet_number":"v281","schedule_id":"415574","is_sure":"0","odds":"1.90"}]},]}
    const mdStr = `${Orders.lottery_id}${Orders.play_type}${parseInt(Orders.total_amount)}Ehcv2b1AvWAMSey2`
    return Http.post(`/WebBet/preBetYp?lottery_id=${Orders.lottery_id}&product_name=LHCP&sign=${md5(mdStr)}`, { Orders: [Orders] })
  },
  postBetSubmitPay (red, id, sign) {
    // {"coupon_id":"28","id":"PB190722113515JNEE5Q","sign":"2461821f43d0a88f094827d0921b0c40","product_name":"LHCP"}
    return Http.post('/Bet/submitPay', { 'coupon_id': red, id, sign, 'product_name': 'LHCP' })
  }
}

export default HTTP
