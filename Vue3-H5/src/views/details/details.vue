<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch ,nextTick } from 'vue';
import { getDatailInfos } from "@/service"
// 引入详情页的各种组件
import detailSwipe from "./cpns/detail_01-swipe.vue"
import detail_02Infos from './cpns/detail_02-infos.vue';
import detail_03Facility from './cpns/detail_03-facility.vue';
import detail_04Landlord from './cpns/detail_04-landlord.vue';
import detail_05Comment from './cpns/detail_05-comment.vue';
import detail_06Notice from './cpns/detail_06-notice.vue';
import detail_07Map from './cpns/detail_07-map.vue';
import detail_08Intro from './cpns/detail_08-intro.vue';
import tabControl from "@/components/tab-control/tab-control.vue"
import useScroll from '@/hooks/useScroll';
const route = useRoute()
const router = useRouter()
// 保存网络请求的数据
const detailInfo = ref({})
// 抽取复杂数据
const mainPart = computed(() => detailInfo.value?.mainPart)
// 发送网络请求
getDatailInfos(route.params.id).then(res => {
  detailInfo.value = res.data
})

const onClickLeft = () => {
  router.back()
};

// 对tab-control的控制
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  // 距离顶部达到300的时候为true
  return scrollTop.value >= 300
})

// 动态显示对应的内容
const sectionEls = ref({})
const names = computed(() => {
  return Object.keys(sectionEls.value)//获取已经sectionEls中的键(key)
})
const getSectionRef = (value) => {
  // 退出详情页时,组件销毁,value为null,无值则直接返回,不去获取对应的属性
  if (!value) return
  // 获取组件上的name属性
  const name = value.$el.getAttribute("name")
  //将组件里的根元素放到sectionEls的值中,跟键name关联上.形成键值对
  sectionEls.value[name] = value.$el
}

let isClick = false
let currentDistance = -1
// 将子组件派发的索引传递进来
const tabClick = (index) => {
  // 获取索引对应的键
  const key = Object.keys(sectionEls.value)[index]
  // 获取组件身上的$el元素
  const el = sectionEls.value[key]
  let distance = el.offsetTop
  // 当索引不为0的时候,向上的内容需要减去44,因为TabContorl也会占据一点空间,将其考虑进去
  if (index !== 0) {
    distance = distance - 44
  }

  isClick = true
  currentDistance = distance

  detailRef.value.scrollTo(
    {
      top: distance,// 滚动距离
      behavior: "smooth"// 向下滚动添加平滑动画
    })
}

// 页面滚动，滚动时匹配对应的tabControl
const tabControlRef = ref()
watch(scrollTop, async (newValue) => {//距离顶点 新的值
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  const els = Object.values(sectionEls.value)//获取tabControl身上的根元素
  const values = els.map(el => el.offsetTop)//映射根元素距离顶部的距离
  // 根据newValue去匹配想要的索引
  let index = values.length - 1//获取tabControl对应的索引值
  for (let i = 0; i < values.length; i++) {
    if(values[i] > newValue + 44){
      index = i - 1
      break
    }
  }
  await nextTick();
      // 调用子组件实例的方法
      if(tabControlRef.value) tabControlRef.value.setCurrentIndex(index);
})


</script>

<template>
  <div class="details top-page" ref="detailRef">
    <!-- tab-control -->
    <tab-control class="tabs" :titles="names" v-if="showTabControl" @tab-item-click="tabClick" ref="tabControlRef"/>
    <!-- 导航栏 -->
    <van-nav-bar title="房屋详情" left-text="返回" left-arrow @click-left="onClickLeft" />

    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <!-- 轮播图 -->
      <detailSwipe :swipe-info="mainPart.topModule.housePicture.housePics" />
      <!-- 主题信息 -->
      <detail_02Infos name="描述" :ref="getSectionRef" :topInfos="mainPart?.topModule" />
      <detail_03Facility name="设施" :ref="getSectionRef"
        :houseFacility="mainPart?.dynamicModule.facilityModule.houseFacility" />
      <!-- 房东信息 -->
      <detail_04Landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule" />
      <!-- 热门评论 -->
      <detail_05Comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule" />
      <!-- 预定须知 -->
      <detail_06Notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules" />
      <!-- 百度地图 -->
      <detail_07Map name="地图" :ref="getSectionRef" :position="mainPart.dynamicModule.positionModule"></detail_07Map>
      <!-- 价格说明 -->
      <detail_08Intro :price-intro="mainPart.introductionModule" />
    </div>

    <div class="footer">
      <div class="text">人生旅途, 永无止境!</div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.tabs {
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  top: 0;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>