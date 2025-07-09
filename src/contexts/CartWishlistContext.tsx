import { createContext, useContext, useState, ReactNode } from 'react';
import { Product } from '@/components/ProductShowcase';

type CartItem = Product & { quantity: number };

export type Order = {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'processing' | 'shipped' | 'delivered';
  trackingNumber?: string;
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: 'credit' | 'paypal';
  cardLast4?: string;
};

type CartWishlistContextType = {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  
  // Wishlist
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  
  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'date' | 'status'>) => Order;
  getOrder: (orderId: string) => Order | undefined;
  
  // Helpers
  isInCart: (productId: number) => boolean;
};

const CartWishlistContext = createContext<CartWishlistContextType | undefined>(undefined);

export const CartWishlistProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });
  
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = typeof window !== 'undefined' ? localStorage.getItem('wishlist') : null;
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });
  
  const [orders, setOrders] = useState<Order[]>(() => {
    const savedOrders = typeof window !== 'undefined' ? localStorage.getItem('orders') : null;
    return savedOrders ? JSON.parse(savedOrders) : [];
  });

  // Save state to localStorage whenever it changes
  const saveState = (newCart: CartItem[] = cart, newWishlist: Product[] = wishlist, newOrders: Order[] = orders) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(newCart));
      localStorage.setItem('wishlist', JSON.stringify(newWishlist));
      localStorage.setItem('orders', JSON.stringify(newOrders));
    }
  };

  const addToCart = (product: Product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      const newCart = existingItem
        ? prevCart.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prevCart, { ...product, quantity: 1 }];
      
      saveState(newCart, wishlist, orders);
      return newCart;
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      saveState(newCart, wishlist, orders);
      return newCart;
    });
  };
  
  const clearCart = () => {
    setCart([]);
    saveState([], wishlist, orders);
  };
  
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };
  
  const getCartItemCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlist(prev => {
      const newWishlist = prev.some(item => item.id === product.id) 
        ? prev 
        : [...prev, product];
      saveState(cart, newWishlist, orders);
      return newWishlist;
    });
  };

  const removeFromWishlist = (productId: number) => {
    setWishlist(prev => {
      const newWishlist = prev.filter(item => item.id !== productId);
      saveState(cart, newWishlist, orders);
      return newWishlist;
    });
  };

  const isInCart = (productId: number) => {
    return cart.some(item => item.id === productId);
  };

  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  // Order management
  const createOrder = (orderData: Omit<Order, 'id' | 'date' | 'status'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ord_${Date.now()}`,
      date: new Date().toISOString(),
      status: 'processing',
    };
    
    setOrders(prev => {
      const newOrders = [newOrder, ...prev];
      saveState(cart, wishlist, newOrders);
      return newOrders;
    });
    
    // Clear cart after successful order
    clearCart();
    
    return newOrder;
  };
  
  const getOrder = (orderId: string) => {
    return orders.find(order => order.id === orderId);
  };

  return (
    <CartWishlistContext.Provider
      value={{
        // Cart
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartItemCount,
        
        // Wishlist
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        
        // Orders
        orders,
        createOrder,
        getOrder,
        
        // Helpers
        isInCart,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (context === undefined) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
