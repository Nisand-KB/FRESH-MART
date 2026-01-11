
import { Product, Category, Language } from './types';

export const CATEGORIES: Category[] = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Pantry', 'Meat'];

export const TRANSLATIONS: Record<Language, any> = {
  en: {
    deliveryTo: "Delivery to",
    yourLocation: "Your Location",
    searchPlaceholder: "Search products, brands and more...",
    shopByCategory: "Shop by Category",
    seeAll: "See All",
    viewBag: "View Bag",
    items: "Items",
    item: "Item",
    checkout: "Checkout",
    orderSummary: "Order Summary",
    amountToPay: "Amount to Pay",
    deliveryInfo: "Delivery Information",
    contactNumber: "Contact Number",
    emailAddress: "Email Address",
    streetAddress: "Street Address",
    gpsDetect: "GPS Detect",
    fetching: "fetching...",
    terms: "By placing an order, you agree to FreshMart's Terms & Conditions.",
    sendWhatsApp: "Send Order to WhatsApp",
    secure: "Secure",
    noItems: "No items found in this section",
    categories: {
      All: "All",
      Fruits: "Fruits",
      Vegetables: "Vegetables",
      Dairy: "Dairy",
      Bakery: "Bakery",
      Pantry: "Pantry",
      Meat: "Meat"
    },
    units: {
      kg: "kg",
      bunch: "bunch",
      L: "L",
      pkt: "pkt",
      pc: "pc",
      btl: "btl",
      cup: "cup"
    }
  },
  ta: {
    deliveryTo: "டெலிவரி",
    yourLocation: "உங்கள் இருப்பிடம்",
    searchPlaceholder: "பொருட்களைத் தேடுங்கள்...",
    shopByCategory: "வகைகள் மூலம் ஷாப்பிங்",
    seeAll: "அனைத்தையும் பார்",
    viewBag: "பையை பார்",
    items: "பொருட்கள்",
    item: "பொருள்",
    checkout: "செக் அவுட்",
    orderSummary: "ஆர்டர் விவரம்",
    amountToPay: "செலுத்த வேண்டிய தொகை",
    deliveryInfo: "டெலிவரி தகவல்",
    contactNumber: "கைபேசி எண்",
    emailAddress: "மின்னஞ்சல் முகவரி",
    streetAddress: "தெரு முகவரி",
    gpsDetect: "இருப்பிடத்தைக் கண்டுபிடி",
    fetching: "தேடுகிறது...",
    terms: "ஆர்டர் செய்வதன் மூலம், நீங்கள் FreshMart-ன் விதிமுறைகளை ஏற்கிறீர்கள்.",
    sendWhatsApp: "வாட்ஸ்அப்பில் ஆர்டர் செய்",
    secure: "பாதுகாப்பானது",
    noItems: "இப்பகுதியில் பொருட்கள் இல்லை",
    categories: {
      All: "அனைத்தும்",
      Fruits: "பழங்கள்",
      Vegetables: "காய்கறிகள்",
      Dairy: "பால் பொருட்கள்",
      Bakery: "பேக்கரி",
      Pantry: "மளிகை",
      Meat: "இறைச்சி"
    },
    units: {
      kg: "கிலோ",
      bunch: "கட்டு",
      L: "லிட்டர்",
      pkt: "பேக்கட்",
      pc: "ஒன்று",
      btl: "பாட்டில்",
      cup: "கப்"
    }
  }
};

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Red Apples',
    price: 180,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=80&w=400',
    description: 'Crispy and sweet organic red apples.',
    unit: 'kg'
  },
  {
    id: '2',
    name: 'Fresh Spinach (Palak)',
    price: 40,
    category: 'Vegetables',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&q=80&w=400',
    description: 'Fresh leafy greens rich in iron.',
    unit: 'bunch'
  },
  {
    id: '3',
    name: 'Amul Taaza Milk',
    price: 66,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1563636619-e910ef2a844b?auto=format&fit=crop&q=80&w=400',
    description: 'Pasteurized toned milk.',
    unit: 'L'
  },
  {
    id: '4',
    name: 'Multigrain Bread',
    price: 55,
    category: 'Bakery',
    image: 'https://images.unsplash.com/photo-1585478259715-876acc5be8eb?auto=format&fit=crop&q=80&w=400',
    description: 'Healthy multigrain freshly baked.',
    unit: 'pkt'
  },
  {
    id: '5',
    name: 'Hass Avocados',
    price: 250,
    category: 'Fruits',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&q=80&w=400',
    description: 'Creamy ripe avocados.',
    unit: 'pc'
  },
  {
    id: '6',
    name: 'Fresh Chicken Breast',
    price: 320,
    category: 'Meat',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&q=80&w=400',
    description: 'Lean and tender chicken breast.',
    unit: 'kg'
  },
  {
    id: '7',
    name: 'Fortune Olive Oil',
    price: 850,
    category: 'Pantry',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacabc88c5?auto=format&fit=crop&q=80&w=400',
    description: 'Pure refined olive oil for cooking.',
    unit: 'btl'
  },
  {
    id: '8',
    name: 'Fresh Greek Yogurt',
    price: 90,
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?auto=format&fit=crop&q=80&w=400',
    description: 'Thick and creamy plain curd.',
    unit: 'cup'
  }
];
