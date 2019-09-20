import axios from 'axios'

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
  return Promise.reject(error)
})

export default axios
