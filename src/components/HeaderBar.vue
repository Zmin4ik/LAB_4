-<template>
  <header class="header">
    <h1 class="brand">Магазин AT-242</h1>
    <nav class="nav">
      <button @click="$emit('change-tab','home')" :class="{active: currentTab==='home'}">Головна</button>
      <button @click="$emit('change-tab','cart')" :class="{active: currentTab==='cart'}">Корзина ({{ cartCount }})</button>
      <button @click="$emit('change-tab','history')" :class="{active: currentTab==='history'}">Історія покупок</button>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '../stores/cart'

const props = defineProps<{ currentTab: string }>()
const emit = defineEmits<{ (e: 'change-tab', tab: string): void }>()

const store = useCartStore()
const cartCount = computed(() => store.items.reduce((s, i) => s + i.quantity, 0))
</script>

<style scoped>
.header{ display:flex; align-items:center; justify-content:space-between; padding:12px 16px; background:#f5f5f5; }
.nav > button { margin-left:8px; }
.nav > button.active { font-weight:700; text-decoration:underline; }
.brand{ margin:0; font-size:18px; }
</style>