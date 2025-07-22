import axios, { AxiosRequestConfig, Axios } from 'axios'
import { getUserInfo } from './userInfoStorage'
import router from '@/router'
export interface BaseResponse<T> {
  data: T
  code: number
  pagination?: Pagination
  message: string
}

export interface Pagination {
  pageSize: number
  page: number
  total: number
}
interface MyAxiosInstance extends Axios {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(config: AxiosRequestConfig): Promise<BaseResponse<T>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T = any>(url: string, config?: AxiosRequestConfig): Promise<BaseResponse<T>>
}

const service = axios.create({
  timeout: 5000,
  withCredentials: true
}) as MyAxiosInstance

const user = getUserInfo()

service.interceptors.request.use(
  (config) => {
    if (user.token) {
      config.headers['Authorization'] = `Bearer ${user.token}`
    }
    config.headers['Content-Type'] = 'application/json'
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data } = response
    return data
  },
  (error) => {
    //token验证未通过,跳转登录页
    if (error.status === 401 || error.status === 403) {
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export { service as request }
