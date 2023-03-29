import XYRequest from "@/service/request"

export function getDatailInfos(houseId){
  return XYRequest.get({
    url:"/detail/infos",
    params:{
      houseId
    }
  })
}