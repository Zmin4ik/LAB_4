<template>
  <div>
    <div class="controls">
      <label>Сортування:
        <select v-model="sort">
          <option value="default">За замовчуванням</option>
          <option value="price-asc">Ціна ↑</option>
          <option value="price-desc">Ціна ↓</option>
        </select>
      </label>
    </div>

    <transition-group name="list" tag="div" class="products-grid">
      <div v-for="p in sorted" :key="p.id" class="product-card">
        <div class="title" v-tooltip="p.title">{{ p.title }}</div>
        <div class="price">{{ p.price }} ₴</div>
        <div class="actions">
          <button @click="confirmAdd(p)">Додати в корзину</button>
        </div>
      </div>
    </transition-group>

    <ModalWrapper v-model:show="modal.show">
      <p>Додати товар <strong>"{{ modal.product?.title }}"</strong> у корзину?</p>
      <div class="modal-buttons">
        <button @click="doAdd">Так</button>
        <button @click="closeModal">Ні</button>
      </div>
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useProducts } from '../composables/useProducts'
import { useCartStore } from '../stores/cart'
import ModalWrapper from './ModalWrapper.vue'
import type { Product } from '../types'

const { sorted, load, setSort, sortBy } = useProducts()
const sort = ref(sortBy.value)
const cart = useCartStore()

watch(sort, (v) => setSort(v as any))
load()

const modal = reactive({
  show: false,
  product: null as Product | null
})

function confirmAdd(p: Product) {
  modal.show = true
  modal.product = p
}

function doAdd() {
  if (modal.product) {
    cart.addProduct(modal.product)
  }
  closeModal()
}

function closeModal() {
  modal.show = false
  modal.product = null
}
</script>

<style scoped>
.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-top: 12px;
}
.product-card {
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  background: #fff;
  transition: transform 0.3s, opacity 0.3s;
}
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.list-move {
  transition: transform 0.3s ease;
}
.title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
</style>