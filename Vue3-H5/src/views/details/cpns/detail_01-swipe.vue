<script setup>
import {defineProps} from "vue"
const props = defineProps({
  // 当前页面用到的数据，对应到接口中housePics下的数据
  swipeInfo:{
    type:Array,
    default:()=>[]
  }
})

// 对数据进行转换(对housePics的数据进行分类)
const swipeGroup = {}
for(const item of props.swipeInfo){
  let valueArray = swipeGroup[item.enumPictureCategory]
  // 判断是否未初始化数组
  if(!valueArray){
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  // 对空数组填入数据
  valueArray.push(item)
}

// 处理数据，使用正则去除【】：
const nameReg = /【(.*?)】/i
const getName = (name) => {
  const result = nameReg.exec(name)
  return result[1]
}

// 获取当前类型图片的第n张
const getCategoryIndex = (item)=>{
  // item.enumPictureCategory获取对应照片的类型
  const valueArray = swipeGroup[item.enumPictureCategory]
  // 返回 传递进来数据和对应类型数据的对比
  return valueArray.findIndex(data => data == item) + 1
}
</script>

<template>
<div class="swipe">
  <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <template v-for="(item,index) in swipeInfo">
      <van-swipe-item>
        <img :src="item.url" alt="">
      </van-swipe-item>
    </template>
    <!-- 插槽指示器 -->
    <template #indicator="{ active, total }">
      <div class="custom-indicator">
        <template v-for="(value,key,index) in swipeGroup" :key="key">
          <span class="item" :class="{focusItem:props.swipeInfo[active]?.enumPictureCategory == key}">
            {{ getName(value[0].title) }}
            <span v-if="props.swipeInfo[active]?.enumPictureCategory == key">
            {{ getCategoryIndex(swipeInfo[active]) }}/{{ value.length }}
            </span>
          </span>
        </template>
      </div>
    </template>
  </van-swipe>
</div>
</template>

<style lang="less" scoped>
.swipe{
  .custom-indicator{
    background-color: rgb(255 255 255 / 71%) !important;
  }
  .my-swipe{
    img{
      width: 100%;
    }
  }
  .custom-indicator {
    position: absolute;
    right: 5px;
    bottom: 5px;
    padding: 2px 5px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    .item{
      margin-left: 5px;
    }
    .focusItem{
      background-color: rgba(0, 0, 0, 0.8);
      padding: 0 4px;
      border-radius: 5px;
      color:aliceblue
    }
  }
}
</style>