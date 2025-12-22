/**
 * Sam's Hardware Payment Failure Page
 * 
 * Displayed after failed/cancelled payment from PayFast.
 */

'use client';

import React, { useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { XCircle, RefreshCw, HelpCircle, ArrowLeft } from 'lucide-react';
import { verifyPaymentResult } from '@/services/payfast';
import { SHOP_ROUTES } from '@/shop/utils/constants';
import { LoadingSpinner } from '@/shop/ui/LoadingSpinner';

function PaymentFailureContent() {
  const searchParams = useSearchParams();
  const result = verifyPaymentResult(searchParams);
  const reason = searchParams.get('reason');
  
  // Clear stored order ID on payment failure
  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('pending_order_id');
      sessionStorage.removeItem('pending_order_number');
    }
  }, []);
  
  // Determine error message
  let errorMessage = 'Your payment could not be completed.';
  let errorDetail = 'This could be due to insufficient funds, card decline, or cancellation.';
  
  if (reason === 'out_of_stock') {
    errorMessage = 'Some items in your cart are out of stock.';
    errorDetail = 'Please return to your cart and remove or update the unavailable items.';
  } else if (reason === 'cancelled') {
    errorMessage = 'You cancelled the payment.';
    errorDetail = 'No charges have been made to your account.';
  } else if (result.message) {
    errorDetail = result.message;
  }
  
  return (
    <main className="min-h-screen bg-te-white flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        {/* Failure Icon */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100">
            <XCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>
        
        {/* Failure Message */}
        <h1 className="text-3xl font-bold text-te-dark mb-4">
          Payment Failed
        </h1>
        
        <p className="text-te-grey mb-2">
          {errorMessage}
        </p>
        
        <p className="text-sm text-te-grey mb-8">
          {errorDetail}
        </p>
        
        {/* What to do */}
        <div className="te-panel p-6 mb-8 text-left">
          <h2 className="font-bold text-te-dark mb-4">What you can do:</h2>
          <ul className="space-y-3 text-sm text-te-grey">
            <li className="flex items-start gap-3">
              <RefreshCw className="w-5 h-5 text-te-yellow flex-shrink-0 mt-0.5" />
              <span>Try again with a different payment method or card</span>
            </li>
            <li className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-te-yellow flex-shrink-0 mt-0.5" />
              <span>Contact your bank if the issue persists</span>
            </li>
            <li className="flex items-start gap-3">
              <ArrowLeft className="w-5 h-5 text-te-yellow flex-shrink-0 mt-0.5" />
              <span>Return to cart and verify your items are available</span>
            </li>
          </ul>
        </div>
        
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={SHOP_ROUTES.CART}>
            <button className="te-button w-full sm:w-auto flex items-center justify-center gap-2">
              <ArrowLeft size={18} />
              Return to Cart
            </button>
          </Link>
          <Link href={SHOP_ROUTES.CHECKOUT}>
            <button className="te-button-primary w-full sm:w-auto flex items-center justify-center gap-2">
              <RefreshCw size={18} />
              Try Again
            </button>
          </Link>
        </div>
        
        {/* Support Info */}
        <p className="text-xs text-te-grey mt-8">
          Need help? Contact us at{' '}
          <a href="mailto:support@samshardware.co.za" className="text-te-dark hover:underline">
            support@samshardware.co.za
          </a>
        </p>
      </div>
    </main>
  );
}

export default function PaymentFailurePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    }>
      <PaymentFailureContent />
    </Suspense>
  );
}

