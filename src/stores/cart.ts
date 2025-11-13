import { defineStore } from 'pinia'
import { ref, computed, nextTick } from 'vue'
import type { CartItem, Product, Purchase } from '../types'

export const useCartStore = defineStore('cart', () => {
    const items = ref<CartItem[]>([])
    const history = ref<Purchase[]>([])

    function findIndex(productId: string): number {
        return items.value.findIndex(i => i.product.id === productId)
    }

    function addProduct(product: Product, quantity = 1) {
        const idx = findIndex(product.id)
        if (idx === -1) {
            items.value.push({ product, quantity })
        } else {
            const item = items.value[idx]
            if (item) item.quantity += quantity
        }
        items.value = [...items.value]
    }

    function removeProduct(productId: string) {
        items.value = items.value.filter(i => i.product.id !== productId)
        items.value = [...items.value]
    }

    function clearCart() {
        items.value.splice(0, items.value.length)
    }

    const total = computed(() =>
        items.value.reduce((s, it) => s + it.quantity * it.product.price, 0)
    )

    function checkout() {
        if (items.value.length === 0) return

        const purchase: Purchase = {
            id: Date.now().toString(),
            items: items.value.map(i => ({ ...i })),
            total: total.value,
            date: new Date().toISOString()
        }

        history.value.unshift(purchase)
        clearCart()

        nextTick(() => {
            items.value = []
        })
    }

    return { items, history, addProduct, removeProduct, clearCart, total, checkout }
}, {
    persist: true
})