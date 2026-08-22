import React, { useCallback, useRef, useState } from 'react'
import ToastContext from './toastContext'
import './toast.css'

let idCounter = 0

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])
  const timeouts = useRef({})

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    clearTimeout(timeouts.current[id])
    delete timeouts.current[id]
  }, [])

  const showToast = useCallback((message, options = {}) => {
    const { type = 'success', duration = 2600, icon } = options
    const id = ++idCounter

    setToasts((prev) => [...prev, { id, message, type, icon }])

    timeouts.current[id] = setTimeout(() => {
      removeToast(id)
    }, duration)

    return id
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <span className="toast-icon">
              {toast.icon ?? (toast.type === 'success' ? '✓' : toast.type === 'error' ? '✕' : 'ℹ')}
            </span>
            <span className="toast-message">{toast.message}</span>
            <button
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Dismiss notification"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
