import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Truck, CheckCircle, XCircle, ArrowLeft, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { useCartWishlist } from '@/contexts/CartWishlistContext';

export const Orders = () => {
  const { orders } = useCartWishlist();
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  
  const toggleOrder = (orderId: string) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };
  
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'processing':
        return <Clock className="h-4 w-4 text-brushed-steel" />;
      case 'shipped':
        return <Truck className="h-4 w-4 text-brushed-steel" />;
      case 'delivered':
        return <CheckCircle className="h-4 w-4 text-brushed-steel" />;
      default:
        return <XCircle className="h-4 w-4 text-brushed-steel/70" />;
    }
  };
  
  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };
  
  const getTotalItems = (items: any[]) => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-obsidian text-white">
        <Navigation />
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center">
          <div className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg p-12 max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-charcoal/70 rounded-full flex items-center justify-center mx-auto mb-6 border border-brushed-steel/30">
              <Truck className="h-8 w-8 text-brushed-steel" />
            </div>
            <h1 className="text-2xl font-serif font-bold mb-3">No Orders Yet</h1>
            <p className="text-gray-300 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
            </p>
            <Button asChild className="bg-white text-obsidian hover:bg-gray-100">
              <Link to="/shop">Start Shopping</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <Navigation />
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="flex items-center mb-8">
          <Button 
            asChild 
            variant="ghost" 
            className="text-white hover:bg-white/10 p-0"
          >
            <Link to="/account" className="flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Account
            </Link>
          </Button>
          <h1 className="text-3xl font-serif font-bold ml-4">Order History</h1>
        </div>
        
        <div className="space-y-4">
          {orders.map((order) => (
            <div 
              key={order.id} 
              className="bg-charcoal/50 border border-brushed-steel/20 rounded-lg overflow-hidden transition-all hover:border-brushed-steel/40"
            >
              <button 
                className="w-full p-6 text-left hover:bg-charcoal/30 transition-colors"
                onClick={() => toggleOrder(order.id)}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div className="mb-4 md:mb-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-lg font-medium text-white">Order #{order.id.split('-')[0]}</h3>
                      <span className="px-2 py-1 text-xs rounded-full bg-charcoal/70 text-gray-200 border border-brushed-steel/20">
                        {getTotalItems(order.items)} {getTotalItems(order.items) === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      Placed on {formatDate(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className="text-gray-200">{getStatusText(order.status)}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-brushed-steel">
                        {expandedOrder === order.id ? 'Hide Details' : 'View Details'}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
              
              {expandedOrder === order.id && (
                <div className="border-t border-brushed-steel/20 p-6 bg-charcoal/30">
                  <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-3 uppercase tracking-wider">Shipping Address</h4>
                      <address className="not-italic text-sm">
                        <div className="text-white">{order.shippingAddress.fullName}</div>
                        <div className="text-gray-300">{order.shippingAddress.address}</div>
                        <div className="text-gray-300">{order.shippingAddress.city}, {order.shippingAddress.postalCode}</div>
                        <div className="text-gray-300">{order.shippingAddress.country}</div>
                      </address>
                      {order.trackingNumber && (
                        <div className="mt-4">
                          <h4 className="text-xs font-medium text-gray-300 mb-1 uppercase tracking-wider">Tracking Number</h4>
                          <p className="text-sm text-white">{order.trackingNumber}</p>
                        </div>
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-gray-300 mb-3 uppercase tracking-wider">Payment Method</h4>
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-charcoal/50 rounded-md border border-brushed-steel/20">
                          <CreditCard className="h-5 w-5 text-brushed-steel" />
                        </div>
                        <div>
                          <p className="text-white">
                            {order.paymentMethod === 'credit' 
                              ? `Credit Card${order.cardLast4 ? ` •••• ${order.cardLast4}` : ''}` 
                              : 'PayPal'}
                          </p>
                          <p className="text-xs text-gray-400">
                            {order.paymentMethod === 'credit' ? 'Visa' : 'PayPal account'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <h4 className="text-xs font-medium text-gray-300 mb-3 uppercase tracking-wider">Order Items</h4>
                  <div className="space-y-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-charcoal/70 rounded-md overflow-hidden border border-brushed-steel/20">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h5 className="font-medium text-white">{item.name}</h5>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-gray-400">${item.price} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-brushed-steel/20">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">Subtotal</span>
                      <span className="text-white">${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-300 text-sm">Shipping</span>
                      <span className="text-white">${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-4">
                      <span className="text-gray-300 text-sm">Tax</span>
                      <span className="text-white">${order.tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-lg pt-4 border-t border-brushed-steel/20">
                      <span className="font-medium text-white">Total</span>
                      <span className="font-medium text-white">${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild variant="outline" className="border-brushed-steel text-brushed-steel hover:bg-brushed-steel/10">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Orders;
