'use client'

import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ChevronUp } from 'lucide-react'

const ScrollProgress = () => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (typeof window === 'undefined' || typeof document === 'undefined') return

            const { scrollTop, scrollHeight, clientHeight } = document.documentElement
            const maxScrollable = scrollHeight - clientHeight

            if (maxScrollable <= 0) {
                setProgress(0)
                return
            }

            const percent = (scrollTop / maxScrollable) * 100
            setProgress(percent)
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const segments = 12
    const activeSegments = Math.round((progress / 100) * segments)

    const radius = 16
    const circumference = 2 * Math.PI * radius
    const offset = circumference - (progress / 100) * circumference

    const isVisible = progress > 5

    const handleBackToTop = () => {
        if (typeof window === 'undefined') return
        
        const startPosition = window.pageYOffset || document.documentElement.scrollTop
        
        gsap.to({ scroll: startPosition }, {
            scroll: 0,
            duration: 1,
            ease: 'power3.out',
            overwrite: true,
            onUpdate: function() {
                window.scrollTo(0, this.targets()[0].scroll)
            }
        })
    }

    return (
        <>
            {/* Fixed scroll progress bar */}
            <div
                className={`fixed left-0 right-0 z-[9997] transition-all duration-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{ top: 'var(--header-height, 72px)' }}
            >
                <div className="mx-0 flex items-center bg-[var(--te-dark)] border-b-2 border-[var(--te-grey-500)]">
                    {/* Segmented LED strip style progress */}
                    <div className="flex-1 flex h-1.5">
                        {Array.from({ length: segments }).map((_, i) => (
                            <div
                                key={i}
                                className={`flex-1 transition-all duration-150 ${
                                    i < activeSegments 
                                        ? 'bg-[var(--te-yellow)]' 
                                        : 'bg-[var(--te-grey-500)]'
                                }`}
                                style={i < activeSegments ? { 
                                    boxShadow: '0 0 8px var(--te-yellow-glow)',
                                } : {}}
                            />
                        ))}
                    </div>

                    {/* Percentage display */}
                    <div className="hidden sm:flex items-center gap-3 px-4 py-1 bg-[var(--te-charcoal)] border-l border-[var(--te-grey-500)]">
                        <span className="text-xs font-bold text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)] tracking-wider">
                            {Math.round(progress)}%
                        </span>
                        
                        {/* Back to top button */}
                        <button
                            type="button"
                            onClick={handleBackToTop}
                            className="flex items-center justify-center w-8 h-8 bg-[var(--te-yellow)] text-[var(--te-dark)] hover:bg-[var(--te-yellow-light)] active:scale-95 transition-all"
                            aria-label="Back to top"
                        >
                            <ChevronUp size={16} strokeWidth={3} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile floating back to top button */}
            <button
                type="button"
                onClick={handleBackToTop}
                className={`fixed bottom-6 right-6 sm:hidden z-[9997] flex flex-col items-center justify-center w-14 h-14 bg-[var(--te-yellow)] text-[var(--te-dark)] active:scale-95 transition-all duration-300 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                }`}
                style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 20px rgba(248, 204, 40, 0.3)' }}
                aria-label="Back to top"
            >
                {/* Circular progress ring */}
                <svg width="44" height="44" viewBox="0 0 44 44" className="absolute">
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        stroke="var(--te-dark)"
                        strokeWidth="2"
                        fill="none"
                        opacity="0.2"
                    />
                    <circle
                        cx="22"
                        cy="22"
                        r={radius}
                        stroke="var(--te-dark)"
                        strokeWidth="2"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        strokeLinecap="butt"
                        transform="rotate(-90 22 22)"
                        className="transition-all duration-150"
                    />
                </svg>
                <ChevronUp size={20} strokeWidth={3} className="relative z-10" />
            </button>
        </>
    )
}

export default ScrollProgress
