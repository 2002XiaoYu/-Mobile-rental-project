import { defineStore } from "pinia";
import { getHomeHotSuggests ,getHomeCategories, getHomeHouseList} from "@/service"

const useHomeStore = defineStore("home",{
  state:()=>({
    hotSuggest:[null],
    categories:[],
    currentPage:1,
    HouseList:[]
  }),
  actions:{
    async fetchHotSuggestData(){
      const res = await getHomeHotSuggests()
      this.hotSuggest = res.data
    },
    //热门分类信息
    async fetchCategoriesData(){
      const res = await getHomeCategories()//完成获取数据的时候需要先去其他页面调用网络请求，不然一开始是没有数据的
      this.categories = res.data
    },

    //首页房子列表
    async fetchHouseList(){
      const res = await getHomeHouseList(this.currentPage)
      this.HouseList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore