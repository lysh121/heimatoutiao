import axios from 'axios'

axios.interceptors.request.use(function (config) {
  // 统一注入token
  config.headers['Authorization'] = `Bearer ${window.localStorage.getItem('user-token')}`
  return config
}, function (error) {
  // 对请求失败做处理
  return Promise.reject(error)
})

export default axios
