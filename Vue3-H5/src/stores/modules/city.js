import { getCityAll } from "@/service";
import { defineStore } from "pinia";

//参数1：id，参数2：内容
const useCityStore = defineStore("city",{
  state:()=> ({
    allCities:{},
    //通常保存的不能是单独一个城市
    currentCity:{cityName:"请选择城市"}
  }),
  actions:{
    //取得全部城市数据
    async fetchAllCitiesData(){
      const res = await getCityAll()
      this.allCities = res.data
    }
  }
})

export default useCityStore

