// This is a mock implementation for client-side payment intent creation
// In a production app, this would be a serverless function or API endpoint
// that securely handles your Stripe secret key

export default async function handler(req: { body: { amount: number } }) {
  // In a real app, you would make an API call to your backend here
  // For demo purposes, we'll return a mock client secret
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        clientSecret: 'pi_mock_' + Math.random().toString(36).substr(2, 9)
      });
    }, 500);
  });
}
