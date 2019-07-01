// http服务
import Axios from 'axios'
import { user } from '../common/store'
import md5 from 'js-md5'
import { baseURL } from '../baseURL'

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
  console.log(data)
  switch (data.code * 1) {
    case 10003:
      data.msg = '登录已过期,请重新登录!'
      break
    case 1022303:
      data.msg = '昵称包含敏感词'
      break
    default:
      data.msg = '昵称包含敏感词'
  }
  return data
}

function transform (data) {
  if (Object.prototype.toString.call(data) === '[object FormData]') {
    return data
  }
  const formData = new FormData()
  data && Object.keys(data).forEach(function (key) {
    // console.log(key)
    data[key] && formData.append(key, data[key])
  })
  return formData
}

const Request = Axios.create({
  'timeout': 1000,
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
const Http = {
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
    const data2 = await Request.get(url, { params, data })
    // if (data2.data.code * 1 !== 0) return Promise.reject(new Error({ msg: '错误' }))
    return { data: data2.data }
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
    const data2 = await Request.post(url, data, { params })
    // if (data2.data.code * 1 !== 0) return Promise.reject(new Error({ msg: '错误' }))
    return { data: data2.data }
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
  }
}

export default HTTP
