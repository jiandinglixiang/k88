module.exports = {
  baseURL () {
    if (process.env.NODE_ENV === 'production') {
      return 'http://tgapi.k888.bet/H5'
      // return 'http://tgapi.666esport.com/H5' /* 测试服务器 */
    } else {
      return `/dev/H5` /* 测试服务器 */
      // return '/prod/H5'
    }
  }
}
