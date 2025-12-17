'use client'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import CategoriesMarquee from './CategoriesMarquee'
import Title from './Title'
import ImageCarousel from './ImageCarousel'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Zap, Wrench, Hammer } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const Hero = () => {
    const router = useRouter()
    const departmentsRef = useRef(null)
    const saleRef = useRef(null)
    const heroTextRef = useRef(null)

    const departments = [
        { name: 'General hardware', category: 'Hand Tools', image: '/Images/Departments/General hardware.jpeg' },
        { name: 'Building materials', category: 'Hand Tools', image: '/Images/Departments/Building materials.jpeg' },
        { name: 'Lighting', category: 'Electrical', image: '/Images/Departments/Lighting.jpeg' },
        { name: 'Electrical', category: 'Electrical', image: '/Images/Departments/Electrical.jpeg' },
        { name: 'Paint', category: 'Hand Tools', image: '/Images/Departments/Paint.jpeg' },
        { name: 'Plumbing', category: 'Plumbing', image: '/Images/Departments/Plumbing.jpeg' },
        { name: 'Handtools', category: 'Hand Tools', image: '/Images/Departments/Handtools.jpeg' },
        { name: 'Powertools', category: 'Power Tools', image: '/Images/Departments/Powertools.jpeg' }
    ]

    const handleDepartmentClick = (department) => {
        router.push(`/department/${encodeURIComponent(department.name.toLowerCase().replace(/\s+/g, '-'))}`)
    }

    const carouselImages = [
        { image: '/Images/carausel_header/handtools.jpeg', department: 'Handtools', link: '/department/handtools' },
        { image: '/Images/carausel_header/plumbing.jpeg', department: 'Plumbing', link: '/department/plumbing' },
        { image: '/Images/carausel_header/powertools.jpeg', department: 'Powertools', link: '/department/powertools' }
    ]

    // Scroll-triggered animations
    useEffect(() => {
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        
        // Hero text animation (always runs - it's the intro)
        if (heroTextRef.current) {
            gsap.fromTo(heroTextRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            )
        }

        // Skip scroll-triggered animations on mobile
        if (isMobile) return
        
        // Department cards stagger animation on scroll (desktop only)
        if (departmentsRef.current) {
            const cards = departmentsRef.current.querySelectorAll('.department-card')
            gsap.fromTo(cards,
                { y: 60, opacity: 0, scale: 0.95 },
                {
                    y: 0, opacity: 1, scale: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: departmentsRef.current,
                        start: 'top 80%',
                        toggleActions: 'play none none reverse'
                    }
                }
            )
        }

        // Sale section animation (desktop only)
        if (saleRef.current) {
            gsap.fromTo(saleRef.current,
                { y: 40, opacity: 0 },
                {
                    y: 0, opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: saleRef.current,
                        start: 'top 85%',
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
        <div className="overflow-hidden">
            {/* ═══════════════════════════════════════════════════════════════
                HERO SECTION WITH INTEGRATED CAROUSEL - BLACK BG
                ═══════════════════════════════════════════════════════════════ */}
            <div className='bg-[var(--te-dark)] py-12 sm:py-16 lg:py-20 relative overflow-hidden'>
                {/* Animated grid background */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `
                            linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                            linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                        `,
                        backgroundSize: '60px 60px'
                    }}
                />
                
                {/* Floating accent shapes */}
                <div className="absolute top-20 left-10 w-32 h-32 border-2 border-[var(--te-yellow)]/20 rotate-45 te-float" style={{ animationDelay: '0s' }} />
                <div className="absolute bottom-20 right-20 w-24 h-24 bg-[var(--te-yellow)]/10 rotate-12 te-float" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 right-1/4 w-4 h-4 bg-[var(--te-yellow)] te-led-pulse" />
                
                <div className='px-4 sm:mx-6 relative z-10'>
                    <div className='max-w-7xl mx-auto'>
                        {/* Main hero content - side by side layout */}
                        <div className='flex flex-col lg:flex-row gap-8 lg:gap-12 items-center'>
                            {/* Left side - Text content (narrower) */}
                            <div className='lg:w-[45%] xl:w-[40%]' ref={heroTextRef}>
                                {/* Small label */}
                                <div className="flex items-center gap-3 mb-6">
                                    <span className="w-8 h-[2px] bg-[var(--te-yellow)]" />
                                    <span className="text-[var(--te-yellow)] text-xs font-bold tracking-[0.3em] uppercase">
                                        Professional Grade
                                    </span>
                                </div>
                                
                                {/* Main headline - more compact */}
                                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-[var(--te-white)] leading-[0.95] tracking-tight mb-6">
                                    BUILD
                                    <span className="text-[var(--te-yellow)] ml-3">BETTER</span>
                                    <span className="block mt-2 text-[var(--te-grey-300)] text-2xl sm:text-3xl lg:text-4xl">WITH THE RIGHT TOOLS</span>
                                </h1>
                                
                                {/* Subtext */}
                                <p className="text-[var(--te-grey-400)] text-sm sm:text-base leading-relaxed mb-6">
                                    Premium hardware and tools for professionals and DIY enthusiasts. 
                                    Quality you can trust, prices you'll love.
                                </p>
                                
                                {/* CTA Buttons */}
                                <div className="flex flex-wrap gap-3">
                                    <button 
                                        onClick={() => router.push('/shop')}
                                        className="group flex items-center gap-2 px-6 py-3 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-xs sm:text-sm tracking-widest uppercase hover:bg-[var(--te-yellow-light)] active:translate-y-1 transition-all"
                                        style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 30px rgba(248, 204, 40, 0.3)' }}
                                    >
                                        <Zap size={16} />
                                        Shop Now
                                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={() => router.push('/about')}
                                        className="flex items-center gap-2 px-6 py-3 bg-transparent text-[var(--te-white)] font-bold text-xs sm:text-sm tracking-widest uppercase border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] hover:text-[var(--te-yellow)] transition-all"
                                    >
                                        Learn More
                                    </button>
                                </div>
                                
                                {/* Stats row */}
                                <div className="flex flex-wrap gap-6 mt-8 pt-6 border-t border-[var(--te-grey-500)]">
                                    {[
                                        { value: '10K+', label: 'Products' },
                                        { value: '50+', label: 'Brands' },
                                        { value: '24/7', label: 'Support' },
                                    ].map((stat, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-xl sm:text-2xl font-black text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]">
                                                {stat.value}
                                            </div>
                                            <div className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase mt-1">
                                                {stat.label}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Right side - Image Carousel */}
                            <div className='lg:w-[55%] xl:w-[60%] w-full'>
                                <ImageCarousel images={carouselImages} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                DEPARTMENTS SECTION - GREY BG
                ═══════════════════════════════════════════════════════════════ */}
            <div className='bg-[var(--te-cream)] py-12 sm:py-20 relative'>
                {/* Dot pattern */}
                <div 
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                        backgroundImage: `radial-gradient(var(--te-grey-400) 1.5px, transparent 1.5px)`,
                        backgroundSize: '24px 24px'
                    }}
                />
                
                <div className='px-4 sm:px-6 relative z-10'>
                    <div className='max-w-7xl mx-auto'>
                        {/* Section header */}
                        <div className='mb-10 sm:mb-14'>
                            <div className="flex items-center justify-center gap-4 mb-4">
                                <Wrench className="text-[var(--te-yellow)]" size={28} />
                                <Title title='Departments' visibleButton={false} />
                            </div>
                            <p className="text-[var(--te-grey-400)] max-w-lg mx-auto text-center text-sm leading-relaxed">
                                Browse our comprehensive selection of hardware categories. Find exactly what you need for your next project.
                            </p>
                        </div>
                        
                        {/* Departments grid */}
                        <div ref={departmentsRef} className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6'>
                            {departments.map((department, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleDepartmentClick(department)}
                                    className='department-card relative aspect-[4/5] bg-[var(--te-dark)] overflow-hidden group cursor-pointer te-hover-lift'
                                    onMouseEnter={(e) => {
                                        const img = e.currentTarget.querySelector('img')
                                        const label = e.currentTarget.querySelector('.department-label')
                                        const overlay = e.currentTarget.querySelector('.department-overlay')
                                        gsap.to(img, { scale: 1.15, duration: 0.5, ease: 'power2.out' })
                                        gsap.to(label, { y: -8, backgroundColor: 'var(--te-yellow)', color: 'var(--te-dark)', duration: 0.3 })
                                        gsap.to(overlay, { opacity: 0.7, duration: 0.3 })
                                    }}
                                    onMouseLeave={(e) => {
                                        const img = e.currentTarget.querySelector('img')
                                        const label = e.currentTarget.querySelector('.department-label')
                                        const overlay = e.currentTarget.querySelector('.department-overlay')
                                        gsap.to(img, { scale: 1, duration: 0.5, ease: 'power2.out' })
                                        gsap.to(label, { y: 0, backgroundColor: 'var(--te-dark)', color: 'var(--te-white)', duration: 0.3 })
                                        gsap.to(overlay, { opacity: 0.4, duration: 0.3 })
                                    }}
                                >
                                    {/* Corner brackets */}
                                    <div className="absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-[var(--te-yellow)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                                    <div className="absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-[var(--te-yellow)] opacity-0 group-hover:opacity-100 transition-opacity z-30" />
                                    
                                    {/* Gradient overlay */}
                                    <div className='department-overlay absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-40 z-10 transition-opacity' />
                                    
                                    {/* Image */}
                                    <Image
                                        src={department.image}
                                        alt={department.name}
                                        fill
                                        className='object-cover'
                                    />
                                    
                                    {/* Content */}
                                    <div className='absolute inset-0 z-20 flex flex-col justify-end p-4'>
                                        {/* Category tag */}
                                        <span className="text-[8px] sm:text-[10px] text-[var(--te-yellow)] font-bold tracking-[0.2em] uppercase mb-2">
                                            {department.category}
                                        </span>
                                        
                                        {/* Department name */}
                                        <div className='department-label inline-flex items-center gap-2 bg-[var(--te-dark)] text-[var(--te-white)] px-4 py-2.5 w-fit transition-all'>
                                            <span className='font-bold text-xs sm:text-sm tracking-widest uppercase'>
                                                {department.name}
                                            </span>
                                            <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    </div>
                                    
                                    {/* LED indicator */}
                                    <div className="absolute top-4 right-4 z-30">
                                        <div className="w-2 h-2 rounded-full bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] group-hover:shadow-[0_0_10px_var(--te-yellow-glow)] transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ═══════════════════════════════════════════════════════════════
                HOT DEALS / SALE MARQUEE SECTION - BLACK BG
                ═══════════════════════════════════════════════════════════════ */}
            <div ref={saleRef} className='bg-[var(--te-dark)] py-12 sm:py-20 relative overflow-hidden'>
                {/* Grid overlay */}
                <div 
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(var(--te-grey-500) 1px, transparent 1px),
                            linear-gradient(90deg, var(--te-grey-500) 1px, transparent 1px)
                        `,
                        backgroundSize: '80px 80px'
                    }}
                />
                
                {/* Yellow accent strips */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--te-yellow)]" />
                
                <div className='px-4 sm:px-6 relative z-10'>
                    <div className='max-w-7xl mx-auto mb-10'>
                        <div className="flex items-center gap-4 mb-4">
                            <Hammer className="text-[var(--te-yellow)]" size={28} />
                            <Title title='Hot Deals' visibleButton={false} dark />
                        </div>
                        <p className="text-[var(--te-grey-400)] max-w-lg text-sm leading-relaxed">
                            Limited time offers on premium tools and hardware. Don't miss out on these incredible savings.
                        </p>
                    </div>
                </div>
                
                <CategoriesMarquee />
            </div>
        </div>
    )
}

export default Hero
