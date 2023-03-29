<script setup>
import homeItemV3 from "@components/home-item-v3/home-item-v3.vue" ;
import homeItemV9 from "@components/home-item-v9/home-item-v9.vue"
import useHomeStore from '@/stores/modules/home';
import router from "@/router";
import { storeToRefs } from 'pinia';
const homeStore = useHomeStore()
homeStore.fetchHouseList()
const { HouseList } = storeToRefs(homeStore)

const detailsClick = (item)=>{
  router.push("/details/"+item.houseId)//记得是/details/，而不是/details
}
</script>

<template>
  <div class="title">
    <h1>内容精选</h1>
    <div class="card">
      <template v-for="(item,index) in HouseList">
      <homeItemV9 
        v-if="item.discoveryContentType === 9" 
        :HomeV9="item.data" 
        @click="detailsClick(item.data)"
        />
      <homeItemV3 
        v-if="item.discoveryContentType === 3" 
        :HomeV3="item.data" 
        @click="detailsClick(item.data)"
        />
    </template>
    </div>
  </div>
</template>

<style scoped>
.card{
  display: flex;
  flex-flow: wrap;
}
</style>