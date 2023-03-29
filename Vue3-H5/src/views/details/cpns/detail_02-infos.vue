<script setup>
import { defineProps } from 'vue';
const props = defineProps({
  topInfos:{
    type:Object,
    // {}外面加上一层()的意义是返回值默认返回空对象，而()=>{}没有返回值
    defaults:()=>({})
  }
})
</script>

<template>
  <div class="infos">
    <!-- 房屋介绍标题 -->
    <div class="title"><h2>{{props.topInfos?.houseName }}</h2></div>
    <!-- 房屋优势 -->
    <div class="advantage">
      <template 
        v-for="(item,index) in props.topInfos?.houseTags">
        <span
        class="item"
        v-if="item.tagText"
        :style="{color:item.tagText.color,background:item.tagText.background.color}"
        >{{ item.tagText?.text }}</span>
      </template>
    </div>
    <!-- 房屋评价 -->
    <div class="comment">
      <div class="comment-left">
        <span style="font-size: 20px;" class="boltFont">{{ topInfos?.commentBrief.overall }}</span>
        <span class="boltFont" style="margin: 0 4px;">{{ topInfos?.commentBrief.scoreTitle }}</span>
        <span>"{{ topInfos?.commentBrief.commentBrief }}"</span>
      </div>
      <div class="comment-right">
        {{ topInfos?.commentBrief.totalCount }}条评论＞
      </div>
    </div>
    <!-- 房屋地址 -->
    <div class="comment">
      <div class="comment-left boltFont">{{ topInfos?.nearByPosition.address }}</div>
      <div class="comment-right">地图·周边＞</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.infos{
  margin: 10px;
  .advantage{
    margin:10px 0;
    .item{
      margin: 0 2px;
    }
  }
  .comment{
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    background-color: rgba(187, 187, 187, 0.137);
    height: 40px;
    border-radius: 5px;
    margin: 15px 0;
    .comment-left{
      margin-left: 10px;
    }
    .comment-right{
      margin-right: 10px;
      color:var(--primary-color);
      font-size:10px
    }
  }
}

.boltFont{
  font-weight: 600
}
</style>