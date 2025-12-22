/**
 * Sam's Hardware Checkout Page
 * 
 * Checkout page with billing/shipping forms, shipping selection, and payment.
 */

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Lock, Check, AlertCircle, Truck } from 'lucide-react';
import { useShop } from '@/shop/core/ShopProvider';
import { useCheckout, CheckoutFormData } from '@/shop/core/hooks/useCheckout';
import { useShipping } from '@/shipping/hooks/useShipping';
import { LoadingSpinner } from '@/shop/ui/LoadingSpinner';
import { formatPrice, validateCheckoutForm } from '@/shop/utils/helpers';
import { SHOP_CONFIG, SHOP_ROUTES, SHIPPING_CONFIG } from '@/shop/utils/constants';
import toast from 'react-hot-toast';
import type { ShippingItem, ShippingAddress } from '@/shipping/types/shipping';

export default function CheckoutPage() {
  const { cart } = useShop();
  const { items, total: cartTotal, itemCount, clearCart } = cart;
  const { loading, error, stockErrors, processCheckout, clearError } = useCheckout();
  const { 
    rates: shippingRates, 
    selectedRate: selectedShipping, 
    loading: shippingLoading,
    fetchRates,
    selectRate,
    getShippingCost 
  } = useShipping();
  
  // Form state
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postcode: '',
    country: 'ZA',
    useSameAddress: true,
    customerNote: '',
  });
  
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate totals
  const shippingCost = getShippingCost();
  const orderTotal = cartTotal + shippingCost;
  const hasFreeShipping = cartTotal >= SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
  
  // Fetch shipping rates when address is complete
  useEffect(() => {
    if (
      formData.address &&
      formData.city &&
      formData.state &&
      formData.postcode &&
      items.length > 0
    ) {
      const destination: ShippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        addressLine1: formData.address,
        city: formData.city,
        state: formData.state,
        postcode: formData.postcode,
        country: formData.country || 'ZA',
      };
      
      const shippingItems: ShippingItem[] = items.map(item => ({
        productId: item.productId,
        name: item.name,
        quantity: item.quantity,
        price: Number(item.salePrice ?? item.price ?? item.regularPrice) || 0,
      }));
      
      fetchRates(destination, shippingItems);
    }
  }, [formData.address, formData.city, formData.state, formData.postcode, items, fetchRates, formData.firstName, formData.lastName, formData.country]);
  
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateCheckoutForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Validate shipping selection
    if (!selectedShipping && !hasFreeShipping) {
      toast.error('Please select a shipping method');
      return;
    }
    
    setIsSubmitting(true);
    clearError();
    
    try {
      const success = await processCheckout(
        items,
        formData,
        selectedShipping && !hasFreeShipping ? {
          methodId: selectedShipping.serviceCode,
          methodTitle: selectedShipping.serviceName,
          total: selectedShipping.price,
        } : undefined
      );
      
      if (success) {
        // Clear cart on successful checkout (payment redirect will happen)
        clearCart();
        toast.success('Redirecting to payment...');
      }
    } catch (err: any) {
      toast.error(err.message || 'Checkout failed');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Redirect to cart if empty
  if (items.length === 0 && !isSubmitting) {
    return (
      <main className="min-h-screen bg-te-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-te-dark mb-4">Your cart is empty</h1>
          <Link href={SHOP_ROUTES.SHOP}>
            <button className="te-button-primary">Continue Shopping</button>
          </Link>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-te-white">
      {/* Header */}
      <section className="bg-[var(--te-white)] py-8 border-b border-[var(--te-grey-200)]">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4">
            <Link href={SHOP_ROUTES.CART} className="text-[var(--te-dark)]/70 hover:text-[var(--te-dark)] transition-colors">
              <ArrowLeft size={24} />
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--te-dark)] tracking-tight">
                CHECKOUT
              </h1>
              <div className="flex items-center gap-2 mt-1 text-[var(--te-grey-400)]">
                <Lock size={14} />
                <span className="text-sm">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Error Alert */}
      {error && (
        <section className="bg-red-50 border-b border-red-100 py-4">
          <div className="container mx-auto px-4 flex items-center gap-3 text-red-600">
            <AlertCircle size={20} />
            <span>{error}</span>
            {stockErrors && stockErrors.length > 0 && (
              <ul className="ml-4 text-sm">
                {stockErrors.map((err, idx) => (
                  <li key={idx}>• {err.name || `Product ${err.productId}`}: {err.error}</li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}
      
      {/* Checkout Content */}
      <section className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Column - Forms */}
            <div className="flex-1 space-y-8">
              {/* Contact Information */}
              <div className="te-panel p-6">
                <h2 className="text-lg font-bold text-te-dark mb-6 uppercase tracking-wider">
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-te-dark mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`te-input w-full ${formErrors.firstName ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-te-dark mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`te-input w-full ${formErrors.lastName ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.lastName}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-te-dark mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`te-input w-full ${formErrors.email ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-te-dark mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`te-input w-full ${formErrors.phone ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.phone && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Billing Address */}
              <div className="te-panel p-6">
                <h2 className="text-lg font-bold text-te-dark mb-6 uppercase tracking-wider">
                  Billing Address
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-te-dark mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`te-input w-full ${formErrors.address ? 'border-red-500' : ''}`}
                      required
                    />
                    {formErrors.address && (
                      <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-te-dark mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`te-input w-full ${formErrors.city ? 'border-red-500' : ''}`}
                        required
                      />
                      {formErrors.city && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.city}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-te-dark mb-2">
                        Province/State *
                      </label>
                      <select
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`te-input w-full ${formErrors.state ? 'border-red-500' : ''}`}
                        required
                      >
                        <option value="">Select province</option>
                        <option value="EC">Eastern Cape</option>
                        <option value="FS">Free State</option>
                        <option value="GP">Gauteng</option>
                        <option value="KZN">KwaZulu-Natal</option>
                        <option value="LP">Limpopo</option>
                        <option value="MP">Mpumalanga</option>
                        <option value="NC">Northern Cape</option>
                        <option value="NW">North West</option>
                        <option value="WC">Western Cape</option>
                      </select>
                      {formErrors.state && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.state}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-te-dark mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className={`te-input w-full ${formErrors.postcode ? 'border-red-500' : ''}`}
                        maxLength={4}
                        required
                      />
                      {formErrors.postcode && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.postcode}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-te-dark mb-2">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        className="te-input w-full"
                        required
                      >
                        <option value="ZA">South Africa</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Same as billing checkbox */}
                <label className="flex items-center gap-3 mt-6 cursor-pointer">
                  <input
                    type="checkbox"
                    name="useSameAddress"
                    checked={formData.useSameAddress}
                    onChange={handleInputChange}
                    className="w-5 h-5 accent-te-yellow"
                  />
                  <span className="text-sm text-te-dark">Ship to same address</span>
                </label>
              </div>
              
              {/* Shipping Method */}
              <div className="te-panel p-6">
                <h2 className="text-lg font-bold text-te-dark mb-6 uppercase tracking-wider flex items-center gap-2">
                  <Truck size={20} /> Shipping Method
                </h2>
                
                {hasFreeShipping ? (
                  <div className="p-4 bg-te-yellow/10 border border-te-yellow flex items-center gap-3">
                    <Check className="text-te-yellow" size={24} />
                    <div>
                      <p className="font-bold text-te-dark">Free Shipping</p>
                      <p className="text-sm text-te-grey">Your order qualifies for free shipping!</p>
                    </div>
                  </div>
                ) : shippingLoading ? (
                  <LoadingSpinner size="sm" text="Calculating shipping..." />
                ) : shippingRates.length > 0 ? (
                  <div className="space-y-3">
                    {shippingRates.map((rate) => (
                      <label
                        key={rate.serviceCode}
                        className={`flex items-center justify-between p-4 border cursor-pointer transition-colors ${
                          selectedShipping?.serviceCode === rate.serviceCode
                            ? 'border-te-yellow bg-te-yellow/5'
                            : 'border-te-grey/30 hover:border-te-grey'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="shipping"
                            checked={selectedShipping?.serviceCode === rate.serviceCode}
                            onChange={() => selectRate(rate)}
                            className="w-5 h-5 accent-te-yellow"
                          />
                          <div>
                            <p className="font-medium text-te-dark">{rate.serviceName}</p>
                            {rate.deliveryTime && (
                              <p className="text-sm text-te-grey">{rate.deliveryTime}</p>
                            )}
                          </div>
                        </div>
                        <span className="font-bold text-te-dark">{formatPrice(rate.price)}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-te-grey text-sm">
                    Enter your address above to see shipping options
                  </p>
                )}
              </div>
              
              {/* Order Notes */}
              <div className="te-panel p-6">
                <h2 className="text-lg font-bold text-te-dark mb-4 uppercase tracking-wider">
                  Order Notes (Optional)
                </h2>
                <textarea
                  name="customerNote"
                  value={formData.customerNote}
                  onChange={handleInputChange}
                  rows={3}
                  placeholder="Special delivery instructions, etc."
                  className="te-input w-full resize-none"
                />
              </div>
            </div>
            
            {/* Right Column - Order Summary */}
            <div className="lg:w-96">
              <div className="te-panel-dark p-6 sticky top-24">
                <h2 className="text-lg font-bold text-[var(--te-white)] mb-6 uppercase tracking-wider">
                  Order Summary
                </h2>
                
                {/* Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {items.map((item) => (
                    <div 
                      key={`${item.productId}-${item.variationId || 'default'}`}
                      className="flex justify-between items-start gap-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm text-[var(--te-white)]">
                          {item.name} <span className="text-[var(--te-yellow)]">x {item.quantity}</span>
                        </p>
                        {item.variation && Object.keys(item.variation).length > 0 && (
                          <p className="text-xs text-[var(--te-white)]/60 mt-0.5">
                            {Object.entries(item.variation).map(([key, value]) => `${value}`).join(', ')}
                          </p>
                        )}
                      </div>
                      <p className="text-sm text-[var(--te-white)] font-bold">
                        {formatPrice(((Number(item.salePrice ?? item.price ?? item.regularPrice) || 0) * item.quantity))}
                      </p>
                    </div>
                  ))}
                </div>
                
                {/* Totals */}
                <div className="space-y-3 border-t border-[var(--te-white)]/20 pt-4 mb-6">
                  <div className="flex justify-between text-[var(--te-white)]">
                    <span>Subtotal ({itemCount} items)</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between text-[var(--te-white)]">
                    <span>Shipping</span>
                    <span>
                      {hasFreeShipping 
                        ? 'FREE' 
                        : selectedShipping 
                          ? formatPrice(shippingCost) 
                          : '—'
                      }
                    </span>
                  </div>
                </div>
                
                <div className="border-t border-[var(--te-white)]/20 pt-4 mb-6">
                  <div className="flex justify-between text-xl font-bold text-[var(--te-white)]">
                    <span>Total</span>
                    <span>{formatPrice(orderTotal)}</span>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || loading}
                  className="te-button te-button-primary w-full flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting || loading ? (
                    <>
                      <LoadingSpinner size="sm" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={18} />
                      Pay {formatPrice(orderTotal)}
                    </>
                  )}
                </button>
                
                {/* Security Note */}
                <p className="text-xs text-[var(--te-white)]/50 text-center mt-4">
                  Your payment is secured by PayFast. We never store your card details.
                </p>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

