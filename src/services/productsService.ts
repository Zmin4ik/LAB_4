import type { Product } from '../types'

const PRODUCTS: Product[] = [
    { id: 'p1', title: 'Чайник електричний SuperBoil 1.7L', price: 499},
    { id: 'p2', title: 'Ніж кухонний ChefPro 20cm', price: 349},
    { id: 'p3', title: 'Кавоварка Aroma X', price: 2499},
    { id: 'p4', title: 'Супердовга назва продукту яка обрізається в UI щоб показати tooltip', price: 199},
]

export function fetchProducts(): Promise<Product[]> {
    return new Promise((resolve) => {
        setTimeout(() => resolve([...PRODUCTS]), 200)
    })
}