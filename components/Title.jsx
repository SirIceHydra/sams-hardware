'use client'
import { ArrowRight, Zap } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Title = ({ title, description, visibleButton = true, href = '', dark = false }) => {

    const containerRef = useRef(null)
    const titleRef = useRef(null)
    const underlineRef = useRef(null)
    const hasAnimatedRef = useRef(false)

    useGSAP(() => {
        if (!titleRef.current || !underlineRef.current) return
        
        // Skip animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return

        const initAnimation = () => {
            const chars = titleRef.current.querySelectorAll('.section-title-char')

            if (chars.length === 0) {
                setTimeout(initAnimation, 50)
                return
            }

            // Initial states
            gsap.set(chars, { opacity: 0, y: 30, rotateX: -90 })
            gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: 'left' })
            
            // Create scroll-triggered animation
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: 'top 85%',
                onEnter: () => {
                    if (!hasAnimatedRef.current) {
                        hasAnimatedRef.current = true
                        
                        // Animate characters
                        gsap.to(chars, {
                            opacity: 1,
                            y: 0,
                            rotateX: 0,
                            duration: 0.5,
                            stagger: 0.03,
                            ease: 'power3.out'
                        })
                        
                        // Animate underline
                        gsap.to(underlineRef.current, {
                            scaleX: 1,
                            duration: 0.8,
                            delay: 0.3,
                            ease: 'power3.out'
                        })
                        
                        // Color flash effect
                        gsap.fromTo(titleRef.current,
                            { color: dark ? 'var(--te-white)' : 'var(--te-dark)' },
                            { 
                                color: 'var(--te-yellow)', 
                                duration: 0.3, 
                                delay: 0.4,
                                yoyo: true,
                                repeat: 1,
                                ease: 'power2.inOut',
                                onComplete: () => {
                                    gsap.set(titleRef.current, { color: dark ? 'var(--te-white)' : 'var(--te-dark)' })
                                }
                            }
                        )
                    }
                }
            })
        }

        initAnimation()

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, { scope: containerRef, dependencies: [title, dark] })

    const safeTitle = String(title ?? '')

    return (
        <div ref={containerRef} className='flex flex-col items-center px-4 sm:px-0'>
            {/* Title with character animation */}
            <div className="relative">
                <h2 
                    ref={titleRef} 
                    className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight uppercase ${
                        dark ? 'text-[var(--te-white)]' : 'text-[var(--te-dark)]'
                    }`}
                    style={{ perspective: '500px' }}
                >
                    {safeTitle.split('').map((char, i) => (
                        <span 
                            key={i} 
                            className='section-title-char inline-block'
                            style={{ transformStyle: 'preserve-3d' }}
                        >
                            {char === ' ' ? '\u00A0' : char}
                        </span>
                    ))}
                </h2>
                
                {/* Animated underline */}
                <div 
                    ref={underlineRef}
                    className="absolute -bottom-2 left-0 right-0 h-1 bg-[var(--te-yellow)]"
                    style={{ transformOrigin: 'left' }}
                />
            </div>
            
            {/* Description and button */}
            {description && (
                <div className='flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mt-6'>
                    <p className={`max-w-lg text-center text-sm leading-relaxed ${
                        dark ? 'text-[var(--te-grey-400)]' : 'text-[var(--te-grey-400)]'
                    }`}>
                        {description}
                    </p>
                    {visibleButton && href && (
                        <Link 
                            href={href}
                            className='group flex items-center gap-2 px-5 py-2.5 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-xs tracking-widest uppercase hover:bg-[var(--te-yellow-light)] transition-all'
                            style={{ boxShadow: '0 3px 0 var(--te-yellow-dark)' }}
                        >
                            <Zap size={14} />
                            View All
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    )}
                </div>
            )}
        </div>
    )
}

export default Title
