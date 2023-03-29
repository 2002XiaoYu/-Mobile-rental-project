<script setup>
import detailSection from '@/components/detail-section/detail-section.vue';
import { onMounted , ref } from 'vue';

const props = defineProps({
  position: {
    type: Object,
    default: () => ({})
  }
})

const mapRef = ref()

// 挂载的时候创建出百度地图
onMounted(() => {
  const map = new BMapGL.Map(mapRef.value); // 创建地图实例 
  const point = new BMapGL.Point(props.position.longitude, props.position.latitude); // 创建点坐标 
  map.centerAndZoom(point, 15); // 初始化地图，设置中心点坐标和地图级别
  const marker = new BMapGL.Marker(point);  
  map.addOverlay(marker)
})
</script>

<template>
  <div class="home">
    <detail-section title="位置周边" check-section="查看更多周边信息 >">
      <div class="baidu" ref="mapRef"></div>
    </detail-section>
  </div>
</template>

<style scoped>
.baidu {
  height: 250px;
}
</style>