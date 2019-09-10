import axios from 'axios'
import jsonBigInt from 'json-bigint'
import store from '@/store'
import router from '@/router'

// 为适应以后的多服务器请求，将axios实例化
let instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn',
  timeout: 2000
})

// 配置请求拦截和响应拦截
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.token
  // const token = localStorage.getItem('user')
  if (token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  // 对返回的数据结构简化操作
  return response.data.data || response.data
}, async function (error) {
  // 401表示token过期或未登录
  if (error.response.status === 401) {
    // 检测vuex是否存在token，如果存在说明是过期则用refresh_token获取最新的token
    if (store.state.token.token) {
      const refreshToken = store.state.token.refresh_token
      // 携带refresh_token去获取新的可用token
      try {
        const result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${refreshToken}`
          }
        })
        const newToken = result.data.data.token
        // 将请求回来的新token存储在vuex
        store.commit('setUserToken', {
          token: newToken,
          refresh_token: refreshToken
        })
        // 重新发送请求
        return instance(error.config)
      } catch (error) {
        router.push({ path: '/login', query: { direct: router.currentRoute.fullPath } })
      }
    }
  }
  // return Promise.reject(error)
})

// 大数字处理（原因是在存储数据时以自增Number最为唯一标识，当数据量达到一定量级时这个数字就超出了Number的最大安全整数，
// 此时继续自增就得不到准确的计算结果，那么就需要进行大数字处理。）
instance.defaults.transformResponse = [data => {
  try {
    return jsonBigInt.parse(data)
  } catch (error) {
    return data
  }
}]

export default instance
