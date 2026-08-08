import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Please fill in all fields.')
      return
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address.')
      return
    }

    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center px-4 py-12">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-black mb-2">SHOP.CO</h1>
          <h2 className="text-xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-xs text-gray-500 mt-1">
            Sign up now and get <strong>20% off</strong> your first order.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <p className="text-xs text-red-500 font-medium text-center">{error}</p>}

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none border border-transparent focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none border border-transparent focus:border-black"
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1 text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-gray-100 rounded-full px-4 py-3 text-sm outline-none border border-transparent focus:border-black"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full bg-black text-white rounded-full py-3.5 font-medium cursor-pointer hover:bg-gray-800 transition-colors text-sm"
          >
            Sign Up
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-black font-bold underline">
            Log In
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Signup