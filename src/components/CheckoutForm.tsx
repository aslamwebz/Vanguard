import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartWishlist } from '@/contexts/CartWishlistContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

type CheckoutFormData = {
  email: string;
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  paymentMethod: 'credit' | 'paypal';
  cardNumber?: string;
  cardExpiry?: string;
  cardCvc?: string;
  saveInfo: boolean;
};

export const CheckoutForm = ({ onBack }: { onBack: () => void }) => {
  const { cart, getCartTotal, createOrder } = useCartWishlist();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States',
    paymentMethod: 'credit',
    saveInfo: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create order
      const order = createOrder({
        items: cart,
        subtotal: getCartTotal(),
        shipping: getCartTotal() > 0 ? 15 : 0,
        tax: getCartTotal() * 0.1, // 10% tax
        total: getCartTotal() * 1.1 + (getCartTotal() > 0 ? 15 : 0),
        shippingAddress: {
          fullName: formData.fullName,
          address: formData.address,
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
        },
        paymentMethod: formData.paymentMethod,
      });

      // Redirect to order confirmation
      navigate(`/order-confirmation/${order.id}`);
    } catch (error) {
      console.error('Checkout failed:', error);
      // Handle error (show error message to user)
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button onClick={() => navigate('/shop')}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian text-white">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Contact Information */}
            <Card className="bg-charcoal/50 border-brushed-steel/20">
              <CardHeader>
                <CardTitle className="text-white font-medium">Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                      required
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      id="saveInfo"
                      name="saveInfo"
                      type="checkbox"
                      checked={formData.saveInfo}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-brushed-steel/30 bg-charcoal/70 focus:ring-white/20"
                    />
                    <label htmlFor="saveInfo" className="ml-2 text-sm text-gray-300">
                      Save this information for next time
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card className="bg-charcoal/50 border-brushed-steel/20">
              <CardHeader>
                <CardTitle className="text-white font-medium">Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-gray-300">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-gray-300">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="postalCode" className="text-gray-300">Postal Code</Label>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-gray-300">Country</Label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full p-2.5 rounded-md border border-brushed-steel/30 bg-charcoal/70 text-white focus:border-white/50 focus:ring-white/20 text-sm"
                      required
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card className="bg-charcoal/50 border-brushed-steel/20">
              <CardHeader>
                <CardTitle className="text-white font-medium">Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup 
                  value={formData.paymentMethod} 
                  onValueChange={(value) => setFormData(prev => ({
                    ...prev,
                    paymentMethod: value as 'credit' | 'paypal'
                  }))}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-3 border border-brushed-steel/20 rounded-md p-4 hover:border-white/30 transition-colors">
                    <RadioGroupItem 
                      value="credit" 
                      id="credit" 
                      className="border-brushed-steel/50 text-white data-[state=checked]:bg-white data-[state=checked]:border-white" 
                    />
                    <Label htmlFor="credit" className="flex-1 cursor-pointer text-white">
                      Credit Card
                    </Label>
                    <div className="flex space-x-2">
                      <span className="text-gray-400">••••</span>
                      <span className="text-gray-400">••••</span>
                      <span className="text-gray-400">••••</span>
                      <span className="text-gray-300">1234</span>
                    </div>
                  </div>
                  
                  {formData.paymentMethod === 'credit' && (
                    <div className="pl-8 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber" className="text-gray-300">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="0000 0000 0000 0000"
                          value={formData.cardNumber}
                          onChange={handleChange}
                          className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                          required
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry" className="text-gray-300">Expiration (MM/YY)</Label>
                          <Input
                            id="cardExpiry"
                            name="cardExpiry"
                            placeholder="MM/YY"
                            value={formData.cardExpiry}
                            onChange={handleChange}
                            className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cardCvc" className="text-gray-300">CVC</Label>
                          <Input
                            id="cardCvc"
                            name="cardCvc"
                            placeholder="123"
                            value={formData.cardCvc}
                            onChange={handleChange}
                            className="bg-charcoal/70 border-brushed-steel/30 text-white placeholder-gray-500 focus:border-white/50 focus-visible:ring-white/20"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-3 border border-brushed-steel/20 rounded-md p-4 hover:border-white/30 transition-colors">
                    <RadioGroupItem 
                      value="paypal" 
                      id="paypal" 
                      className="border-brushed-steel/50 text-white data-[state=checked]:bg-white data-[state=checked]:border-white"
                    />
                    <Label htmlFor="paypal" className="flex-1 cursor-pointer text-white">
                      PayPal
                    </Label>
                    <span className="text-sm text-gray-400">
                      You'll be redirected to PayPal
                    </span>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
            
            <div className="flex justify-between pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={onBack}
                className="text-white hover:bg-white/10"
              >
                Back to Cart
              </Button>
              <Button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="bg-white text-obsidian hover:bg-gray-100 transition-colors"
              >
                {isSubmitting ? 'Processing...' : 'Complete Order'}
              </Button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:sticky md:top-8 h-fit">
            <Card className="bg-charcoal/50 border-brushed-steel/20">
              <CardHeader>
                <CardTitle className="text-white font-medium">Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-charcoal/70 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-medium text-white">{item.name}</h4>
                            <p className="text-sm text-gray-400">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-white">
                            ${(parseFloat(item.price.replace(/[^0-9.-]+/g, '')) * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-brushed-steel/20 pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Subtotal</span>
                      <span className="text-white">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Shipping</span>
                      <span className="text-white">{getCartTotal() > 0 ? '$15.00' : 'Free'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Tax (10%)</span>
                      <span className="text-white">${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span className="text-white">Total</span>
                      <span className="text-white">${(getCartTotal() * 1.1 + (getCartTotal() > 0 ? 15 : 0)).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        <form id="checkout-form" onSubmit={handleSubmit} className="hidden" />
      </div>
      
      <form id="checkout-form" onSubmit={handleSubmit} className="hidden" />
    </div>
  );
};
