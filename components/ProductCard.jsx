'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { Eye, ShoppingCart, Zap, Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useShop } from '@/shop/core/ShopProvider'
import toast from 'react-hot-toast'

const ProductCard = ({ product }) => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'
    const cardRef = useRef(null)
    const imageRef = useRef(null)
    const overlayRef = useRef(null)
    const actionsRef = useRef(null)
    const router = useRouter()
    const { cart } = useShop()
    const { addItem } = cart

    // calculate the average rating of the product
    const rating = product.rating && product.rating.length > 0
        ? Math.round(product.rating.reduce((acc, curr) => acc + curr.rating, 0) / product.rating.length)
        : 0;

    // Calculate discount percentage
    const discountPercent = product.mrp && product.price < product.mrp
        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
        : 0;

    const inStock = product.inStock !== false;
    const hasVariations = product.type === 'variable' || product.hasVariations || (product.variations && product.variations.length > 0);

    const handleMouseEnter = () => {
        if (window.innerWidth < 768) return // Mobile optimization
        if (!cardRef.current) return
        
        gsap.to(cardRef.current, {
            y: -12,
            duration: 0.3,
            ease: 'power2.out'
        })
        
        gsap.to(imageRef.current, {
            scale: 1.08,
            duration: 0.4,
            ease: 'power2.out'
        })
        
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.3
        })
        
        gsap.fromTo(actionsRef.current?.children,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
        )
    }

    const handleMouseLeave = () => {
        if (!cardRef.current) return
        
        gsap.to(cardRef.current, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        })
        
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.4,
            ease: 'power2.out'
        })
        
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.3
        })
        
        gsap.to(actionsRef.current?.children, {
            y: 20,
            opacity: 0,
            duration: 0.2
        })
    }

    const handleAction = (e) => {
        e.preventDefault()
        
        if (!inStock) return;

        if (hasVariations) {
            router.push(`/product/${product.id}`)
            return
        }

        addItem(product, 1)
        toast.success(`Added ${product.name} to cart`)
    }

    return (
        <div 
            ref={cardRef}
            className='max-xl:mx-auto w-full'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Link href={`/product/${product.id}`} className='block group'>
                {/* Product image container */}
                <div className='relative bg-[var(--te-bone)] h-44 sm:h-56 lg:h-64 w-full overflow-hidden border-2 border-[var(--te-grey-200)] group-hover:border-[var(--te-yellow)] transition-colors duration-300'>
                    {/* Yellow accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--te-yellow)] via-[var(--te-yellow)] to-transparent z-20" />
                    
                    {/* Corner brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors z-10" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors z-10" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors z-10" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors z-10" />
                    
                    {/* Discount badge */}
                    {discountPercent > 0 && (
                        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 px-2 py-1 bg-[var(--te-yellow)] text-[var(--te-dark)]">
                            <Zap size={10} />
                            <span className="text-[10px] font-bold font-[family-name:var(--font-jetbrains)]">-{discountPercent}%</span>
                        </div>
                    )}
                    
                    {/* Stock indicator LED */}
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${product.inStock !== false ? 'bg-[var(--te-green)] shadow-[0_0_8px_rgba(0,200,83,0.6)]' : 'bg-[var(--te-red)]'}`} />
                        <span className="text-[8px] font-bold text-[var(--te-grey-400)] tracking-widest uppercase">
                            {product.inStock !== false ? 'IN STOCK' : 'OUT'}
                        </span>
                    </div>
                    
                    {/* Product image */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                        {product.images && product.images.length > 0 && (
                            <Image 
                                ref={imageRef}
                                width={500} 
                                height={500} 
                                className='max-h-32 sm:max-h-40 lg:max-h-48 w-auto object-contain' 
                                src={product.images[0]} 
                                alt={product.name} 
                            />
                        )}
                    </div>
                    
                    {/* Hover overlay with actions */}
                    <div 
                        ref={overlayRef}
                        className="absolute inset-0 bg-[var(--te-dark)]/80 flex items-center justify-center opacity-0 z-30"
                    >
                        <div ref={actionsRef} className="flex gap-3">
                            <button 
                                onClick={(e) => { e.preventDefault(); router.push(`/product/${product.id}`) }}
                                className="flex items-center justify-center w-12 h-12 bg-[var(--te-yellow)] text-[var(--te-dark)] hover:bg-[var(--te-yellow-light)] transition-colors"
                            >
                                <Eye size={20} />
                            </button>
                            <button 
                                disabled={!inStock}
                                onClick={handleAction}
                                className={`flex items-center justify-center w-12 h-12 bg-[var(--te-white)] text-[var(--te-dark)] transition-colors ${inStock ? 'hover:bg-[var(--te-bone)]' : 'opacity-50 cursor-not-allowed'}`}
                                title={hasVariations ? "Select Options" : "Add to Cart"}
                            >
                                {hasVariations ? <Settings size={20} /> : <ShoppingCart size={20} />}
                            </button>
                        </div>
                    </div>
                    
                    {/* Grid texture overlay */}
                    <div 
                        className="absolute inset-0 opacity-[0.02] pointer-events-none"
                        style={{
                            backgroundImage: `
                                linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                                linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px'
                        }}
                    />
                </div>
                
                {/* Product info */}
                <div className='pt-4 px-1'>
                    {/* Category tag */}
                    {product.category && (
                        <span className="text-[9px] font-bold text-[var(--te-yellow)] tracking-[0.2em] uppercase">
                            {product.category}
                        </span>
                    )}
                    
                    {/* Product name */}
                    <h3 className='text-sm sm:text-base font-bold text-[var(--te-dark)] uppercase tracking-wide mt-1 truncate group-hover:text-[var(--te-yellow)] transition-colors'>
                        {product.name}
                    </h3>
                    
                    {/* Rating indicators - LED style dots */}
                    <div className='flex items-center gap-3 mt-2'>
                        <div className='flex gap-1'>
                            {Array(5).fill('').map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`w-2 h-2 rounded-full transition-all ${
                                        rating >= index + 1 
                                            ? 'bg-[var(--te-yellow)] shadow-[0_0_6px_var(--te-yellow-glow)]' 
                                            : 'bg-[var(--te-grey-200)]'
                                    }`}
                                />
                            ))}
                        </div>
                        {product.rating && product.rating.length > 0 && (
                            <span className="text-[10px] text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">
                                ({product.rating.length})
                            </span>
                        )}
                    </div>
                    
                    {/* Price section */}
                    <div className='flex items-end justify-between mt-3 pt-3 border-t border-[var(--te-grey-200)]'>
                        <div className="flex flex-col">
                            {product.mrp && product.mrp > product.price && (
                                <span className='text-xs text-[var(--te-grey-400)] line-through font-[family-name:var(--font-jetbrains)] mb-0.5'>
                                    {currency}{product.mrp?.toLocaleString()}
                                </span>
                            )}
                            <span className='text-lg sm:text-xl font-black text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)] leading-none'>
                                {currency}{product.price?.toLocaleString()}
                            </span>
                        </div>
                        
                        {/* Quick add button */}
                        <button 
                            disabled={!inStock}
                            className={`flex items-center justify-center w-8 h-8 bg-[var(--te-dark)] text-[var(--te-white)] transition-all ${inStock ? 'hover:bg-[var(--te-yellow)] hover:text-[var(--te-dark)]' : 'opacity-50 cursor-not-allowed'}`}
                            onClick={handleAction}
                            title={hasVariations ? "Select Options" : "Add to Cart"}
                        >
                            {hasVariations ? <Settings size={14} /> : <ShoppingCart size={14} />}
                        </button>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default ProductCard
