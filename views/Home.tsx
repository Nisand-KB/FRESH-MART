
import React, { useState, useMemo } from 'react';
import { Search, ShoppingBag, ChevronRight, MapPin, Languages } from 'lucide-react';
import { Product, CartItem, Category, Language } from '../types';
import { PRODUCTS, CATEGORIES, TRANSLATIONS } from '../constants';
import ProductCard from '../components/ProductCard';

interface HomeProps {
  cart: CartItem[];
  onAddToCart: (product: Product, quantity: number) => void;
  totalAmount: number;
  onGoToCheckout: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Home: React.FC<HomeProps> = ({ cart, onAddToCart, totalAmount, onGoToCheckout, language, onLanguageChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const t = TRANSLATIONS[language];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F7F9FC]">
      {/* Native Mobile Header */}
      <header className="px-5 pt-6 pb-4 bg-white shadow-sm border-b border-gray-100">
        <div className="flex items-center justify-between mb-5">
          <div className="flex-1">
            <div className="flex items-center gap-1 text-gray-400 text-[10px] font-bold uppercase tracking-widest mb-0.5">
              <MapPin size={10} className="text-green-600" />
              {t.deliveryTo}
            </div>
            <h1 className="text-sm font-bold text-gray-800 flex items-center gap-1">
              {t.yourLocation} <ChevronRight size={14} className="text-gray-400" />
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <button 
              onClick={() => onLanguageChange(language === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-xl text-[10px] font-bold text-gray-600 active:scale-95 transition-all"
            >
              <Languages size={14} className="text-green-600" />
              {language === 'en' ? 'தமிழ்' : 'English'}
            </button>
            <div className="relative">
              <div className="bg-green-50 p-2.5 rounded-2xl text-green-600 active:scale-90 transition-transform cursor-pointer">
                <ShoppingBag size={22} />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold border-2 border-white shadow-sm">
                    {cart.length}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-green-600 transition-colors" size={18} />
          <input 
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full bg-gray-100 border-none rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-green-500 text-sm placeholder-gray-400 font-medium transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </header>

      {/* Categories Scroller */}
      <div className="py-4 bg-white border-b border-gray-100">
        <div className="px-5 flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-gray-800">{t.shopByCategory}</h2>
          <button className="text-xs text-green-600 font-bold uppercase tracking-tight">{t.seeAll}</button>
        </div>
        <div className="flex gap-3 overflow-x-auto no-scrollbar px-5">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border shadow-sm ${
                activeCategory === cat 
                ? 'bg-green-600 text-white border-green-600' 
                : 'bg-white text-gray-500 border-gray-100 hover:bg-gray-50'
              }`}
            >
              {t.categories[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Product List Grid */}
      <main className="flex-1 overflow-y-auto px-5 py-4 bg-[#F7F9FC] pb-28">
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map(product => {
            const cartItem = cart.find(item => item.id === product.id);
            return (
              <ProductCard 
                key={product.id}
                product={product}
                quantity={cartItem?.quantity || 0}
                onUpdateQuantity={(qty) => onAddToCart(product, qty)}
                language={language}
              />
            );
          })}
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400 opacity-60">
            <ShoppingBag size={48} strokeWidth={1} className="mb-2" />
            <p className="text-sm font-medium">{t.noItems}</p>
          </div>
        )}
      </main>

      {/* Float Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-5 right-5 z-20 max-w-[calc(100%-40px)] mx-auto">
          <button 
            onClick={onGoToCheckout}
            className="w-full bg-green-700 text-white py-4.5 px-6 rounded-[24px] shadow-[0_10px_30px_rgba(21,128,61,0.4)] flex items-center justify-between hover:bg-green-800 transition-all active:scale-95"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-600 p-2 rounded-xl relative">
                <ShoppingBag size={20} className="text-white" />
              </div>
              <div className="text-left">
                <p className="text-[10px] text-green-200 font-bold uppercase tracking-widest leading-none mb-1">
                  {cart.length} {cart.length > 1 ? t.items : t.item}
                </p>
                <p className="font-extrabold text-lg leading-none">₹{totalAmount.toLocaleString('en-IN')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 font-bold">
              <span>{t.viewBag}</span>
              <ChevronRight size={20} />
            </div>
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
