'use client'
import React, { useRef, useEffect } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { TrendingUp, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const BestSelling = () => {
    const displayQuantity = 8
    const products = useSelector(state => state.product.list)
    const sectionRef = useRef(null)
    const productsRef = useRef(null)

    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return
        
        if (!productsRef.current) return
        
        const cards = productsRef.current.querySelectorAll('.product-card-wrapper')
        
        gsap.fromTo(cards,
            { y: 50, opacity: 0, scale: 0.95 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.5,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: productsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [products])

    return (
        <div ref={sectionRef} className='bg-[var(--te-cream)] py-16 sm:py-24 relative overflow-hidden'>
            {/* Dot pattern background */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(var(--te-grey-400) 1.5px, transparent 1.5px)`,
                    backgroundSize: '30px 30px'
                }}
            />
            
            {/* Yellow accent strip on right */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            <div className='px-4 sm:px-6 max-w-7xl mx-auto relative z-10'>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-[var(--te-yellow)] flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="text-[var(--te-dark)]" size={24} />
                        </div>
                        <div>
                            <Title title='Best Selling' visibleButton={false} />
                            <p className="text-sm text-[var(--te-grey-400)] mt-2">
                                Top-rated products loved by our customers
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        href="/shop"
                        className="group flex items-center gap-2 px-6 py-3 bg-[var(--te-dark)] text-[var(--te-white)] font-bold text-xs tracking-widest uppercase hover:bg-[var(--te-charcoal)] transition-all"
                        style={{ boxShadow: '0 3px 0 var(--te-black)' }}
                    >
                        Shop All
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                {/* Products grid */}
                <div ref={productsRef} className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-8'>
                    {products.slice().sort((a, b) => b.rating.length - a.rating.length).slice(0, displayQuantity).map((product, index) => (
                        <div key={index} className="product-card-wrapper">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default BestSelling
