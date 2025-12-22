/**
 * Sam's Hardware Cart Page
 * 
 * Full cart page with item management and order summary.
 */

'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useShop } from '@/shop/core/ShopProvider';
import { formatPrice } from '@/shop/utils/helpers';
import { SHOP_CONFIG, SHOP_ROUTES, SHIPPING_CONFIG } from '@/shop/utils/constants';
import { LoadingSpinner } from '@/shop/ui/LoadingSpinner';

export default function CartPage() {
  const { cart } = useShop();
  const { items, total, itemCount, updateQuantity, removeItem, clearCart, initialized } = cart;
  
  if (!initialized) {
    return (
      <main className="min-h-screen bg-te-white">
        <section className="container mx-auto px-4 py-16">
          <LoadingSpinner size="md" text="Updating cart..." />
        </section>
      </main>
    );
  }
  
  // Calculate free shipping progress
  const freeShippingThreshold = SHIPPING_CONFIG.FREE_SHIPPING_THRESHOLD;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const freeShippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);
  const hasFreeShipping = remainingForFreeShipping === 0;
  
  // Empty cart state
  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-te-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-lg mx-auto text-center">
            <ShoppingBag className="mx-auto mb-6 text-te-grey" size={80} strokeWidth={1} />
            <h1 className="text-3xl font-bold text-te-dark mb-4">Your cart is empty</h1>
            <p className="text-te-grey mb-8">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link href={SHOP_ROUTES.SHOP}>
              <button className="te-button-primary">
                CONTINUE SHOPPING
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }
  
  return (
    <main className="min-h-screen bg-te-white">
      {/* Header */}
      <section className="bg-te-dark py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-te-white tracking-tight">
            SHOPPING CART
          </h1>
          <p className="text-te-white/70 mt-2">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
      </section>
      
      {/* Free Shipping Progress */}
      {!hasFreeShipping && (
        <section className="bg-te-yellow/10 py-4">
          <div className="container mx-auto px-4">
            <div className="space-y-2">
              <div className="h-2 bg-te-grey/20 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-te-yellow transition-all duration-500"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
              <p className="text-sm text-te-dark text-left">
                <span className="font-bold">{formatPrice(remainingForFreeShipping)}</span> away from free shipping!
              </p>
            </div>
          </div>
        </section>
      )}
      
      {hasFreeShipping && (
        <section className="bg-te-yellow py-3">
          <div className="container mx-auto px-4">
            <p className="text-sm font-bold text-te-dark text-left">
              🎉 You've unlocked FREE SHIPPING!
            </p>
          </div>
        </section>
      )}
      
      {/* Cart Content */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            {/* Table Header */}
            <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-te-grey/20 text-sm font-bold uppercase tracking-wider text-te-grey">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>
            
            {/* Items */}
            <div className="divide-y divide-te-grey/20">
              {items.map((item) => {
                const price = item.salePrice ?? item.price ?? item.regularPrice;
                const lineTotal = price * item.quantity;
                
                return (
                  <div 
                    key={`${item.productId}-${item.variationId || 'default'}`}
                    className="py-6 grid grid-cols-12 gap-4 items-center"
                  >
                    {/* Product Info */}
                    <div className="col-span-12 md:col-span-6 flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 bg-te-grey/10">
                        <Image
                          src={item.image || SHOP_CONFIG.PLACEHOLDER_IMAGE}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </div>
                      <div className="flex flex-col justify-center">
                        <Link 
                          href={`${SHOP_ROUTES.PRODUCT}/${item.productId}`}
                          className="font-medium text-te-dark hover:text-te-dark/80 transition-colors"
                        >
                          {item.name}
                        </Link>
                        {item.variation && Object.keys(item.variation).length > 0 && (
                          <p className="text-sm text-te-grey mt-1">
                            {Object.entries(item.variation).map(([key, value]) => (
                              <span key={key} className="mr-3">{key}: {value}</span>
                            ))}
                          </p>
                        )}
                        <button
                          onClick={() => removeItem(item.productId, item.variationId)}
                          className="mt-2 text-sm text-te-grey hover:text-te-dark transition-colors flex items-center gap-1 md:hidden"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </div>
                    </div>
                    
                    {/* Price */}
                    <div className="col-span-4 md:col-span-2 text-center">
                      <span className="md:hidden text-xs text-te-grey block mb-1">Price</span>
                      <span className="text-te-dark">{formatPrice(price)}</span>
                      {item.salePrice && item.salePrice < item.regularPrice && (
                        <span className="block text-sm text-te-grey line-through">
                          {formatPrice(item.regularPrice)}
                        </span>
                      )}
                    </div>
                    
                    {/* Quantity */}
                    <div className="col-span-4 md:col-span-2 flex justify-center">
                      <div className="flex items-center border border-te-grey/30">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1, item.variationId)}
                          className="h-10 w-10 flex items-center justify-center text-te-dark hover:bg-te-grey/10 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-12 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1, item.variationId)}
                          disabled={item.soldIndividually}
                          className="h-10 w-10 flex items-center justify-center text-te-dark hover:bg-te-grey/10 transition-colors disabled:opacity-50"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Total */}
                    <div className="col-span-4 md:col-span-2 text-right">
                      <span className="md:hidden text-xs text-te-grey block mb-1">Total</span>
                      <span className="font-bold text-te-dark">{formatPrice(lineTotal)}</span>
                      <button
                        onClick={() => removeItem(item.productId, item.variationId)}
                        className="hidden md:inline-block ml-4 text-te-grey hover:text-te-dark transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
            
            {/* Cart Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <Link href={SHOP_ROUTES.SHOP}>
                <button className="te-button flex items-center gap-2">
                  <ArrowLeft size={18} /> Continue Shopping
                </button>
              </Link>
              
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to clear your cart?')) {
                    clearCart();
                  }
                }}
                className="te-button te-button-ghost text-te-grey hover:text-te-dark"
              >
                Clear Cart
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-96">
            <div className="te-panel-dark p-6 sticky top-24">
              <h2 className="text-lg font-bold text-te-white mb-6 uppercase tracking-wider">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-[var(--te-white)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-[var(--te-white)]">
                  <span>Shipping</span>
                  <span>{hasFreeShipping ? 'FREE' : 'Calculated at checkout'}</span>
                </div>
              </div>
              
              <div className="border-t border-[var(--te-white)]/20 pt-4 mb-6">
                <div className="flex justify-between text-xl font-bold text-[var(--te-white)]">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <p className="text-xs text-[var(--te-white)]/70 mt-2">
                  Tax included where applicable
                </p>
              </div>
              
              <Link href={SHOP_ROUTES.CHECKOUT}>
                <button className="te-button te-button-primary w-full flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </Link>
              
              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-[var(--te-white)]/20">
                <p className="text-xs text-[var(--te-white)]/50 text-center mb-3">
                  Secure checkout powered by PayFast
                </p>
                <div className="flex justify-center gap-2">
                  <span className="px-2 py-1 bg-[var(--te-white)]/10 text-xs text-[var(--te-white)]/70">VISA</span>
                  <span className="px-2 py-1 bg-[var(--te-white)]/10 text-xs text-[var(--te-white)]/70">MASTERCARD</span>
                  <span className="px-2 py-1 bg-[var(--te-white)]/10 text-xs text-[var(--te-white)]/70">EFT</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

