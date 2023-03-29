<script setup>
import { computed } from 'vue';

const props = defineProps({
  HomeV9:{
    type:Object,
    default:()=>({})
  }
})

const itemScore = computed(() => {
  return Number(props.HomeV9.commentScore)
})
</script>

<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="HomeV9.image.url" alt="">
      </div>
      <div class="info">
        <div class="summary">{{ HomeV9.summaryText }}</div>
        <div class="name">{{ HomeV9.houseName }}</div>
        <div class="price">
          <van-rate :model-value="itemScore" color="#fff" :size="15" readonly allow-half />
          <div class="new">¥ {{ HomeV9.finalPrice }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
    position: relative;
    margin: 5px;
    background: #fff;
    border-radius: 6px;
    overflow: hidden;

    .cover {
      img {
        width: 100%;
      }
    }

    .info {
      position: absolute;
      bottom: 0;
      padding: 8px 10px;
      color: #fff;
      background-color: rgba(0,0,0,.3);

      .summary {
        font-size: 12px;
      }

      .name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
      }
    }
  }
}
</style>