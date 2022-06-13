import axios from 'axios'
import { Notification, MessageBox } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建Axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})

service.interceptors.request.use(config => {
// Do something before request is sent
  config.headers['X-Requested-With'] = 'XMLHttpRequest'
  config.headers['Cache-Control'] = 'no-cache' // 解决 类似360浏览器Ajax缓存问题
  config.headers.Pragma = 'no-cache'
  if (store.getters.token) {
    config.headers.Authorization = getToken()
  }
  return config
}, error => {
// Do something with request error
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  // Do something before response is sent
  const headers = response.headers
  const res = response.data
  if (headers.authorization && headers.authorization.length > 0) {
    store.dispatch('user/reloadToken', headers.authorization)
  }
  if (res.code !== 200) {
    Notification.error({
      title: '服务请求异常',
      message: res.message || 'Error'
    })
    if (res.code === 401 || res.code === 403) {
      MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        confirmButtonText: '重新登录',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch('user/resetToken').then(() => {
          location.reload()
        })
      })
    } else {
      return Promise.reject(new Error(res.message || 'Error'))
    }
  }
  return res
}, error => {
  Notification.error({
    title: '服务请求异常',
    message: error.message || 'Error'
  })
  return Promise.reject(error)
})

export default service
