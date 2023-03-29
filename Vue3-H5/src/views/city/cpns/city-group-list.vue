<script setup>
import { defineProps,computed } from 'vue';
import { useRouter } from 'vue-router';
import  useCityStore  from "@/stores/modules/city"
import { storeToRefs } from 'pinia';

//使用pinia
const cityStore = useCityStore()
const {currentCity} = storeToRefs(cityStore)

//使用路由
const router = useRouter()


//从父组件传递数据给子组件
const props = defineProps({
  //城市数据
  groupData:{
    type:Object,
    default:()=>({})//默认值为空数组
  }
})

//动态获取侧边栏的索引
const indexList = computed(()=>{
  const list = props.groupData.cities.map(item => item.group)
  list.unshift("#")
  return list
})

//点击城市保存城市信息回退首页
const clickCity = (city) => {
  console.log(city);
  currentCity.value = city
  router.back()
}


</script>

<template>
    <van-index-bar :index-list="indexList">

      <van-index-anchor index="热门" />
      <div class="list">
        <template v-for="(city,indexC) in groupData.hotCities" :key="indexC">
        <div class="city" @click="clickCity(city)">{{ city.cityName }}</div>
        </template>
      </div>

      <template v-for="(group,index) in groupData.cities" :key="index">
        <van-index-anchor :index="group.group"/>
        <template v-for="(city,indey) in group?.cities" :key="indey">
            <van-cell :title="city.cityName" @click="clickCity(city)"/>
        </template>
      </template>
    </van-index-bar>
</template>

<style lang="less" scoped>
.list{
  display: flex;
  justify-content: space-around;
  flex-flow: wrap;
  margin-right: 10px;

  .city{
    width: 70px;
    height: 30px;
    text-align: center;
    margin:5px;
    background-color: #f9efe2;
    line-height: 30px;
    border-radius: 12px;
  }
}
</style>