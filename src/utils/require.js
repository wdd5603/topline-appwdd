import axios from 'axios'
import jsonBigInt from 'json-bigint'
import store from '@/store'

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
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
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
