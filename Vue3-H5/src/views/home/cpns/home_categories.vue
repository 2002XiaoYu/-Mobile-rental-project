<script setup>
import  useHomeStore  from "@/stores/modules/home"
import { storeToRefs } from "pinia";
const homeStore = useHomeStore()
const { categories } = storeToRefs(homeStore)
</script>

<template>

  <div class="categories">
    <template v-for="(item,index) in categories" :key="index" >
    <div class="cityCategories">
      <img :src="item.pictureUrl" alt="">
      {{ item.title }}
    </div>
  </template>
  </div>
</template>

<style lang="less" scoped>
.categories{
  display: flex;
  overflow-x: auto;
  height: 80px;
  padding: 0 10px;
  margin-top: 8px;
  &::-webkit-scrollbar{
    display: none;
  }
  .cityCategories{
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 70px;
    text-align: center;
  }
  img{
    width: 32px;
    height: 32px;
    margin-bottom: 5px;
  }
}
</style>