import XYRequest from "../request"

//请求城市相关的数据

//获取全部的城市信息(国内、海外)
export function getCityAll(){
  return XYRequest.get({
    url:"/city/all"
  })
}