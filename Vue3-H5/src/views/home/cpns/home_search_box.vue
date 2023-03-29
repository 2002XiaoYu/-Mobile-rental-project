<script setup>
//引入路由

import useCityStore from '@/stores/modules/city';
import useHomeStore from "@/stores/modules/home"
import useMainStore from '@/stores/modules/mian';
import home_categories from "./home_categories.vue"
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import {ref,computed} from "vue"
import {formatMonthDay , getDiffDays}  from "@/utils/format_date.js"

const router = useRouter()

//跳转选择城市
const cityClick = ()=>{
  router.push("/city")
}

//点击调用城市信息
const positionClick = ()=>{
  //Geolocation.getCurrentPosition() 方法用来获取设备当前位置。
  navigator.geolocation.getCurrentPosition(res =>{
    console.log("获取位置成功：",res);
  },err =>{
    console.log("获取位置失败：",err);
  },{
    enableHighAccuracy:true,
    timeout:5000,//超时的时间
    maximumAge:0
  })
}

//从pinia中获取点击的城市信息
const cityStore = useCityStore()
//引入pinia中保存的城市信息
const { currentCity } = storeToRefs(cityStore)

//处理日期
const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)
const startDateStr = computed(() => formatMonthDay(startDate.value)) //入住的时间，通过dayjs进行转化
const endDateStr = computed(() => formatMonthDay(endDate.value)) //离店时间

const showCalendar = ref(false)

//计算入住离店相差多少天
const stayCount = ref(getDiffDays(startDateStr.value,endDateStr.value))

//日历选择日期覆盖
const onConfirm = (value)=>{
  // 设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  mainStore.startDate = selectStartDate
  mainStore.endDate = selectEndDate
  // 计算时间差
  stayCount.value = getDiffDays(selectStartDate,selectEndDate)
  //隐藏日历
  showCalendar.value = false
}


//热门城市数据
const homeStore = useHomeStore()
//调用网络请求,预防一开始没有请求 pinia获取不到数据
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
const {hotSuggest,categories} = storeToRefs(homeStore)


// 首页大按钮跳转
const searchBtnClick = ()=>{
  router.push({
    path:"/search",
    // 传递参数
    query:{
      startDate:startDateStr.value,
      endDate:endDateStr.value
    }
  })
}



</script>

<template>
  <img src="@/assets/img/home/1008641.png" alt="" style="min-height: 180px;">
  <div class="home_nav_address">
    <span @click="cityClick">{{ currentCity.cityName }}</span>
    <div class="home_nav_myAddress" @click="positionClick">
      <span>我的位置</span>
      <img src="@/assets/img/home/icon_location.png" alt="">
    </div>
  </div>

    <!-- 选择入住时间 -->
      <div class="section date-range">
    <div class="start">
      <div class="date" @click="showCalendar=true">
          <span class="tip fontSizeMin fontColor">入住</span>
          <span class="time">{{ startDateStr }}</span>
      </div>
      <div class="stay fontSizeMin fontColor">共{{stayCount ? stayCount : 1}}晚</div>
    </div>
    <div class="end">
      <div class="date" @click="showCalendar=true">
        <span class="fontSizeMin fontColor">离店</span>
        <span>{{ endDateStr }}</span>
      </div>
    </div>
  </div>

    <!-- 民宿价格人数 -->
    <div class="item price-counter bottom-gray-line">
      <div class="start fontColor fontSize">价格不限</div>
      <div class="end fontColor fontSize">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="fontColor bottom-gray-line fontSize">关键字/位置/民宿名</div>
    <div class="item hot-suggest">
      <!-- <template v-for="(item,index) in hotSuggests" :key="index">
        <span class="tag">{{ item.tagText.text }}</span>
      </template> -->
    </div>

    <!-- 日历 -->
  <van-calendar 
    v-model:show="showCalendar" 
    type="range" 
    @confirm="onConfirm" 
    color="#ff9854"
    />

    <!-- 热门城市首页展示 -->
    <div class="Hotitem">
      <template v-for="(item,index) of hotSuggest">
      <div 
      class="itemCity"
      :style="{color:item?.tagText.color,background:item?.tagText.background.color}">
      {{ item?.tagText.text }}
    </div>
    </template>
    </div>

    <!-- 搜索大按钮  -->
    <div class="search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>

    <!-- 热门分类 -->
    <home_categories/>
</template>

<style lang="less" scoped>

img{
  width: 100%;
}
.home_nav_address{
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  height: 32px;
  align-items: center;
  margin: 10px 20px 0;
  span{
    color:#333;
  }
  .home_nav_myAddress{
    span{
      margin-right: 5px;
      color: #666;
    }
  }

  img{ 
    height: 20px;
    width: 20px;
  }
}

.fontSizeMin{
  font-size: 12px;
}
.fontSize{
  font-size:14px
}
.fontColor{
  color:#999
}

.section{
  display: flex;
  justify-content: space-between;
  width: 80%;
  margin: 0 auto;
  .start{
    display: flex;
    justify-content: space-between;
    .date{
      display: flex;
      flex-flow: column;
    }
    .stay{
      margin-left: 50px;
    }
  }

  .end{
    .date{
      display: flex;
      flex-flow: column;
    }
  }
}

.bottom-gray-line{
  display: flex;
  width: 80%;
  height: 40px;
  line-height: 40px;
  justify-content: space-between;
  margin: 0 auto;
  border-bottom: 1px solid #f4f4f4;
}

.Hotitem{
  margin-top: 10px ;
  font-size: 12px;
  width: 90%;
  margin: 0 auto;
  .itemCity{
  display: inline-block;
  margin: 5px 5px 0;
  height: 20px;
  border-radius: 5px;
  line-height: 20px;
  padding: 2px 3px;
  }
}

.search-btn {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  .btn {
    width: 80%;
    max-width: 500px;
    text-align: center;
    height: 38px;
    max-height: 70px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    // text-align: center;
    border-radius: 20px;
    background-image: linear-gradient(90deg, #ffb367, #f9d092);
  }
}
</style>