import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Product from "./components/productHomePage/product.jsx"
import ProductDetail from "./components/productDetail/ProductDetail.jsx"
import Signup from "./components/auth/signup/SignUp.jsx"
import Login from "./components/auth/login/Login.jsx"
import Checkout from "./components/checkout/checkout.jsx"
import OrderConfirmation from "./components/orderConfirmation/OrderConfirmation.jsx"
import Wishlist from "./components/wishlist/Wishlist.jsx"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        {/* <Route path="/wishlist" element={<Wishlist />} /> */}
      </Routes>
    </Router>
  )
}

export default App