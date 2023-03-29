import { defineStore } from "pinia";

// 初始化时间
const startDate = new Date()//现在的时间
const endDate = new Date()
endDate.setDate(startDate.getDate()+1)

const useMainStore = defineStore("main",{
  state:()=>({
    token:"",
    isLoading:true,
    startDate:startDate,
    endDate:endDate
  })
})

export default useMainStore