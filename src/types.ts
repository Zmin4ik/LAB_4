export interface Product {
    id: string
    title: string
    price: number
    description?: string
    image?: string
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface Purchase {
    id: string
    items: CartItem[]
    total: number
    date: string // ISO
}