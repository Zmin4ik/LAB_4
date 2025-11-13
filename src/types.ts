export interface Product {
    id: string
    title: string
    price: number
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface Purchase {
    id: string
    items: CartItem[]
    total: number
    date: string
}
