import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // lightweight product snapshots: { id, name, image, price, originalPrice, discount, rating }
}

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload
      if (!product?.id) return
      const exists = state.items.some((item) => item.id === product.id)
      if (!exists) state.items.unshift(product)
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },
    toggleWishlist: (state, action) => {
      const product = action.payload
      if (!product?.id) return
      const exists = state.items.some((item) => item.id === product.id)
      if (exists) {
        state.items = state.items.filter((item) => item.id !== product.id)
      } else {
        state.items.unshift(product)
      }
    },
    clearWishlist: (state) => {
      state.items = []
    },
  },
})

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions

// Selectors
export const selectWishlistItems = (state) => state.wishlist.items
export const selectWishlistCount = (state) => state.wishlist.items.length
export const selectIsWishlisted = (state, productId) =>
  state.wishlist.items.some((item) => String(item.id) === String(productId))

export default wishlistSlice.reducer
