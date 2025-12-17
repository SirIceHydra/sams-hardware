'use client'
import React, { useRef, useEffect } from 'react'
import Title from './Title'
import ProductCard from './ProductCard'
import { useSelector } from 'react-redux'
import { Clock, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const LatestProducts = () => {
    const displayQuantity = 4
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
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.5,
                stagger: 0.1,
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
            {/* Diagonal stripes background */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 30px,
                        var(--te-grey-400) 30px,
                        var(--te-grey-400) 31px
                    )`
                }}
            />
            
            {/* Yellow accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            <div className='px-4 sm:px-6 max-w-7xl mx-auto relative z-10'>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-[var(--te-dark)] flex items-center justify-center flex-shrink-0">
                            <Clock className="text-[var(--te-yellow)]" size={24} />
                        </div>
                        <div>
                            <Title title='Latest Products' visibleButton={false} />
                            <p className="text-sm text-[var(--te-grey-400)] mt-2">
                                Showing {products.length < displayQuantity ? products.length : displayQuantity} of {products.length} products
                            </p>
                        </div>
                    </div>
                    
                    <Link 
                        href="/shop"
                        className="group flex items-center gap-2 px-6 py-3 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-xs tracking-widest uppercase hover:bg-[var(--te-yellow-light)] transition-all"
                        style={{ boxShadow: '0 3px 0 var(--te-yellow-dark)' }}
                    >
                        View All
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                {/* Products grid */}
                <div ref={productsRef} className='grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-8'>
                    {products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, displayQuantity).map((product, index) => (
                        <div key={index} className="product-card-wrapper">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default LatestProducts
