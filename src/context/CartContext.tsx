'use client'

import { createContext, useContext, useReducer, useEffect, useCallback, type ReactNode } from 'react'
import type { CartItem } from '@/lib/types'

type CartState = {
  items: CartItem[]
  isOpen: boolean
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: string; variant?: string | null } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; variant?: string | null; quantity: number } }
  | { type: 'CLEAR' }
  | { type: 'TOGGLE_CART' }
  | { type: 'SET_OPEN'; payload: boolean }
  | { type: 'LOAD'; payload: CartItem[] }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        (i) => i.productId === action.payload.productId && i.variant === action.payload.variant
      )
      if (existing) {
        const newQty = Math.min(existing.quantity + action.payload.quantity, existing.stock)
        return {
          ...state,
          isOpen: true,
          items: state.items.map((i) =>
            i.productId === existing.productId && i.variant === existing.variant
              ? { ...i, quantity: newQty }
              : i
          ),
        }
      }
      return { ...state, isOpen: true, items: [...state.items, action.payload] }
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          (i) => !(i.productId === action.payload.productId && i.variant === action.payload.variant)
        ),
      }
    case 'UPDATE_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter(
            (i) => !(i.productId === action.payload.productId && i.variant === action.payload.variant)
          ),
        }
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.productId === action.payload.productId && i.variant === action.payload.variant
            ? { ...i, quantity: Math.min(action.payload.quantity, i.stock) }
            : i
        ),
      }
    case 'CLEAR':
      return { ...state, items: [] }
    case 'TOGGLE_CART':
      return { ...state, isOpen: !state.isOpen }
    case 'SET_OPEN':
      return { ...state, isOpen: action.payload }
    case 'LOAD':
      return { ...state, items: action.payload }
    default:
      return state
  }
}

type CartContextType = {
  items: CartItem[]
  isOpen: boolean
  itemCount: number
  subtotal: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, variant?: string | null) => void
  updateQuantity: (productId: string, quantity: number, variant?: string | null) => void
  clearCart: () => void
  toggleCart: () => void
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], isOpen: false })

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tanquecitos_cart')
      if (saved) {
        dispatch({ type: 'LOAD', payload: JSON.parse(saved) })
      }
    } catch {}
  }, [])

  useEffect(() => {
    localStorage.setItem('tanquecitos_cart', JSON.stringify(state.items))
  }, [state.items])

  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0)
  const subtotal = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0)

  const addItem = useCallback((item: CartItem) => {
    dispatch({ type: 'ADD_ITEM', payload: item })
  }, [])

  const removeItem = useCallback((productId: string, variant?: string | null) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId, variant } })
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number, variant?: string | null) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, variant, quantity } })
  }, [])

  const clearCart = useCallback(() => dispatch({ type: 'CLEAR' }), [])
  const toggleCart = useCallback(() => dispatch({ type: 'TOGGLE_CART' }), [])
  const setCartOpen = useCallback((open: boolean) => dispatch({ type: 'SET_OPEN', payload: open }), [])

  return (
    <CartContext.Provider
      value={{ items: state.items, isOpen: state.isOpen, itemCount, subtotal, addItem, removeItem, updateQuantity, clearCart, toggleCart, setCartOpen }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
