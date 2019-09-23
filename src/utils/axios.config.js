import axios from 'axios'
import router from '../permission'
import jsonBig from 'json-bigint'
import { Message } from 'element-ui'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

axios.defaults.transformResponse = [function (data) {
  return data ? jsonBig.parse(data) : ''// 变换转换方式，使得计算更精确，保证大数字不失真
}]
// 请求拦截
axios.interceptors.request.use(function (config) {
  // 统一注入token
  config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('user-token')}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  // 对请求失败做处理
  let status = error.response.status
  let message = '未知错误'
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = 'refresh_token未携带或已过期'
      break
    case 507:
      message = '服务器或数据库异常'
      break
    case 401:
      message = 'token未传或已过期'
      window.localStorage.clear()
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      window.localStorage.clear()
      router.push('/login')
      break
    default:
      break
  }
  Message({ message, type: 'warning' })

  return new Promise(function () {}) // 终止当前的错误
})

export default axios
