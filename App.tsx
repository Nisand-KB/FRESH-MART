
import React, { useState, useMemo } from 'react';
import { HashRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { Product, CartItem, Language } from './types';
import Home from './views/Home';
import Checkout from './views/Checkout';

const AppContent: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<Language>('en');
  const navigate = useNavigate();

  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (quantity === 0) return prev.filter(item => item.id !== product.id);
        return prev.map(item => item.id === product.id ? { ...item, quantity } : item);
      }
      if (quantity > 0) {
        return [...prev, { ...product, quantity }];
      }
      return prev;
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const totalAmount = useMemo(() => {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [cart]);

  return (
    <div className="min-h-screen max-w-md mx-auto bg-gray-50 shadow-xl overflow-hidden relative border-x border-gray-100">
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              cart={cart} 
              onAddToCart={addToCart} 
              totalAmount={totalAmount}
              onGoToCheckout={() => navigate('/checkout')}
              language={language}
              onLanguageChange={setLanguage}
            />
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Checkout 
              cart={cart} 
              totalAmount={totalAmount} 
              onRemove={removeFromCart}
              onBack={() => navigate('/')}
              language={language}
            />
          } 
        />
      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
