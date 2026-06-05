import axios, {
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosInstance
} from 'axios'
import { clearUserInfo, getUserInfo } from './userInfoStorage'
import router from '@/router'

export interface QueueItem {
  config: InternalAxiosRequestConfig
  reslove: (value: AxiosResponse) => void
  reject: (reson: any) => void
}

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
class Request {
  private instance: AxiosInstance
  private queue: QueueItem[] = []

  private activeCount = 0 // 当前正在请求数量
  private maxConcurrent = 5 //最大请求并发数

  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 5000,
      withCredentials: true
    })

    this.instance.interceptors.request.use(
      (config) => {
        const user = getUserInfo()
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

    this.instance.interceptors.response.use(
      (response) => {
        return response
      },
      (error) => {
        //token验证未通过,跳转登录页
        if (error.status === 401 || error.status === 403) {
          clearUserInfo()
          router.push('/login')
        }
        return Promise.reject(error)
      }
    )
  }

  private enqueue(config: InternalAxiosRequestConfig): Promise<AxiosResponse> {
    return new Promise((reslove, reject) => {
      this.queue.push({ config, reslove, reject })
      this.dequeue()
    })
  }

  private dequeue() {
    if (this.activeCount >= this.maxConcurrent) return
    if (this.queue.length === 0) return
    this.activeCount++
    const item = this.queue.shift()
    if (!item) return
    this.instance
      .request(item.config)
      .then((res) => item.reslove(res))
      .catch((err) => item.reject(err))
      .finally(() => {
        this.activeCount--
        this.dequeue() //继续执行下一个
      })
  }

  request<T = any>(config: AxiosRequestConfig): Promise<T> {
    return this.enqueue(config as InternalAxiosRequestConfig).then(
      (res) => res.data as T
    )
  }

  get<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ) {
    return this.request<T>({ ...config, method: 'GET', url, params: data })
  }

  post<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ) {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }
}
export default new Request()
