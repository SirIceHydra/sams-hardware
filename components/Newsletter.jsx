'use client'
import React, { useRef, useEffect } from 'react'
import Title from './Title'
import { Zap, Mail, ArrowRight, CheckCircle2 } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const Newsletter = () => {
    const sectionRef = useRef(null)
    const formRef = useRef(null)
    const [email, setEmail] = React.useState('')
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    
    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return
        
        if (!sectionRef.current) return
        
        gsap.fromTo(sectionRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0, opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        )
        
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill())
        }
    }, [])
    
    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) return
        
        // Animate button
        gsap.to(formRef.current, {
            scale: 0.98,
            duration: 0.1,
            yoyo: true,
            repeat: 1
        })
        
        setIsSubmitted(true)
        setEmail('')
        
        // Reset after 3 seconds
        setTimeout(() => setIsSubmitted(false), 3000)
    }

    return (
        <div ref={sectionRef} className='te-section-dark py-20 sm:py-28 relative overflow-hidden'>
            {/* Grid background */}
            <div 
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                        linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            
            {/* Yellow accent lines */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
            
            {/* Corner brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-l-3 border-t-3 border-[var(--te-yellow)]" />
            <div className="absolute bottom-8 right-8 w-12 h-12 border-r-3 border-b-3 border-[var(--te-yellow)]" />
            
            {/* Floating elements */}
            <div className="absolute top-20 right-20 w-32 h-32 border-2 border-[var(--te-yellow)]/10 rotate-45 te-float pointer-events-none" />
            
            <div className='flex flex-col items-center mx-4 relative z-10'>
                {/* Icon */}
                <div className="mb-8 relative">
                    <div className="w-20 h-20 bg-[var(--te-charcoal)] border-2 border-[var(--te-grey-500)] flex items-center justify-center">
                        <Mail size={32} className="text-[var(--te-yellow)]" />
                    </div>
                    {/* LED indicator */}
                    <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--te-green)] shadow-[0_0_12px_rgba(0,200,83,0.6)] animate-pulse" />
                </div>
                
                <Title 
                    title="Join Newsletter" 
                    description="Subscribe to get exclusive deals, new arrivals, and insider updates delivered straight to your inbox every week." 
                    visibleButton={false}
                    dark
                />
                
                {/* Form */}
                <form ref={formRef} onSubmit={handleSubmit} className='w-full max-w-xl mt-10'>
                    {isSubmitted ? (
                        <div className="flex items-center justify-center gap-3 py-5 bg-[var(--te-green)]/10 border-2 border-[var(--te-green)] text-[var(--te-green)]">
                            <CheckCircle2 size={20} />
                            <span className="font-bold text-sm tracking-widest uppercase">Successfully subscribed!</span>
                        </div>
                    ) : (
                        <div className='flex bg-[var(--te-charcoal)] border-2 border-[var(--te-grey-500)] focus-within:border-[var(--te-yellow)] transition-colors'>
                            <input 
                                className='flex-1 px-6 py-5 outline-none bg-transparent text-[var(--te-white)] placeholder-[var(--te-grey-500)] font-medium tracking-widest text-sm uppercase' 
                                type="email" 
                                placeholder='ENTER YOUR EMAIL' 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <button 
                                type="submit"
                                className='group flex items-center gap-3 font-bold bg-[var(--te-yellow)] text-[var(--te-dark)] px-8 py-5 hover:bg-[var(--te-yellow-light)] active:scale-95 transition-all tracking-widest uppercase text-xs'
                                style={{ boxShadow: '0 0 30px rgba(248, 204, 40, 0.2)' }}
                            >
                                <Zap size={16} />
                                <span className="hidden sm:inline">Subscribe</span>
                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    )}
                </form>
                
                {/* Trust badges */}
                <div className="flex items-center gap-6 mt-8 text-[var(--te-grey-500)]">
                    <span className="text-[10px] font-medium tracking-widest uppercase">✓ No spam</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span className="text-[10px] font-medium tracking-widest uppercase">✓ Unsubscribe anytime</span>
                    <span className="w-1 h-1 rounded-full bg-current" />
                    <span className="text-[10px] font-medium tracking-widest uppercase">✓ Weekly deals</span>
                </div>
            </div>
        </div>
    )
}

export default Newsletter
