import axios from "axios"
const httpInstance = axios.create({
  baseURL: "http://geek.itheima.net/v1_0",
  timeout: 5000,
})

// 请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    return res.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default httpInstance
