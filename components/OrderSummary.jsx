import { PlusIcon, SquarePenIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react'
import AddressModal from './AddressModal';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const OrderSummary = ({ totalPrice, items }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R';

    const router = useRouter();

    const addressList = useSelector(state => state.address.list);

    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [couponCodeInput, setCouponCodeInput] = useState('');
    const [coupon, setCoupon] = useState('');

    const handleCouponCode = async (event) => {
        event.preventDefault();
        
    }

    const handlePlaceOrder = async (e) => {
        e.preventDefault();

        router.push('/orders')
    }

    return (
        <div className='w-full max-w-lg lg:max-w-[340px] bg-[var(--te-cream)] border border-[var(--te-grey-200)] text-[var(--te-grey-400)] text-xs rounded-sm p-6'>
            {/* Header */}
            <h2 className='text-sm font-bold text-[var(--te-dark)] uppercase tracking-widest'>Payment Summary</h2>
            
            {/* Payment Method */}
            <p className='text-[var(--te-grey-400)] text-[10px] my-4 uppercase tracking-widest font-semibold'>Payment Method</p>
            <div className='flex gap-2 items-center'>
                <input type="radio" id="COD" onChange={() => setPaymentMethod('COD')} checked={paymentMethod === 'COD'} className='accent-[var(--te-yellow)] w-3 h-3' />
                <label htmlFor="COD" className='cursor-pointer text-[var(--te-dark)] font-medium tracking-wide'>COD</label>
            </div>
            <div className='flex gap-2 items-center mt-2'>
                <input type="radio" id="STRIPE" name='payment' onChange={() => setPaymentMethod('STRIPE')} checked={paymentMethod === 'STRIPE'} className='accent-[var(--te-yellow)] w-3 h-3' />
                <label htmlFor="STRIPE" className='cursor-pointer text-[var(--te-dark)] font-medium tracking-wide'>Stripe Payment</label>
            </div>
            
            {/* Address Section */}
            <div className='my-4 py-4 border-y border-[var(--te-grey-200)]'>
                <p className='text-[10px] uppercase tracking-widest font-semibold mb-2'>Address</p>
                {
                    selectedAddress ? (
                        <div className='flex gap-2 items-center text-[var(--te-dark)] font-medium'>
                            <p>{selectedAddress.name}, {selectedAddress.city}, {selectedAddress.state}, {selectedAddress.zip}</p>
                            <SquarePenIcon onClick={() => setSelectedAddress(null)} className='cursor-pointer text-[var(--te-yellow)] hover:text-[var(--te-dark)] transition-colors' size={14} />
                        </div>
                    ) : (
                        <div>
                            {
                                addressList.length > 0 && (
                                    <select className='border border-[var(--te-grey-200)] bg-[var(--te-white)] p-2 w-full my-2 outline-none rounded-sm text-[var(--te-dark)] font-medium' onChange={(e) => setSelectedAddress(addressList[e.target.value])} >
                                        <option value="">Select Address</option>
                                        {
                                            addressList.map((address, index) => (
                                                <option key={index} value={index}>{address.name}, {address.city}, {address.state}, {address.zip}</option>
                                            ))
                                        }
                                    </select>
                                )
                            }
                            <button className='flex items-center gap-1 text-[var(--te-yellow)] hover:text-[var(--te-dark)] mt-2 font-semibold tracking-wide transition-colors' onClick={() => setShowAddressModal(true)} >
                                Add Address <PlusIcon size={14} />
                            </button>
                        </div>
                    )
                }
            </div>
            
            {/* Pricing */}
            <div className='pb-4 border-b border-[var(--te-grey-200)]'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-1.5'>
                        <p className='text-[10px] uppercase tracking-widest font-semibold'>Subtotal:</p>
                        <p className='text-[10px] uppercase tracking-widest font-semibold'>Shipping:</p>
                        {coupon && <p className='text-[10px] uppercase tracking-widest font-semibold'>Coupon:</p>}
                    </div>
                    <div className='flex flex-col gap-1.5 font-bold text-[var(--te-dark)] text-right font-[family-name:var(--font-jetbrains)]'>
                        <p>{currency}{totalPrice.toLocaleString()}</p>
                        <p className='text-[var(--te-green)]'>Free</p>
                        {coupon && <p className='text-[var(--te-yellow)]'>{`-${currency}${(coupon.discount / 100 * totalPrice).toFixed(2)}`}</p>}
                    </div>
                </div>
                {
                    !coupon ? (
                        <form onSubmit={e => toast.promise(handleCouponCode(e), { loading: 'Checking Coupon...' })} className='flex justify-center gap-2 mt-4'>
                            <input 
                                onChange={(e) => setCouponCodeInput(e.target.value)} 
                                value={couponCodeInput} 
                                type="text" 
                                placeholder='COUPON CODE' 
                                className='border border-[var(--te-grey-200)] bg-[var(--te-white)] p-2 rounded-sm w-full outline-none text-[var(--te-dark)] placeholder-[var(--te-grey-300)] font-medium tracking-wide focus:border-[var(--te-yellow)]' 
                            />
                            <button 
                                className='bg-[var(--te-dark)] text-white px-4 rounded-sm hover:bg-[var(--te-grey-500)] active:scale-95 transition-all font-semibold tracking-wider uppercase text-[10px]'
                                style={{ boxShadow: '0 2px 0 rgba(0,0,0,0.3)' }}
                            >
                                Apply
                            </button>
                        </form>
                    ) : (
                        <div className='w-full flex items-center justify-center gap-2 text-[10px] mt-3 bg-[var(--te-white)] p-2 rounded-sm border border-[var(--te-grey-200)]'>
                            <p className='text-[var(--te-dark)]'>Code: <span className='font-bold font-[family-name:var(--font-jetbrains)]'>{coupon.code.toUpperCase()}</span></p>
                            <p className='text-[var(--te-grey-400)]'>{coupon.description}</p>
                            <XIcon size={14} onClick={() => setCoupon('')} className='hover:text-[var(--te-yellow)] transition cursor-pointer text-[var(--te-grey-400)]' />
                        </div>
                    )
                }
            </div>
            
            {/* Total */}
            <div className='flex justify-between py-4'>
                <p className='text-[10px] uppercase tracking-widest font-semibold'>Total:</p>
                <p className='font-bold text-[var(--te-dark)] text-lg font-[family-name:var(--font-jetbrains)]'>
                    {currency}{coupon ? (totalPrice - (coupon.discount / 100 * totalPrice)).toFixed(2) : totalPrice.toLocaleString()}
                </p>
            </div>
            
            {/* Place Order Button */}
            <button 
                onClick={e => toast.promise(handlePlaceOrder(e), { loading: 'Placing Order...' })} 
                className='w-full bg-[var(--te-yellow)] text-[var(--te-dark)] py-3.5 hover:bg-[var(--te-yellow-light)] active:scale-[0.98] transition-all font-bold tracking-widest uppercase text-xs'
                style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 20px rgba(248, 204, 40, 0.3)' }}
            >
                Place Order
            </button>

            {showAddressModal && <AddressModal setShowAddressModal={setShowAddressModal} />}

        </div>
    )
}

export default OrderSummary
