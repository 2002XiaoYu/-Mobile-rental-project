<script setup>
import { defineProps ,computed} from 'vue';
const props = defineProps({
  HomeV3:{
    type:Object,
    default:()=>({})
  }
})

const itemClick = () => {
  console.log("itemClick", props.HomeV3.houseId)
}
</script>

<template>
  <div class="house-item">
    <div class="item-inner">
      <div class="cover">
        <img :src="HomeV3?.image?.url" alt="">
      </div>
      <div class="info">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="">
          <span>{{ HomeV3.location }}</span>
        </div>
        <div class="name">{{ HomeV3.houseName }}</div>
        <div class="summary">{{ HomeV3.summaryText }}</div>
        <div class="price">
          <div class="new"> ¥ {{ HomeV3.finalPrice }}</div>
          <div class="old"> ¥ {{ HomeV3.productPrice }}</div>
          <div class="tip" v-if="HomeV3.priceTipBadge">
            {{ HomeV3.priceTipBadge.text }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.house-item {
  width: 50%;

  .item-inner {
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
      padding: 8px 10px;
      color: #666;
      font-size: 12px;
    }

    .location {
      display: flex;
      align-items: center;
      img {
        width: 12px;
        height: 12px;
      }

      .text {
        margin-left: 2px;
        font-size: 12px;
        color: #666;
      }
    }

    .name {
      margin: 5px 0;
      font-size: 14px;
      color: #333;

      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }

    .price {
      display: flex;
      align-items: flex-start;

      margin: 8px 0;
      .new {
        color: #ff9645;
        font-size: 14px;
      }

      .old {
        margin: 0 3px;
        color: #999;
        font-size: 12px;
        text-decoration: line-through;
      }

      .tip {
        background-image: linear-gradient(270deg,#f66,#ff9f9f);
        color: #fff;
        padding: 0 6px;
        border-radius: 8px;
      }
    }
  }
}
</style>