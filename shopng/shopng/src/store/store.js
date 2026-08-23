import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./authSlice";
import ordersReducer from "./ordersSlice";
import { loadState, saveState } from "../utils/storage";

const persistedState = loadState();

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
  },
  preloadedState: persistedState,
});

// Persist a trimmed snapshot of the store to localStorage on every change
// (debounced with a microtask so rapid dispatches don't spam writes).
let saveScheduled = false
store.subscribe(() => {
  if (saveScheduled) return
  saveScheduled = true
  queueMicrotask(() => {
    saveScheduled = false
    const state = store.getState()
    saveState({
      cart: state.cart,
      auth: state.auth,
      orders: state.orders,
    })
  })
})

export default store;
