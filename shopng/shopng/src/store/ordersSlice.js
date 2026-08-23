import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [], // { id, userEmail, items, subtotal, shipping, total, paymentMethod, shippingInfo, createdAt, status }
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      state.orders.unshift(action.payload)
    },
  },
})

export const { addOrder } = ordersSlice.actions

export const selectOrders = (state) => state.orders.orders
export const selectOrderById = (state, id) =>
  state.orders.orders.find((order) => order.id === id)
export const selectOrdersByUser = (state, email) =>
  state.orders.orders.filter((order) => order.userEmail === email)

export default ordersSlice.reducer
