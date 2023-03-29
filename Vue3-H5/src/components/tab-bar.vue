<script setup>
//组件本地数据
import tabbarData from "../assets/data/tabBarData"
//Vite图片正常显示工具类
import getAssetURL from "../utils/get_assets_img"
//引入Vue3中的方法
import {ref , watch}  from "vue"
//引入路由的route
import { useRoute } from "vue-router"

const route = useRoute()
//记录点击的情况，排他思想
const currentIndex = ref(0)
//进行实时更新路径的切换并且跟底部tabBar索引对应
watch(route,(newRoute)=>{
  const index = tabbarData.findIndex(item => item.path === newRoute.path)
  // 如果没有找到索引的话，findIndex返回的是-1 。因为我们除了底部tabBar之外还会有其他的页面，这些页面的路由跳转就跟底部没有什么关系了，所以需要考虑到这点
  if (index == -1) return
  currentIndex.value = index
})


</script>

<template>
  <van-tabbar v-model="currentIndex" :route="true" active-color="#ff9854" route>
  <template v-for="(item,index) of tabbarData">
    <van-tabbar-item #icon  :to="item.path">
      <img v-if="index !== currentIndex" :src="getAssetURL(item.image)">
      <img v-else :src="getAssetURL(item.imageActive)">
      {{ item.text }}
    </van-tabbar-item>
  </template>
</van-tabbar>
</template>

<style  lang="less" scoped>
//样式穿透
:deep(.van-tabbar-item__icon){
  font-size:16px
}

img{
  height: 26px;
}
</style>