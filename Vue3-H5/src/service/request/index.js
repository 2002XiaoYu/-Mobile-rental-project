import axios from 'axios'
import { BASE_URL,TIMEOUT } from './config'
import useMainStore from '@/stores/modules/mian';
const mainStore = useMainStore()

class XYRequest {
  constructor(baseURL, timeout=10000) {
    // 创造instance实例
    this.instance = axios.create({
      baseURL,
      timeout
    })
    //对实例上添加拦截器
    // 请求拦截
    this.instance.interceptors.request.use(config=>{
      mainStore.isLoading = true
      return config
    },err=>{
      return err
    })
    // 响应拦截
    this.instance.interceptors.response.use(res=>{
      mainStore.isLoading = false
      return res
    },err=>{
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    mainStore.isLoading = true
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new XYRequest(BASE_URL,TIMEOUT)