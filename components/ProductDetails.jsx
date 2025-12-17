'use client'

import { addToCart } from "@/lib/features/cart/cartSlice";
import { TagIcon, EarthIcon, CreditCardIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useDispatch, useSelector } from "react-redux";

const ProductDetails = ({ product }) => {

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R';

    const cart = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();

    const router = useRouter()

    const [mainImage, setMainImage] = useState(product.images[0]);

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const averageRating = product.rating.reduce((acc, item) => acc + item.rating, 0) / product.rating.length;
    
    return (
        <div className="flex max-lg:flex-col gap-8 lg:gap-12 py-6">
            {/* Images */}
            <div className="flex max-sm:flex-col-reverse gap-3">
                {/* Thumbnails */}
                <div className="flex sm:flex-col gap-2">
                    {product.images.map((image, index) => (
                        <div 
                            key={index} 
                            onClick={() => setMainImage(product.images[index])} 
                            className={`bg-[var(--te-cream)] flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-sm group cursor-pointer border-2 transition-all ${mainImage === image ? 'border-[var(--te-yellow)]' : 'border-[var(--te-grey-200)] hover:border-[var(--te-grey-300)]'}`}
                        >
                            <Image src={image} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-105 transition" alt="" width={45} height={45} />
                        </div>
                    ))}
                </div>
                
                {/* Main Image */}
                <div className="flex justify-center items-center h-80 sm:h-[400px] w-full sm:w-[400px] bg-[var(--te-cream)] rounded-sm border border-[var(--te-grey-200)] relative">
                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[var(--te-grey-300)]" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[var(--te-grey-300)]" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[var(--te-grey-300)]" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[var(--te-grey-300)]" />
                    <Image src={mainImage} alt="" width={250} height={250} className="max-w-[80%] max-h-[80%] object-contain" />
                </div>
            </div>
            
            {/* Details */}
            <div className="flex-1">
                {/* Category label */}
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--te-yellow)]" style={{ boxShadow: '0 0 6px var(--te-yellow-glow)' }} />
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">{product.category}</span>
                </div>
                
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">{product.name}</h1>
                
                {/* Rating - LED style dots */}
                <div className='flex items-center gap-3 mt-3'>
                    <div className="flex gap-1">
                        {Array(5).fill('').map((_, index) => (
                            <div 
                                key={index} 
                                className={`w-2 h-2 rounded-full ${averageRating >= index + 1 ? 'bg-[var(--te-green)]' : 'bg-[var(--te-grey-200)]'}`}
                                style={averageRating >= index + 1 ? { boxShadow: '0 0 4px var(--te-green)' } : {}}
                            />
                        ))}
                    </div>
                    <span className="text-[10px] text-[var(--te-grey-400)] font-medium tracking-widest uppercase">{product.rating.length} Reviews</span>
                </div>
                
                {/* Price */}
                <div className="flex items-baseline gap-3 my-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-[var(--te-grey-400)] font-medium tracking-widest uppercase">Price</span>
                        <span className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{currency}{product.price}</span>
                    </div>
                    <span className="text-lg text-[var(--te-grey-300)] line-through font-[family-name:var(--font-jetbrains)]">{currency}{product.mrp}</span>
                </div>
                
                {/* Savings badge */}
                <div className="inline-flex items-center gap-2 bg-[var(--te-yellow)]/10 border border-[var(--te-yellow)]/30 rounded-sm px-3 py-1.5 text-[var(--te-dark)]">
                    <TagIcon size={12} className="text-[var(--te-yellow)]" />
                    <span className="text-xs font-semibold tracking-wide">Save {((product.mrp - product.price) / product.mrp * 100).toFixed(0)}% right now</span>
                </div>
                
                {/* Add to Cart section */}
                <div className="flex items-end gap-4 mt-8">
                    {
                        cart[productId] && (
                            <div className="flex flex-col gap-2">
                                <span className="text-[10px] text-[var(--te-grey-400)] font-semibold tracking-widest uppercase">Quantity</span>
                                <Counter productId={productId} />
                            </div>
                        )
                    }
                    <button 
                        onClick={() => !cart[productId] ? addToCartHandler() : router.push('/cart')} 
                        className="bg-[var(--te-yellow)] text-[var(--te-dark)] px-8 sm:px-10 py-3.5 text-xs font-bold hover:bg-[var(--te-yellow-light)] active:scale-[0.98] transition-all tracking-widest uppercase"
                        style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 20px rgba(248, 204, 40, 0.3)' }}
                    >
                        {!cart[productId] ? 'Add to Cart' : 'View Cart'}
                    </button>
                </div>
                
                {/* Divider */}
                <hr className="border-[var(--te-grey-200)] my-6" />
                
                {/* Features */}
                <div className="flex flex-col gap-3 text-xs text-[var(--te-grey-400)]">
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <EarthIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">Free shipping worldwide</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <CreditCardIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">100% Secured Payment</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <UserIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">Trusted by top brands</span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails
