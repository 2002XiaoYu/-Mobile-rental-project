<script setup>
import { watch ,computed } from 'vue'
import home_search_box from "./cpns/home_search_box.vue"
import home_nav_bar from './cpns/home_nav_bar.vue';
import home_content from "./cpns/home_content.vue";
import useHomeStore from "@/stores/modules/home";
import useScroll from "@/hooks/useScroll"
import searchBar from '@/components/search-bar/search-bar.vue';

//引入房子列表数据
const homeStore = useHomeStore()
homeStore.fetchCategoriesData()
homeStore.fetchHotSuggestData()
homeStore.fetchHouseList()

// 调用hook公共 滚动底部加载更多 逻辑
const { isReachBottom , scrollTop} = useScroll()
watch(isReachBottom,(newValue)=>{
  if(newValue){
    //调用首页继续请求卡片信息数据，请求成果将到达底部的true重置为false
    homeStore.fetchHouseList().then(res=>{
      isReachBottom.value = false
    })
  }
})

// 搜索框显示控制
const isShowSearchBar = computed(()=>{
  return scrollTop.value >= 350
})

</script>

<template>
  <div class="home">
    <home_nav_bar></home_nav_bar>
    <home_search_box></home_search_box>
    <home_content></home_content>
    <!-- 搜索栏 -->
    <searchBar v-if="isShowSearchBar"></searchBar>
  </div>
</template>

<style lang="less" scoped>
.home{
  overflow-y: auto;
  box-sizing: border-box;
}
</style>