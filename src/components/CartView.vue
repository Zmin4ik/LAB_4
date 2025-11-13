<template>
  <div class="cart-view">
    <h2>Корзина</h2>

    <div v-if="store.items.length === 0" class="empty-cart">
      Корзина порожня
    </div>

    <ul v-else class="cart-list">
      <li v-for="item in store.items" :key="item.product.id" class="cart-item">
        <div class="info">
          <div class="title" v-tooltip="item.product.title">
            {{ item.product.title }}
          </div>
          <div class="price">
            Ціна: {{ item.product.price }} ₴
          </div>
          <div class="quantity">
            Кількість: {{ item.quantity }}
          </div>
          <div class="sum">
            Сума: {{ item.quantity * item.product.price }} ₴
          </div>
        </div>
        <div class="actions">
          <button class="btn-remove" @click="confirmRemove(item.product.id, item.product.title)">
            Видалити
          </button>
        </div>
      </li>
    </ul>

    <div v-if="store.items.length > 0" class="cart-footer">
      <div class="total">Разом: {{ store.total }} ₴</div>
      <button class="btn-checkout" @click="confirmCheckout">
        Оформити покупку
      </button>
    </div>

    <ModalWrapper v-model:show="modal.show">
      <template v-if="modal.type === 'remove'">
        <p>
          Ви впевнені, що хочете видалити товар
          <strong>"{{ modal.productTitle }}"</strong> з корзини?<br>
          <em>Операція невідворотна, товар буде втрачено.</em>
        </p>
        <div class="modal-buttons">
          <button @click="doRemove">Так</button>
          <button @click="closeModal">Ні</button>
        </div>
      </template>

      <template v-else-if="modal.type === 'checkout'">
        <p>Підтвердити покупку на суму {{ store.total }} ₴?</p>
        <div class="modal-buttons">
          <button @click="doCheckout">Так</button>
          <button @click="closeModal">Ні</button>
        </div>
      </template>

      <template v-else-if="modal.type === 'success'">
        <p>Покупка успішно оформлена!<br>
          Ви можете переглянути історію у вкладці "Історія покупок".
        </p>
        <div class="modal-buttons">
          <button @click="closeModal">OK</button>
        </div>
      </template>
    </ModalWrapper>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useCartStore } from '../stores/cart'
import ModalWrapper from './ModalWrapper.vue'

const store = useCartStore()

const modal = reactive({
  show: false,
  type: '' as 'remove' | 'checkout' | 'success' | '',
  payload: '' as string | '',
  productTitle: ''
})

function confirmRemove(productId: string, title: string) {
  modal.show = true
  modal.type = 'remove'
  modal.payload = productId
  modal.productTitle = title
}

function confirmCheckout() {
  modal.show = true
  modal.type = 'checkout'
}

function doRemove() {
  if (modal.payload) store.removeProduct(modal.payload)
  closeModal()
}

function doCheckout() {
  store.checkout()
  modal.type = 'success'
}

function closeModal() {
  modal.show = false
  modal.type = ''
  modal.payload = ''
  modal.productTitle = ''
}
</script>

<style scoped>
.cart-view {
  padding: 12px;
}
.empty-cart {
  color: #666;
  font-style: italic;
  margin-top: 12px;
}
.cart-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 10px;
  margin-bottom: 10px;
}
.info {
  flex-grow: 1;
}
.title {
  font-weight: 600;
  margin-bottom: 4px;
}
.price,
.quantity,
.sum {
  font-size: 14px;
  color: #444;
}
.actions {
  margin-left: 10px;
}
.btn-remove {background: #f8d7da;
  border: 1px solid #f5c2c7;
  color: #842029;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-remove:hover {
  background: #f1b0b7;
}
.cart-footer {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.total {
  font-size: 18px;
  font-weight: bold;
}
.btn-checkout {
  background: #d1e7dd;
  border: 1px solid #badbcc;
  color: #0f5132;
  border-radius: 6px;
  padding: 6px 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-checkout:hover {
  background: #a3cfbb;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 12px;
}
</style>