<script setup>
import  useCityStore  from "@/stores/modules/city"
import { storeToRefs } from "pinia";
const CityStore = useCityStore()
const { currentCity } = storeToRefs(CityStore)

</script>

<template>
<h1>开始时间：{{ $route.query.startDate }}</h1>
<h1>结束时间：{{ $route.query.endDate }}</h1>
<h1>你选择的城市是：{{ currentCity.cityName }}</h1>
</template>

<style lang="less" scoped>

</style>