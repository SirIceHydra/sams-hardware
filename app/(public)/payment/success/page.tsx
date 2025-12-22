/**
 * Sam's Hardware Payment Success Page
 * 
 * Displayed after successful payment from PayFast.
 */

'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ShoppingBag, ArrowRight } from 'lucide-react';
import { verifyPaymentResult, confirmPayment } from '@/services/payfast';
import { SHOP_ROUTES } from '@/shop/utils/constants';
import { LoadingSpinner } from '@/shop/ui/LoadingSpinner';

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const result = verifyPaymentResult(searchParams);
  const [isConfirming, setIsConfirming] = useState(true);
  const [confirmationError, setConfirmationError] = useState<string | null>(null);
  
  useEffect(() => {
    // Confirm payment with backend and update order status
    const handlePaymentConfirmation = async () => {
      // Get order ID from result or sessionStorage
      const orderId = result.orderId || (typeof window !== 'undefined' ? sessionStorage.getItem('pending_order_id') : null);
      
      if (!result.success || !orderId) {
        setIsConfirming(false);
        return;
      }

      try {
        // Extract all URL parameters for payment confirmation
        const paymentData: { [key: string]: string | undefined } = {};
        searchParams.forEach((value, key) => {
          paymentData[key] = value;
        });

        const confirmation = await confirmPayment({
          orderId: orderId,
          paymentId: result.paymentId,
          ...paymentData,
        });

        if (!confirmation.success) {
          console.error('Payment confirmation failed:', confirmation.error);
          setConfirmationError(confirmation.message || 'Failed to confirm payment');
        } else {
          console.log('Payment confirmed successfully:', confirmation.message);
          // Clear the stored order ID after successful confirmation
          if (typeof window !== 'undefined') {
            sessionStorage.removeItem('pending_order_id');
            sessionStorage.removeItem('pending_order_number');
          }
        }
      } catch (error) {
        console.error('Error during payment confirmation:', error);
        setConfirmationError('An error occurred while confirming payment');
      } finally {
        setIsConfirming(false);
      }
    };

    handlePaymentConfirmation();
  }, [result, searchParams]);
  
  // Show loading state while confirming payment
  if (isConfirming) {
    return (
      <main className="min-h-screen bg-te-white flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <LoadingSpinner size="lg" text="Confirming your payment..." />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-te-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>
        
        {/* Confirmation Error Warning */}
        {confirmationError && (
          <div className="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-800">
            <p className="font-semibold mb-1">Note:</p>
            <p>{confirmationError}</p>
            <p className="mt-2 text-xs">Your payment was successful, but there was an issue updating the order status. Please contact support if needed.</p>
          </div>
        )}
        
        {/* Success Message */}
        <h1 className="text-3xl font-bold text-te-dark mb-4">
          Payment Successful!
        </h1>
        
        <p className="text-te-grey mb-2">
          Thank you for your order. Your payment has been processed successfully.
        </p>
        
        {result.orderId && (
          <p className="text-sm text-te-grey mb-8">
            Order Reference: <span className="font-mono font-bold text-te-dark">#{result.orderId}</span>
          </p>
        )}
        
        {/* Order Confirmation Info */}
        <div className="te-panel p-6 mb-8 text-left">
          <h2 className="font-bold text-te-dark mb-4">What happens next?</h2>
          <ul className="space-y-3 text-sm text-te-grey">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-te-yellow flex items-center justify-center text-te-dark font-bold text-xs flex-shrink-0">1</span>
              <span>You'll receive an email confirmation with your order details</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-te-yellow flex items-center justify-center text-te-dark font-bold text-xs flex-shrink-0">2</span>
              <span>We'll prepare your order for shipping</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-te-yellow flex items-center justify-center text-te-dark font-bold text-xs flex-shrink-0">3</span>
              <span>You'll receive a shipping notification with tracking information</span>
            </li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={SHOP_ROUTES.SHOP}>
            <button className="te-button w-full sm:w-auto flex items-center justify-center gap-2">
              <ShoppingBag size={18} />
              Continue Shopping
            </button>
          </Link>
          <Link href={SHOP_ROUTES.ORDERS}>
            <button className="te-button-primary w-full sm:w-auto flex items-center justify-center gap-2">
              View Orders
              <ArrowRight size={18} />
            </button>
          </Link>
        </div>
        
        {/* Support Info */}
        <p className="text-xs text-te-grey mt-8">
          Questions about your order? Contact us at{' '}
          <a href="mailto:support@samshardware.co.za" className="text-te-dark hover:underline">
            support@samshardware.co.za
          </a>
        </p>
      </div>
    </main>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}

