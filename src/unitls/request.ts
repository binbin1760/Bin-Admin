import axios, { AxiosRequestConfig, Axios } from 'axios'
import { getUserInfo } from './userInfoStorage'

export interface Pagination {
  pageSize: number
  page: number
  total: number
}

export interface BaseResponse<T> {
  data: T
  code: number
  pagination: Pagination
  message: string
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
      config.headers['Authorization'] = `bear ${user.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { data } = response

    if (data.code === 200) {
      return Promise.reject(data.data)
    }

    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export { service as request }
