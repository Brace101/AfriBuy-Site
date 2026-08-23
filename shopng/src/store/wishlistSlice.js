import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // { id, name, image, price, ...product }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (!existing) {
        state.items.push(product)
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    toggleItem: (state, action) => {
      const product = action.payload
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        state.items = state.items.filter((item) => item.id !== product.id)
      } else {
        state.items.push(product)
      }
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const { addItem, removeItem, toggleItem, clearWishlist } = wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.items.length
export const selectIsInWishlist = (id) => (state) =>
  state.wishlist.items.some((item) => item.id === id)

export default wishlistSlice.reducer
