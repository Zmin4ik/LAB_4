import { ref, computed } from 'vue'
import type { Product } from '../types'
import { fetchProducts } from '../services/productsService'

export function useProducts() {
    const products = ref<Product[]>([])
    const loading = ref(false)
    const sortBy = ref<'default' | 'price-asc' | 'price-desc'>('default')

    async function load() {
        loading.value = true
        products.value = await fetchProducts()
        loading.value = false
    }

    const sorted = computed(() => {
        if (sortBy.value === 'price-asc') return [...products.value].sort((a,b)=>a.price-b.price)
        if (sortBy.value === 'price-desc') return [...products.value].sort((a,b)=>b.price-a.price)
        return products.value
    })

    function setSort(mode: typeof sortBy.value) {
        sortBy.value = mode
    }

    return { products, load, loading, sorted, sortBy, setSort }
}