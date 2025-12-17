'use client'
import React, { useRef, useState, useCallback, useEffect } from 'react'
import dynamic from 'next/dynamic'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Zap, Sparkles } from 'lucide-react'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

// Dynamically import Scene component with SSR disabled
const Scene = dynamic(() => import('./Scene'), {
    ssr: false,
    loading: () => <div className="absolute inset-0 z-0 bg-[var(--te-bone)]" />
})

const HeroCard = () => {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'
    const containerRef = useRef(null)
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const contentRef = useRef(null)
    const [isHovered, setIsHovered] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)
    const [showHammer, setShowHammer] = useState(false)
    const [hasTriggeredOnScroll, setHasTriggeredOnScroll] = useState(false)
    const [hasTriggeredOnHover, setHasTriggeredOnHover] = useState(false)
    const [hasCompletedAnimation, setHasCompletedAnimation] = useState(false)

    const triggerHammerAnimation = useCallback(() => {
        if (hasCompletedAnimation) return
        if (showHammer) return
        setShowHammer(true)
    }, [showHammer, hasCompletedAnimation])

    const handleHammerReturnToZero = useCallback(() => {
        setIterationCount(prev => {
            const newCount = prev + 1

            if (newCount <= 2 && titleRef.current) {
                gsap.to(titleRef.current, {
                    x: -20,
                    duration: 0.08,
                    ease: 'power2.out',
                    onComplete: () => {
                        gsap.to(titleRef.current, {
                            x: 0,
                            duration: 0.3,
                            ease: 'elastic.out(1, 0.3)'
                        })
                    }
                })
            }

            if (newCount >= 2) {
                setShowHammer(false)
                setHasCompletedAnimation(true)
            }

            return newCount
        })
    }, [])

    // Scroll reveal animation (desktop only)
    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return
        
        if (!contentRef.current) return
        
        gsap.fromTo(contentRef.current.children,
            { y: 40, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    useEffect(() => {
        if (!containerRef.current || hasTriggeredOnScroll || hasTriggeredOnHover || hasCompletedAnimation) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasTriggeredOnScroll && !hasTriggeredOnHover && !hasCompletedAnimation) {
                        setHasTriggeredOnScroll(true)
                        triggerHammerAnimation()
                    }
                })
            },
            { threshold: 0.3, rootMargin: '0px' }
        )

        observer.observe(containerRef.current)

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current)
            }
        }
    }, [hasTriggeredOnScroll, hasTriggeredOnHover, hasCompletedAnimation, triggerHammerAnimation])

    const handleMouseEnter = useCallback(() => {
        setIsHovered(true)

        if (!hasTriggeredOnHover && !hasTriggeredOnScroll && !hasCompletedAnimation) {
            setHasTriggeredOnHover(true)
            triggerHammerAnimation()
        }
    }, [hasTriggeredOnHover, hasTriggeredOnScroll, hasCompletedAnimation, triggerHammerAnimation])

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false)
    }, [])

    return (
        <div ref={containerRef} className='bg-[var(--te-dark)] py-12 sm:py-20 relative overflow-hidden'>
            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--te-grey-500) 1px, transparent 1px),
                        linear-gradient(90deg, var(--te-grey-500) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            
            {/* Yellow accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            {/* Floating accent elements */}
            <div className="absolute top-20 right-20 w-40 h-40 border-2 border-[var(--te-yellow)]/10 rotate-45 te-float pointer-events-none" />
            <div className="absolute bottom-10 left-10 w-24 h-24 bg-[var(--te-yellow)]/5 rotate-12 te-float pointer-events-none" style={{ animationDelay: '1s' }} />
            
            <div className='mx-4 sm:mx-6 relative z-10'>
                <div className='max-w-7xl mx-auto'>
                    <div
                        ref={heroRef}
                        className='relative w-full flex flex-col bg-[var(--te-charcoal)] xl:min-h-[450px] group overflow-hidden border border-[var(--te-grey-500)]'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {/* Yellow accent bar at top */}
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-[var(--te-yellow)] z-20" />
                        
                        {/* Corner brackets */}
                        <div className="absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-[var(--te-yellow)] z-20" />
                        <div className="absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-[var(--te-yellow)] z-20" />
                        <div className="absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-[var(--te-yellow)] z-20" />
                        <div className="absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-[var(--te-yellow)] z-20" />
                        
                        {/* 3D Scene Background - MORE VISIBLE */}
                        <div className='absolute inset-0 z-0 left-0 sm:left-1/4 opacity-90'>
                            <Scene isHovered={isHovered} onHammerReturnToZero={handleHammerReturnToZero} showHammer={showHammer} />
                        </div>

                        {/* Gradient overlay - REDUCED for better tool visibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[var(--te-dark)] via-[var(--te-dark)]/70 to-transparent z-5" />

                        {/* Content */}
                        <div ref={contentRef} className='relative z-10 p-8 sm:p-16 lg:p-20 h-full flex flex-col justify-center'>
                            {/* Product label */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-[var(--te-yellow)] text-[var(--te-dark)]">
                                    <Sparkles size={12} />
                                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase">Featured Collection</span>
                                </div>
                            </div>
                            
                            {/* Title */}
                            <h2 ref={titleRef} className='text-2xl sm:text-4xl lg:text-5xl xl:text-6xl leading-[0.95] font-black text-[var(--te-white)] max-w-lg uppercase tracking-tight'>
                                Build Bold.
                                <span className='block text-[var(--te-yellow)] mt-2'>
                                    Tools for the Future.
                                </span>
                            </h2>
                            
                            {/* Price section */}
                            <div className='mt-8 sm:mt-10'>
                                <span className="text-[var(--te-grey-400)] text-xs font-medium tracking-widest uppercase block mb-2">
                                    Professional tools from
                                </span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-lg text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">{currency}</span>
                                    <span className='text-5xl sm:text-6xl font-black text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]'>
                                        19.99
                                    </span>
                                </div>
                            </div>
                            
                            {/* CTA Buttons */}
                            <div className="flex flex-wrap gap-4 mt-8 sm:mt-10">
                                <Link
                                    href="/shop"
                                    className='group/btn flex items-center gap-3 px-8 py-4 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-sm tracking-widest uppercase hover:bg-[var(--te-yellow-light)] active:translate-y-1 transition-all'
                                    style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 20px rgba(248, 204, 40, 0.3)' }}
                                >
                                    <Zap size={18} />
                                    Shop Now
                                    <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                                </Link>
                                <Link
                                    href="/about"
                                    className='flex items-center gap-3 px-8 py-4 bg-transparent text-[var(--te-white)] font-bold text-sm tracking-widest uppercase border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] hover:text-[var(--te-yellow)] transition-all'
                                >
                                    Learn More
                                </Link>
                            </div>
                        </div>
                        
                        {/* Decorative elements */}
                        <div className="absolute bottom-8 right-8 sm:right-16 z-20 hidden lg:flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[var(--te-green)] shadow-[0_0_8px_rgba(0,200,83,0.6)] animate-pulse" />
                            <span className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase font-[family-name:var(--font-jetbrains)]">
                                Online Store
                            </span>
                        </div>
                        
                        {/* Grid overlay on dark background */}
                        <div 
                            className="absolute inset-0 opacity-[0.02] pointer-events-none"
                            style={{
                                backgroundImage: `
                                    linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                                    linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                                `,
                                backgroundSize: '40px 40px'
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroCard
