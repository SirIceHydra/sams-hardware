/**
 * Sam's Hardware Orders Service
 * 
 * Handles order creation and management through the WordPress backend.
 */

import { createOrder as wooCreateOrder, validateStock } from './woocommerce';
import type { CartItem } from '../shop/core/ports';

export interface CheckoutData {
  billing: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping?: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shippingMethod?: {
    methodId: string;
    methodTitle: string;
    total: number;
  };
  customerNote?: string;
  useSameAddress?: boolean;
}

export interface OrderResult {
  success: boolean;
  orderId?: number;
  orderNumber?: string;
  error?: string;
  stockErrors?: Array<{
    productId: number;
    name?: string;
    error: string;
    available?: number;
    requested?: number;
  }>;
}

/**
 * Validate cart items stock before checkout
 */
export async function validateCartStock(cartItems: CartItem[]): Promise<{
  valid: boolean;
  errors: Array<{
    productId: number;
    name?: string;
    error: string;
    available?: number;
    requested?: number;
  }>;
}> {
  try {
    const items = cartItems.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      variationId: item.variationId,
    }));
    
    const result = await validateStock(items);
    
    return {
      valid: result.success,
      errors: result.errors,
    };
  } catch (error: any) {
    console.error('Stock validation error:', error);
    return {
      valid: false,
      errors: [{
        productId: 0,
        error: 'Failed to validate stock. Please try again.',
      }],
    };
  }
}

/**
 * Create an order from cart items and checkout data
 */
export async function createOrder(
  cartItems: CartItem[],
  checkoutData: CheckoutData
): Promise<OrderResult> {
  try {
    // First validate stock
    const stockValidation = await validateCartStock(cartItems);
    
    if (!stockValidation.valid) {
      return {
        success: false,
        error: 'Some items in your cart are no longer available',
        stockErrors: stockValidation.errors,
      };
    }
    
    // Prepare shipping address
    const shippingAddress = checkoutData.useSameAddress 
      ? {
          firstName: checkoutData.billing.firstName,
          lastName: checkoutData.billing.lastName,
          address: checkoutData.billing.address,
          city: checkoutData.billing.city,
          state: checkoutData.billing.state,
          postcode: checkoutData.billing.postcode,
          country: checkoutData.billing.country,
        }
      : checkoutData.shipping;
    
    // Create the order
    const result = await wooCreateOrder({
      lineItems: cartItems.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        variationId: item.variationId,
        variation: item.variation,
      })),
      billing: checkoutData.billing,
      shipping: shippingAddress,
      shippingMethod: checkoutData.shippingMethod,
      customerNote: checkoutData.customerNote,
    });
    
    return result;
  } catch (error: any) {
    console.error('Order creation error:', error);
    return {
      success: false,
      error: error.message || 'Failed to create order. Please try again.',
    };
  }
}

/**
 * Calculate order total including shipping
 */
export function calculateOrderTotal(
  cartItems: CartItem[],
  shippingCost: number = 0
): {
  subtotal: number;
  shipping: number;
  total: number;
} {
  const subtotal = cartItems.reduce((total, item) => {
    const price = Number(item.salePrice ?? item.price ?? item.regularPrice) || 0;
    return total + (price * item.quantity);
  }, 0);
  
  return {
    subtotal,
    shipping: shippingCost,
    total: subtotal + shippingCost,
  };
}

/**
 * Format cart items for display/order summary
 */
export function formatCartItemsForOrder(cartItems: CartItem[]): string {
  return cartItems.map(item => {
    let name = item.name;
    if (item.variation && Object.keys(item.variation).length > 0) {
      const variationStr = Object.entries(item.variation)
        .map(([key, value]) => `${key}: ${value}`)
        .join(', ');
      name += ` (${variationStr})`;
    }
    return `${item.quantity}x ${name}`;
  }).join(', ');
}

