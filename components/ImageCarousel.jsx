'use client'
import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import gsap from 'gsap'

const ImageCarousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const containerRef = useRef(null)
    const progressRef = useRef(null)
    const slideRefs = useRef([])

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }
        
        checkMobile()
        window.addEventListener('resize', checkMobile)
        
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Auto-advance with progress indicator
    useEffect(() => {
        const duration = 5000
        let startTime = Date.now()
        
        const updateProgress = () => {
            if (!progressRef.current) return
            const elapsed = Date.now() - startTime
            const progress = Math.min(elapsed / duration, 1)
            gsap.set(progressRef.current, { scaleX: progress })
        }
        
        const progressInterval = setInterval(updateProgress, 50)
        
        const slideInterval = setInterval(() => {
            startTime = Date.now()
            goToNext()
        }, duration)

        return () => {
            clearInterval(progressInterval)
            clearInterval(slideInterval)
        }
    }, [currentIndex, images.length])
    
    const animateSlide = (newIndex, direction) => {
        if (isTransitioning || !slideRefs.current[newIndex]) return
        setIsTransitioning(true)
        
        const currentSlide = slideRefs.current[currentIndex]
        const nextSlide = slideRefs.current[newIndex]
        
        const xFrom = direction === 'next' ? '100%' : '-100%'
        const xTo = direction === 'next' ? '-100%' : '100%'
        
        gsap.set(nextSlide, { x: xFrom, opacity: 1, scale: 1.05 })
        
        const tl = gsap.timeline({
            onComplete: () => {
                setIsTransitioning(false)
                setCurrentIndex(newIndex)
            }
        })
        
        tl.to(currentSlide, { x: xTo, opacity: 0, duration: 0.6, ease: 'power2.inOut' })
          .to(nextSlide, { x: '0%', scale: 1, duration: 0.6, ease: 'power2.inOut' }, '<')
        
        // Reset progress bar
        gsap.set(progressRef.current, { scaleX: 0 })
    }

    const goToPrevious = () => {
        const newIndex = (currentIndex - 1 + images.length) % images.length
        animateSlide(newIndex, 'prev')
    }

    const goToNext = () => {
        const newIndex = (currentIndex + 1) % images.length
        animateSlide(newIndex, 'next')
    }
    
    const goToSlide = (index) => {
        if (index === currentIndex) return
        const direction = index > currentIndex ? 'next' : 'prev'
        animateSlide(index, direction)
    }

    return (
        <div ref={containerRef} className='relative w-full h-64 sm:h-80 md:h-[400px] lg:h-[450px] overflow-hidden bg-[var(--te-dark)]'>
            {/* Main border frame */}
            <div className="absolute inset-0 border-4 border-[var(--te-dark)] z-30 pointer-events-none">
                <div className="absolute inset-1 border border-[var(--te-grey-500)]" />
            </div>
            
            {/* Corner brackets */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l-3 border-t-3 border-[var(--te-yellow)] z-30" />
            <div className="absolute top-4 right-4 w-8 h-8 border-r-3 border-t-3 border-[var(--te-yellow)] z-30" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l-3 border-b-3 border-[var(--te-yellow)] z-30" />
            <div className="absolute bottom-4 right-4 w-8 h-8 border-r-3 border-b-3 border-[var(--te-yellow)] z-30" />
            
            {/* Slide images */}
            {images.map((item, index) => {
                const imageSrc = typeof item === 'string' ? item : item.image
                const link = typeof item === 'object' ? item.link : null
                const department = typeof item === 'object' ? item.department : null
                
                return (
                    <div
                        key={index}
                        ref={el => slideRefs.current[index] = el}
                        className={`absolute inset-0 ${index === currentIndex ? 'z-10' : 'z-0'}`}
                        style={{ opacity: index === currentIndex ? 1 : 0 }}
                    >
                        <Image
                            src={imageSrc}
                            alt={department || `Carousel image ${index + 1}`}
                            fill
                            className='object-cover'
                            priority={index === 0}
                        />
                        
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent z-10" />
                        
                        {/* Content overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 z-20">
                            {department && (
                                <div className="mb-4">
                                    <span className="text-[var(--te-yellow)] text-xs font-bold tracking-[0.3em] uppercase">
                                        Featured Department
                                    </span>
                                </div>
                            )}
                            
                            <h3 className="text-3xl sm:text-5xl font-black text-[var(--te-white)] uppercase tracking-tight mb-4">
                                {department || 'Explore'}
                            </h3>
                            
                            {link && (
                                <Link 
                                    href={link}
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-sm tracking-widest uppercase hover:bg-[var(--te-yellow-light)] transition-all group"
                                    style={{ boxShadow: '0 4px 0 var(--te-yellow-dark)' }}
                                >
                                    Shop Now
                                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            )}
                        </div>
                        
                        {/* Scan line effect */}
                        <div 
                            className="absolute inset-0 z-15 pointer-events-none opacity-[0.03]"
                            style={{
                                backgroundImage: `repeating-linear-gradient(
                                    0deg,
                                    transparent,
                                    transparent 2px,
                                    black 2px,
                                    black 4px
                                )`
                            }}
                        />
                    </div>
                )
            })}
            
            {/* Navigation arrows */}
            <button
                onClick={goToPrevious}
                disabled={isTransitioning}
                className='absolute left-4 sm:left-8 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-[var(--te-dark)]/90 border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] hover:bg-[var(--te-yellow)] text-[var(--te-white)] hover:text-[var(--te-dark)] flex items-center justify-center transition-all duration-200 disabled:opacity-50'
                aria-label='Previous image'
            >
                <ChevronLeft size={24} />
            </button>

            <button
                onClick={goToNext}
                disabled={isTransitioning}
                className='absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 z-40 w-12 h-12 bg-[var(--te-dark)]/90 border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] hover:bg-[var(--te-yellow)] text-[var(--te-white)] hover:text-[var(--te-dark)] flex items-center justify-center transition-all duration-200 disabled:opacity-50'
                aria-label='Next image'
            >
                <ChevronRight size={24} />
            </button>
            
            {/* Bottom progress bar only */}
            {!isMobile && (
                <div className='absolute bottom-0 left-0 right-0 z-30'>
                    <div className="h-1.5 bg-[var(--te-grey-600)]">
                        <div 
                            ref={progressRef}
                            className="h-full bg-[var(--te-yellow)] origin-left"
                            style={{ transform: 'scaleX(0)' }}
                        />
                    </div>
                </div>
            )}
            
            {/* Slide counter */}
            <div className="absolute top-6 right-6 z-30 flex items-center gap-2 bg-[var(--te-dark)]/90 px-4 py-2 border border-[var(--te-grey-500)]">
                <span className="text-2xl font-black text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]">
                    {String(currentIndex + 1).padStart(2, '0')}
                </span>
                <span className="text-[var(--te-grey-500)]">/</span>
                <span className="text-sm font-bold text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">
                    {String(images.length).padStart(2, '0')}
                </span>
            </div>
        </div>
    )
}

export default ImageCarousel
