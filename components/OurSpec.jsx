'use client'
import React, { useRef, useEffect } from 'react'
import { Truck, Shield, Headphones, Award, Clock, CheckCircle2 } from 'lucide-react'
import Title from './Title'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const OurSpecs = () => {
    const sectionRef = useRef(null)
    const cardsRef = useRef(null)
    const statsRef = useRef(null)
    
    const specs = [
        {
            icon: Truck,
            title: "Free Shipping",
            description: "Free delivery on all heavy machinery and bulk orders over R99",
            highlight: "24-48H"
        },
        {
            icon: Shield,
            title: "Lifetime Warranty",
            description: "We stand by our tools. Lifetime warranty on all hand tools",
            highlight: "100%"
        },
        {
            icon: Headphones,
            title: "24/7 Pro Support",
            description: "Technical support from industry experts around the clock",
            highlight: "24/7"
        }
    ]

    // Scroll animations (desktop only)
    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return
        
        if (!cardsRef.current) return
        
        const cards = cardsRef.current.querySelectorAll('.spec-card')
        
        gsap.fromTo(cards,
            { y: 60, opacity: 0, rotateX: -15 },
            {
                y: 0, opacity: 1, rotateX: 0,
                duration: 0.6,
                stagger: 0.15,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: cardsRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
        
        if (statsRef.current) {
            const statItems = statsRef.current.querySelectorAll('.stat-item')
            gsap.fromTo(statItems,
                { y: 30, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    ease: 'power2.out',
                    scrollTrigger: {
                        trigger: statsRef.current,
                        start: 'top 90%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])

    return (
        <section ref={sectionRef} className="py-16 sm:py-24 bg-[var(--te-dark)] overflow-hidden relative">
            {/* Diagonal stripes background */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        -45deg,
                        transparent,
                        transparent 40px,
                        var(--te-grey-400) 40px,
                        var(--te-grey-400) 41px
                    )`
                }}
            />
            
            {/* Yellow accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Section Header */}
                <div className="mb-12 sm:mb-16">
                    <Title 
                        title='Built for Professionals' 
                        description="Top-tier service and convenience to ensure your shopping experience is smooth, secure and completely hassle-free."
                        visibleButton={false}
                        dark={true}
                    />
                </div>

                {/* Specs Grid */}
                <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {specs.map((spec, index) => (
                        <div
                            key={index}
                            className="spec-card group relative bg-[var(--te-charcoal)] p-8 sm:p-10 border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] transition-all duration-300 te-hover-lift"
                            style={{ perspective: '1000px' }}
                        >
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)] transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                            
                            {/* Corner bracket */}
                            <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[var(--te-grey-500)] group-hover:border-[var(--te-yellow)] transition-colors" />
                            
                            {/* Highlight badge */}
                            <div className="absolute top-4 right-4 px-2 py-1 bg-[var(--te-yellow)] text-[var(--te-dark)] text-[10px] font-bold font-[family-name:var(--font-jetbrains)] tracking-wider">
                                {spec.highlight}
                            </div>
                            
                            {/* Icon container - hardware knob style */}
                            <div className="relative inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 mb-6">
                                <div className="absolute inset-0 bg-[var(--te-charcoal)] border-4 border-[var(--te-grey-500)] rounded-full group-hover:border-[var(--te-yellow)] transition-colors" />
                                <div className="absolute inset-2 bg-[var(--te-dark)] rounded-full flex items-center justify-center group-hover:bg-[var(--te-yellow)] transition-colors">
                                    <spec.icon size={28} className="text-[var(--te-white)] group-hover:text-[var(--te-dark)] transition-colors" strokeWidth={1.5} />
                                </div>
                                {/* LED indicator */}
                                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-[var(--te-green)] shadow-[0_0_8px_rgba(0,200,83,0.6)] animate-pulse" />
                            </div>

                            {/* Content */}
                            <div>
                                <h3 className="text-lg sm:text-xl font-black text-[var(--te-white)] mb-3 uppercase tracking-wide group-hover:text-[var(--te-yellow)] transition-colors">
                                    {spec.title}
                                </h3>
                                <p className="text-sm text-[var(--te-grey-300)] font-medium leading-relaxed">
                                    {spec.description}
                                </p>
                            </div>
                            
                            {/* Bottom corner */}
                            <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[var(--te-grey-500)] group-hover:border-[var(--te-yellow)] transition-colors" />
                        </div>
                    ))}
                </div>

                {/* Stats section */}
                <div ref={statsRef} className="mt-16 sm:mt-20 py-10 px-8 bg-[var(--te-dark)] relative">
                    {/* Yellow accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
                    
                    <div className="flex flex-wrap items-center justify-center gap-10 sm:gap-16 lg:gap-24">
                        {[
                            { icon: Award, value: '10K+', label: 'Happy Customers' },
                            { icon: Clock, value: '15+', label: 'Years Experience' },
                            { icon: Shield, value: '100%', label: 'Secure Payments' },
                            { icon: CheckCircle2, value: '50+', label: 'Trusted Brands' },
                        ].map((stat, i) => (
                            <div key={i} className="stat-item flex items-center gap-4 group">
                                <div className="flex items-center justify-center w-14 h-14 bg-[var(--te-charcoal)] border border-[var(--te-grey-500)] group-hover:border-[var(--te-yellow)] transition-colors">
                                    <stat.icon size={22} className="text-[var(--te-yellow)]" strokeWidth={1.5} />
                                </div>
                                <div>
                                    <div className="text-2xl sm:text-3xl font-black text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]">
                                        {stat.value}
                                    </div>
                                    <div className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase">
                                        {stat.label}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Corner brackets */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-l-2 border-t-2 border-[var(--te-yellow)]" />
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-r-2 border-b-2 border-[var(--te-yellow)]" />
                </div>
            </div>
        </section>
    )
}

export default OurSpecs
