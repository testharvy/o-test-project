
export interface Review {
    id: number,
    text: string
}

export type ReviewsResponse = Review[]

// формат из задачи
// export interface ProductResponse {
//     page: number
//     amount: number
//     total: number
//     products: Product[]
// }

// формат json-server
export interface ProductResponse {
    first: number,
    prev: number|null,
    next: number|null,
    last: number,
    pages: number,
    items: number,
    data: Product[]
}


export interface Product {
    id: number
    image_url: string
    title: string
    description: string
    price: number
}

export interface CartRow{
    id: number,
    product: Product,
    quantity: number
}

export type CartObject = Omit<CartRow, "product">;

export interface Order{
    phone: string,
    cart: CartObject[]
}

export interface OrderResponse{
    success: number,
    error?: string
}


