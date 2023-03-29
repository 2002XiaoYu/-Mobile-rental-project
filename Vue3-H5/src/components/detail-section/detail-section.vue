<script setup>
import { defineProps } from 'vue';
defineProps({
  title:{
    type:String,
    default:"默认内容主题"
  },
  checkSection:{
    type:String,
    default:""
  }
})
</script>

<template>
  <div class="detailSection">
    <div>
      <h1 class="title">{{ title }}</h1>
    </div>
    <!-- 中间内容预留插槽 -->
    <slot>默认内容</slot>
    <div class="checkSection" v-if="checkSection.length">
      <span></span>
      <span>{{ checkSection }}</span>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .detailSection{
    border-top: 5px solid rgba(242, 242, 242, 0.5);
    width: 90%;
    margin: 0 auto;
    .title{
      height: 40px;
      border-bottom: 1px solid rgba(188, 188, 188, 0.5);
    }
    .checkSection{
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;
      color:var(--primary-color)
    }
  }
</style>