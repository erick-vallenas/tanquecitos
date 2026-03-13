export type CartItem = {
  productId: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number | null
  image?: string | null
  variant?: string | null
  quantity: number
  stock: number
}

export type WishlistItem = {
  productId: string
  name: string
  slug: string
  price: number
  compareAtPrice?: number | null
  image?: string | null
}

export type ShippingInfo = {
  name: string
  phone: string
  email: string
  dni: string
  address: string
  district: string
  city: string
  reference: string
}

export type PaymentMethod = 'yape' | 'transfer' | 'culqi'

export type Toast = {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}
