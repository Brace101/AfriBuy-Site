import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Product from "./components/productHomePage/product.jsx"
import Signup from "./components/auth/signup/SignUp.jsx"
import Login from "./components/auth/login/Login.jsx"


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App