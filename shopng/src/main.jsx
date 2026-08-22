import { createRoot } from 'react-dom/client'
import store from './store/store.js'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import { ToastProvider } from './components/common/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <ToastProvider>
        <App />
      </ToastProvider>
    </Provider>

)
