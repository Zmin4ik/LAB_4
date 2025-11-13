<template>
  <div id="app">
    <HeaderBar :currentTab="currentTab" @change-tab="setTab" />
    <keep-alive>
      <component :is="currentComponent" />
    </keep-alive>

    <Drawer v-model:modelValue="drawerOpen">
      <component :is="drawerContent" />
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HeaderBar from './HeaderBar.vue'
import HomeView from './HomeView.vue'
import CartView from './CartView.vue'
import HistoryView from './HistoryView.vue'
import Drawer from './Drawer.vue'

const currentTab = ref<'home' | 'cart' | 'history'>('home')
function setTab(tab: 'home' | 'cart' | 'history') {
  currentTab.value = tab
}

const currentComponent = computed(() => {
  if (currentTab.value === 'home') return HomeView
  if (currentTab.value === 'cart') return CartView
  return HistoryView
})

const drawerOpen = ref(false)
const drawerContent = ref<any>(null)
</script>