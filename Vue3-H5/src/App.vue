<script setup>
import tabBar from './components/tab-bar.vue';
import loading from './components/loading/loading.vue';
import { useRoute } from 'vue-router';
const route = useRoute()
</script>

<template>
  <div class="app">
    <loading />
    <!-- name属性 -->
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    <tab-bar v-show="!route.meta.hideTabBar" />
  </div>
</template>

<style scoped></style>
