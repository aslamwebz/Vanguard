import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface StripePaymentFormProps {
  amount: number;
  onSuccess: (paymentIntent: any) => void;
  onError: (error: string) => void;
}

export const StripePaymentForm = ({ amount, onSuccess, onError }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // In a real app, this would be a secure API call to your backend
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Convert to cents
      });

      const { clientSecret } = await response.json();
      
      // For demo purposes, we'll simulate a successful payment
      // In a real app, you would use stripe.confirmCardPayment()
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock a successful payment response
      const mockPaymentIntent = {
        id: 'pi_mock_' + Math.random().toString(36).substr(2, 9),
        amount: Math.round(amount * 100),
        status: 'succeeded',
        created: Math.floor(Date.now() / 1000),
        currency: 'usd',
        payment_method_types: ['card'],
        metadata: {}
      };
      
      onSuccess(mockPaymentIntent);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'An error occurred during payment';
      setError(message);
      onError(message);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardElementOptions = {
    style: {
      base: {
        color: '#ffffff',
        fontFamily: 'sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#9ca3af',
        },
        backgroundColor: '#2d2d2d',
      },
      invalid: {
        color: '#f87171',
        iconColor: '#f87171',
      },
    },
    hidePostalCode: true,
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="border border-brushed-steel/30 rounded-lg p-4 bg-charcoal/50">
        <CardElement options={cardElementOptions} />
      </div>
      
      {error && (
        <div className="text-red-400 text-sm p-3 bg-red-900/30 rounded-md">
          {error}
        </div>
      )}
      
      <div className="flex flex-col space-y-4 pt-4">
        <div className="bg-charcoal/70 p-4 rounded-lg border border-brushed-steel/20">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Test Card Details</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="space-y-1">
              <div className="text-gray-400">Card Number</div>
              <div className="text-white font-mono">4242 4242 4242 4242</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">Expiry</div>
              <div className="text-white">Any future date</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">CVC</div>
              <div className="text-white">Any 3 digits</div>
            </div>
            <div className="space-y-1">
              <div className="text-gray-400">Postal Code</div>
              <div className="text-white">Any 5 digits</div>
            </div>
          </div>
        </div>
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="bg-white text-obsidian hover:bg-gray-100 disabled:opacity-50 w-48 justify-center"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>
      </div>
    </form>
  );
};

export default StripePaymentForm;
