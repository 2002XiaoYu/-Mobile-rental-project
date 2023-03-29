<script setup>
import useMainStore from '@/stores/modules/mian';
import { formatMonthDay } from '@/utils/format_date';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
const mainStore = useMainStore()
const { startDate,endDate } = storeToRefs(mainStore)

// 格式化字符串，使用我们封装在工具类utils中的格式化方法
const startDateStr = computed(()=> formatMonthDay(startDate.value))
const endDateStr = computed(()=> formatMonthDay(endDate.value))
</script>

<template>
  <div class="search">
    <div class="input">
      <div class="input-left">
        <div class="live">
          <div class="grey inlineBox">住</div>
          <div class="inlineBox date">{{ startDateStr }}</div>
        </div>
        <div class="leave">
          <div class="grey inlineBox">离</div>
          <div class="inlineBox">{{ endDateStr }}</div>
        </div>
      </div>
      <div class="input-right">
        <div>关键字/位置/民宿</div>
        <div class="icon-search"></div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.search {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: rgb(255, 255, 255);
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  .input{
    width: 90%;
    height: 45px;
    background-color: #f2f4f6;
    border-radius: 8px;
    display: flex;
    
    .input-left{
      width: 20%;
      display: flex;
      flex-flow: column;
      align-self:center;
      padding: 0 5px;
      border-right: 2px solid #ffffff;
      font-size: 12px;
      .live{
        display: flex;
        justify-content: space-around;
        margin-bottom: 2px;
        .grey{
          color: grey;
        }
      }
      .leave{
        display: flex;
        justify-content: space-around;
        .grey{
          color:grey
        }
      }
    }
    .input-right{
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: grey;
      font-size: 12px;
      padding:0 5px;
      width: 80%;
      .icon-search{
        width: 24px;
        height: 24px;
        display: inline-block;

        background-image: url(../../assets/img/home/home-sprite.png);
        background-position: -29px -151px;
        background-size: 207px 192px;
      }
    }
  }
}

.inlineBox{
  display: inline-block;
}
</style>