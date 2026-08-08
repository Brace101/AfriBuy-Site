import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Product from "./components/productHomePage/product.jsx"
// Change "Signup.jsx" to "SignUp.jsx"
import Signup from "./components/auth/signup/SignUp.jsx";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App