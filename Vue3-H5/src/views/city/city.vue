<script setup>
import { ref , computed } from 'vue';
import { useRouter } from 'vue-router';
//引入城市的接口数据
import useCityStore from "@/stores/modules/city"
//引入城市list列表组件
import cityGroupList from "./cpns/city-group-list.vue"

import { storeToRefs } from 'pinia';


const searchValue = ref('');

const router = useRouter()

//路由返回上一步
const cancelClick = ()=>{
  router.back()
}

//默认情况下获取Tab标签页(中国与国外的索引)，能拿到跳转前和跳转后的索引。修改设置为获取key
const activeName = ref();

//Tab标签页 - 切换点击事件
const onClickTab = ()=>{
  // console.log(activeName);
}

//保存网络请求下拿到的数据(这里的数据不能被修改使用const)，确定是对象就放个空对象，undefined默认值容易报错
// const allCity = ref({})

/*
这个位置发送网络请求有两个缺点：
1.如果网络请求太多 。 那么页面组件中就包含大量的对于网络请求和数据的处理逻辑
2.如果页面封装了很多的子组件 子组件需要这些数据， 我们必须 一步步将数据传递过去（props)
*/

//拿二次封装的接口数据
// getCityAll().then(res =>{
//   allCity.value = res.data
// })

//从store中获取城市数据
const cityStore = useCityStore()
//在pinia中没有真实调用action，引用的时候就需要先调用一下，从服务器中获取到数据
cityStore.fetchAllCitiesData()
//直接解构会失去响应式，需要包裹storeToRefs，或者toRefs也行。理论上是一个东西，使其不失去响应式
const { allCities } = storeToRefs(cityStore)

//数据是ref包裹的，都需要.value获取真实的数据
const cityGroup = computed(()=>allCities.value[activeName.value])
console.log(cityGroup);


</script>

<template>
  <div class="city top-page">
    <div class="top">
          <!-- 搜索框 -->
      <van-search 
        v-model="searchValue" 
        shape="round"
        placeholder="城市/区域/位置"
        show-action
        @cancel="cancelClick"
      />
          <!-- Tab标签页的搭建 -->
          <van-tabs 
            v-model:active="activeName" 
            @click-tab="onClickTab" 
            color="#ff9854"
            >
        <template v-for="(value,key,index) in allCities" :key="key">
          <van-tab :title="value.title" :name="key"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value,key,index) in allCities">
        <cityGroupList v-show="activeName === key" :group-data="value"></cityGroupList>
      </template>
    </div>
  </div>
  </template>

<style lang="less" scoped>
.city{
  .content{
    height: calc(100vh - 98px);
    //属性设置为 auto 时，元素会在垂直方向上自动出现滚动条，以便用户可以滚动浏览溢出的内容。如果内容没有溢出，则不会显示滚动条
    overflow-y: auto;//控制元素的垂直方向上的溢出内容
  }
  .top{//防止拉动过快，导致字母A-Z拉出卡出去的效果
    position: relative;
    z-index: 9;
  }
}

</style>