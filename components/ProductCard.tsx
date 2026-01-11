
import React from 'react';
import { Plus, Minus } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  quantity: number;
  onUpdateQuantity: (newQty: number) => void;
  language: Language;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, quantity, onUpdateQuantity, language }) => {
  const t = TRANSLATIONS[language];
  const translatedUnit = t.units[product.unit as keyof typeof t.units] || product.unit;
  const translatedCategory = t.categories[product.category as keyof typeof t.categories] || product.category;

  return (
    <div className="bg-white rounded-[24px] overflow-hidden shadow-sm border border-gray-100 flex flex-col group transition-all active:scale-[0.98]">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {quantity > 0 && (
          <div className="absolute inset-0 bg-green-900/10 backdrop-blur-[1px]" />
        )}
        <div className="absolute top-3 left-3">
          <span className="bg-white/95 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black text-green-700 shadow-sm border border-green-50 uppercase tracking-tighter">
            {translatedCategory}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-1">
        <div className="mb-2">
          <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-1 mb-0.5">{product.name}</h3>
          <p className="text-[11px] text-gray-400 line-clamp-1 leading-tight">{product.description}</p>
        </div>
        
        <div className="mt-auto pt-2 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase leading-none mb-0.5">{translatedUnit}</span>
            <p className="font-black text-gray-900 text-base leading-none">
              ₹{product.price}
            </p>
          </div>

          {quantity === 0 ? (
            <button 
              onClick={(e) => { e.stopPropagation(); onUpdateQuantity(1); }}
              className="bg-green-600 text-white p-2.5 rounded-2xl hover:bg-green-700 transition-all shadow-md shadow-green-100 active:scale-90"
            >
              <Plus size={18} />
            </button>
          ) : (
            <div className="flex items-center gap-2.5 bg-green-600 rounded-2xl p-1 shadow-md shadow-green-100">
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(Math.max(0, quantity - 1)); }}
                className="text-white p-1 hover:bg-green-700 rounded-xl transition-colors"
              >
                <Minus size={14} />
              </button>
              <span className="text-xs font-black text-white w-4 text-center">{quantity}</span>
              <button 
                onClick={(e) => { e.stopPropagation(); onUpdateQuantity(quantity + 1); }}
                className="text-white p-1 hover:bg-green-700 rounded-xl transition-colors"
              >
                <Plus size={14} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
