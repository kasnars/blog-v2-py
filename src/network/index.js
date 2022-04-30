import axios from 'axios'
import store from '../store/index'
import { showFullScreenLoading, tryHideFullScreenLoading } from  './serviceHelp'
const baseURL = 'http://124.221.134.79:80/'
axios.defaults.baseURL = baseURL;
// axios.defaults.baseURL = 'http://localhost:7001/';
export default function setAxios() {
  const token = localStorage.getItem('getToken')
  //请求拦截
  axios.interceptors.request.use(
    config => {
      config.headers['Authorization'] = `Bearer ${token}`
      if (token) {
        // 将token设置在headers ['Authorization'] 上面
        config.headers['Authorization'] = `Bearer ${token}`
      }
      // if (config.showLoading){
      //   showFullScreenLoading()
      // }
      return config
    }
  )

  // axios.interceptors.response.use(  response => {
  //   if (response.config.showLoading){
  //     tryHideFullScreenLoading()
  //   }
  // })
}

export const httpGet = (url,data={},noAuth=false) =>{
  if (!noAuth) {
    const tokenYzx = window.localStorage.getItem('tokenYzx')
    return axios.get(url, {
      params: {
        token: tokenYzx,
        ...data
      }
    })
  } else {
    return axios.get(url, {
      params: {
        ...data
      }
    })
  }

}

export const httpPost = (url,data={},query={},auth=false) => {
  const tokenYzx = window.localStorage.getItem('tokenYzx')
  if(auth && !tokenYzx){
    let asyncRes = new Promise((res,rej) => {
      rej('未登录')
    })
    return asyncRes
  } else {
    return axios.post(url, data, {
      params: {
        token: tokenYzx,
        ...query
      }
    })
  }
}