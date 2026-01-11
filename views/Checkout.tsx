
import React, { useState } from 'react';
import { ArrowLeft, Send, MapPin, Phone, Mail, Home as HomeIcon, Trash2, ShieldCheck } from 'lucide-react';
import { CartItem, CustomerDetails, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CheckoutProps {
  cart: CartItem[];
  totalAmount: number;
  onRemove: (id: string) => void;
  onBack: () => void;
  language: Language;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, totalAmount, onRemove, onBack, language }) => {
  const [details, setDetails] = useState<CustomerDetails>({
    mobile: '',
    email: '',
    address: ''
  });
  const [isLocating, setIsLocating] = useState(false);
  const t = TRANSLATIONS[language];

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      setIsLocating(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setDetails(prev => ({
            ...prev,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            },
            address: prev.address || (language === 'en' ? "GPS Location Captured" : "இருப்பிடம் கண்டறியப்பட்டது")
          }));
          setIsLocating(false);
          alert(language === 'en' ? "GPS Location fetched successfully!" : "இருப்பிடம் வெற்றிகரமாக கண்டறியப்பட்டது!");
        },
        (error) => {
          console.error(error);
          setIsLocating(false);
          alert(language === 'en' ? "Location access denied." : "இருப்பிட அனுமதி மறுக்கப்பட்டது.");
        }
      );
    }
  };

  const sendToWhatsApp = () => {
    if (!details.mobile || !details.address) {
      alert(language === 'en' ? "Please fill in details." : "விவரங்களைப் பூர்த்தி செய்யவும்.");
      return;
    }

    const itemsList = cart.map(item => `- ${item.name} x ${item.quantity} (₹${(item.price * item.quantity).toLocaleString('en-IN')})`).join('%0A');
    const locationString = details.location ? `%0ALocation Link: https://www.google.com/maps?q=${details.location.lat},${details.location.lng}` : '';
    
    const title = language === 'en' ? '*FRESHMART ORDER INVOICE*' : '*FreshMart ஆர்டர் விவரம்*';
    const message = `${title}%0A%0A` +
      `*${t.items}:*%0A${itemsList}%0A%0A` +
      `*${t.amountToPay}:* ₹${totalAmount.toLocaleString('en-IN')}%0A%0A` +
      `*${t.deliveryInfo}:*%0A` +
      `- ${t.contactNumber}: ${details.mobile}%0A` +
      `- ${t.emailAddress}: ${details.email || 'N/A'}%0A` +
      `- ${t.streetAddress}: ${details.address}${locationString}%0A%0A` +
      `_Sent via FreshMart App_`;

    const phoneNumber = "919876543210"; 
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="flex flex-col h-screen bg-[#F7F9FC]">
      <header className="px-5 py-6 bg-white shadow-sm flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2.5 bg-gray-50 hover:bg-gray-100 rounded-2xl transition-colors">
            <ArrowLeft size={22} className="text-gray-700" />
          </button>
          <h1 className="text-xl font-black text-gray-800 tracking-tight">{t.checkout}</h1>
        </div>
        <div className="bg-green-50 px-3 py-1.5 rounded-xl border border-green-100 flex items-center gap-1.5">
          <ShieldCheck size={14} className="text-green-600" />
          <span className="text-[10px] font-black text-green-700 uppercase tracking-wider">{t.secure}</span>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-5 space-y-8 pb-32">
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-[2px]">{t.orderSummary}</h2>
            <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-[10px] font-bold">{cart.length} {t.items}</span>
          </div>
          <div className="bg-white rounded-[28px] shadow-sm border border-gray-100 divide-y overflow-hidden">
            {cart.map(item => (
              <div key={item.id} className="p-4 flex gap-4 bg-white hover:bg-gray-50/50 transition-colors">
                <div className="relative w-16 h-16 bg-gray-50 rounded-2xl overflow-hidden shrink-0">
                  <img src={item.image} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1">
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold text-gray-800 text-sm leading-tight">{item.name}</h3>
                    <button onClick={() => onRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-1">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-bold text-gray-400">{item.quantity} x ₹{item.price}</span>
                  </div>
                </div>
              </div>
            ))}
            <div className="p-5 flex justify-between items-center bg-green-50/30">
              <span className="font-bold text-gray-600 text-sm">{t.amountToPay}</span>
              <span className="text-2xl font-black text-green-700">₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xs font-black text-gray-400 uppercase tracking-[2px]">{t.deliveryInfo}</h2>
          
          <div className="bg-white p-6 rounded-[28px] shadow-sm border border-gray-100 space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">{t.contactNumber}</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-green-500 outline-none text-sm font-bold transition-all"
                  value={details.mobile}
                  onChange={(e) => setDetails({...details, mobile: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider ml-1">{t.emailAddress}</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email"
                  placeholder="yourname@gmail.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-green-500 outline-none text-sm font-bold transition-all"
                  value={details.email}
                  onChange={(e) => setDetails({...details, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1 mb-1">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-wider">{t.streetAddress}</label>
                <button 
                  onClick={handleLocation}
                  disabled={isLocating}
                  className="text-[10px] text-green-700 font-black flex items-center gap-1.5 bg-green-50 px-3 py-1.5 rounded-full active:scale-95 disabled:opacity-50 transition-all uppercase tracking-tight shadow-sm border border-green-100"
                >
                  <MapPin size={12} />
                  {isLocating ? t.fetching : t.gpsDetect}
                </button>
              </div>
              <div className="relative">
                <HomeIcon className="absolute left-4 top-4 text-gray-400" size={18} />
                <textarea 
                  rows={3}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-green-500 outline-none resize-none text-sm font-bold transition-all"
                  value={details.address}
                  onChange={(e) => setDetails({...details, address: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        <p className="text-center text-[10px] text-gray-400 px-10 leading-relaxed font-medium">
          {t.terms}
        </p>
      </main>

      <footer className="p-6 bg-white border-t border-gray-100 sticky bottom-0 z-10 rounded-t-[32px] shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
        <button 
          onClick={sendToWhatsApp}
          className="w-full bg-green-700 text-white py-5 rounded-[24px] font-black text-base flex items-center justify-center gap-3 hover:bg-green-800 active:scale-[0.97] transition-all shadow-[0_12px_24px_rgba(21,128,61,0.3)] uppercase tracking-wide"
        >
          <Send size={20} fill="white" />
          {t.sendWhatsApp}
        </button>
      </footer>
    </div>
  );
};

export default Checkout;
