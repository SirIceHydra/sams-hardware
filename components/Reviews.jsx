'use client'
import React, { useRef, useEffect } from 'react'
import { Star, Quote } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Reviews = () => {
    const sectionRef = useRef(null)
    const reviewsRef = useRef(null)

    const reviews = [
        {
            name: 'Michael Johnson',
            role: 'Professional Contractor',
            rating: 5,
            text: 'Excellent quality tools at competitive prices. The DeWalt power drill I purchased has been running strong for over 2 years now. Highly recommend!',
            avatar: 'M'
        },
        {
            name: 'Sarah Williams',
            role: 'DIY Enthusiast',
            rating: 5,
            text: 'Fast shipping and the customer service is top-notch. Had a question about my order and they responded within an hour. Will definitely shop here again.',
            avatar: 'S'
        },
        {
            name: 'David Chen',
            role: 'Home Renovator',
            rating: 5,
            text: 'The selection of hand tools is impressive. Found everything I needed for my bathroom renovation project. Great value for money.',
            avatar: 'D'
        },
        {
            name: 'Emily Rodriguez',
            role: 'Interior Designer',
            rating: 4,
            text: 'Love the lighting options available. The LED fixtures I ordered were exactly as described and really transformed my client\'s space.',
            avatar: 'E'
        }
    ]

    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return
        
        if (!reviewsRef.current) return
        
        const cards = reviewsRef.current.querySelectorAll('.review-card')
        
        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: reviewsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section ref={sectionRef} className="py-16 sm:py-24 bg-[var(--te-cream)] overflow-hidden relative">
            {/* Grid background */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                        linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            
            {/* Yellow accent line at top */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="w-8 h-[2px] bg-[var(--te-yellow)]" />
                        <span className="text-[var(--te-yellow)] text-xs font-bold tracking-[0.3em] uppercase">
                            Testimonials
                        </span>
                        <span className="w-8 h-[2px] bg-[var(--te-yellow)]" />
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--te-dark)] uppercase tracking-tight">
                        What Our <span className="text-[var(--te-yellow)]">Customers</span> Say
                    </h2>
                    <p className="mt-4 text-[var(--te-grey-400)] max-w-xl mx-auto text-sm sm:text-base">
                        Don't just take our word for it. Here's what our valued customers have to say about their experience.
                    </p>
                </div>

                {/* Reviews Grid */}
                <div ref={reviewsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reviews.map((review, index) => (
                        <div
                            key={index}
                            className="review-card group relative bg-[var(--te-white)] p-6 border border-[var(--te-grey-200)] hover:border-[var(--te-yellow)] transition-all duration-300"
                        >
                            {/* Quote icon */}
                            <Quote size={32} className="absolute top-4 right-4 text-[var(--te-yellow)]/20 group-hover:text-[var(--te-yellow)]/40 transition-colors" />
                            
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            
                            {/* Rating */}
                            <div className="flex gap-1 mb-4">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < review.rating ? 'text-[var(--te-yellow)] fill-[var(--te-yellow)]' : 'text-[var(--te-grey-300)]'}
                                    />
                                ))}
                            </div>
                            
                            {/* Review text */}
                            <p className="text-sm text-[var(--te-dark)] leading-relaxed mb-6">
                                "{review.text}"
                            </p>
                            
                            {/* Reviewer info */}
                            <div className="flex items-center gap-3 mt-auto">
                                <div className="w-10 h-10 bg-[var(--te-yellow)] flex items-center justify-center text-[var(--te-dark)] font-bold text-sm">
                                    {review.avatar}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[var(--te-dark)] uppercase tracking-wide">
                                        {review.name}
                                    </p>
                                    <p className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase">
                                        {review.role}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Corner bracket */}
                            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[var(--te-grey-200)] group-hover:border-[var(--te-yellow)] transition-colors" />
                        </div>
                    ))}
                </div>
                
                {/* Trust indicators */}
                <div className="mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} size={18} className="text-[var(--te-yellow)] fill-[var(--te-yellow)]" />
                            ))}
                        </div>
                        <span className="text-[var(--te-dark)] font-bold text-2xl font-[family-name:var(--font-jetbrains)]">4.9</span>
                        <span className="text-[var(--te-grey-400)] text-sm">/5 average</span>
                    </div>
                    <div className="h-8 w-px bg-[var(--te-grey-200)] hidden sm:block" />
                    <div className="text-center">
                        <span className="text-[var(--te-yellow)] font-black text-2xl font-[family-name:var(--font-jetbrains)]">2,500+</span>
                        <span className="text-[var(--te-grey-400)] text-sm ml-2">Happy Customers</span>
                    </div>
                    <div className="h-8 w-px bg-[var(--te-grey-200)] hidden sm:block" />
                    <div className="text-center">
                        <span className="text-[var(--te-yellow)] font-black text-2xl font-[family-name:var(--font-jetbrains)]">98%</span>
                        <span className="text-[var(--te-grey-400)] text-sm ml-2">Satisfaction Rate</span>
                    </div>
                </div>
            </div>
            
            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--te-grey-200)]/30" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--te-grey-200)]/30" />
        </section>
    )
}

export default Reviews

