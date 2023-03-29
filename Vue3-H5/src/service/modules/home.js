import XYRequest from "../request"

//城市的网络请求
export function getHomeHotSuggests(){
  return XYRequest.get({
    url:"/home/hotSuggests"
  })
}

//热门分类
export function getHomeCategories(){
  return XYRequest.get({
    url:"/home/categories"
  })
}

export function getHomeHouseList(currentPage = 1){//没有传输默认为1
  return XYRequest.get({
    url:"/home/houselist",
    params:{
      page:currentPage//返回的数据不能够定死,应该由页面传递信息过来要求需要哪部分的数据
    }
  })
}