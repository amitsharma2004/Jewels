import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import { Home, ProductListingPage, CartPage } from './pages';
import { Navbar, ErrorBoundary } from './components';
import './styles/global.css';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ErrorBoundary>
          <div className="app">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<ProductListingPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
