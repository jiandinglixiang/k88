export function baseURL () {
  if (process.env.NODE_ENV === 'production') {
    return 'http://tgapi.k888.bet/H5'
    // return 'http://tgapi.666esport.com/H5' /* 测试服务器 */
  } else {
    return '/test' /* 测试服务器 */
    // return '/H5'
  }
}
