<template>
  <div>
    <h2>Історія покупок</h2>
    <div v-if="history.length===0">Поки нема покупок</div>
    <ul v-else>
      <li v-for="h in history" :key="h.id">
        <div><strong>{{ new Date(h.date).toLocaleString() }}</strong> — {{ h.total }} ₴</div>
        <ul>
          <li v-for="it in h.items" :key="it.product.id">{{ it.product.title }} x{{ it.quantity }}</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/cart'
const store = useCartStore()
const history = store.history
</script>