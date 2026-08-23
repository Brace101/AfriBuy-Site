import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { id, name, image, price, quantity }
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...product, quantity: 1 })
      }
    },
    increaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) item.quantity += 1
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((item) => item.id === action.payload)
      if (item) item.quantity -= 1
      state.items = state.items.filter((item) => item.quantity > 0)
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addItem, increaseQty, decreaseQty, removeItem, clearCart } = cartSlice.actions

// Selectors
export const selectCartItems = (state) => state.cart.items
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

export default cartSlice.reducer
