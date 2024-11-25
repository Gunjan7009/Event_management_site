import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './redux/store.js';
import { Provider } from 'react-redux';
// import { AuthProvider } from './context/Authcontext';

createRoot(document.getElementById('root')).render(
  <Provider store={store} >
  <BrowserRouter>
    <App />
    </BrowserRouter>
    </Provider>
)
