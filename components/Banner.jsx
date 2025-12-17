'use client'
import React, { useRef } from 'react'
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Truck, MapPin, Clock, FileText, X } from 'lucide-react';

gsap.registerPlugin(useGSAP);

export default function Banner() {
    const [isOpen, setIsOpen] = React.useState(true);
    const bannerRef = useRef(null);
    const stripeRef = useRef(null);

    useGSAP(() => {
        if (!bannerRef.current) return;
        
        // Initial slide down animation
        gsap.fromTo(
            bannerRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }
        );
    }, { scope: bannerRef });

    const handleClose = () => {
        gsap.to(bannerRef.current, {
            y: -50,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => setIsOpen(false)
        });
    };

    return isOpen && (
        <div
            ref={bannerRef}
            className="w-full font-bold text-[10px] sm:text-xs text-[var(--te-white)] bg-[var(--te-dark)] relative overflow-hidden border-b border-[var(--te-grey-500)]"
        >
            {/* Animated stripe pattern - FULL WIDTH with smooth left-to-right animation */}
            <div 
                ref={stripeRef}
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: `repeating-linear-gradient(
                        90deg,
                        transparent,
                        transparent 20px,
                        var(--te-yellow) 20px,
                        var(--te-yellow) 40px
                    )`,
                    backgroundSize: '80px 100%',
                    backgroundPosition: '0% 0%',
                    animation: 'bannerStripe 7s linear infinite'
                }}
            />
            
            {/* Yellow accent line at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--te-yellow)]" />
            
            {/* CENTERED CONTENT */}
            <div className='flex items-center justify-center gap-4 sm:gap-8 px-4 sm:px-6 py-2.5 relative z-10'>
                {/* Shipping info items - ALL CENTERED */}
                <div className='flex items-center justify-center gap-4 sm:gap-8 flex-wrap'>
                    {/* Free Shipping */}
                    <div className="flex items-center gap-2 shrink-0">
                        <Truck size={14} className="text-[var(--te-yellow)] flex-shrink-0" />
                        <span className='tracking-widest uppercase text-[var(--te-grey-300)] text-[9px] sm:text-[10px]'>
                            Free Shipping on orders over <span className="text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]">R1499</span>
                        </span>
                    </div>
                    
                    <div className="w-px h-4 bg-[var(--te-grey-500)] hidden sm:block shrink-0" />
                    
                    {/* Track Order */}
                    <div className="hidden sm:flex items-center gap-2 shrink-0">
                        <MapPin size={14} className="text-[var(--te-yellow)] flex-shrink-0" />
                        <span className='tracking-widest uppercase text-[var(--te-grey-300)] text-[9px] sm:text-[10px]'>
                            Track your order
                        </span>
                    </div>
                    
                    <div className="w-px h-4 bg-[var(--te-grey-500)] hidden lg:block shrink-0" />
                    
                    {/* Delivery Time */}
                    <div className="hidden lg:flex items-center gap-2 shrink-0">
                        <Clock size={14} className="text-[var(--te-yellow)] flex-shrink-0" />
                        <span className='tracking-widest uppercase text-[var(--te-grey-300)] text-[9px] sm:text-[10px]'>
                            <span className="text-[var(--te-yellow)] font-[family-name:var(--font-jetbrains)]">3-5</span> day delivery
                        </span>
                    </div>
                    
                    <div className="w-px h-4 bg-[var(--te-grey-500)] hidden xl:block shrink-0" />
                    
                    {/* Shipping Policy Link */}
                    <Link 
                        href="/shipping" 
                        className="hidden xl:flex group items-center gap-2 font-bold text-[var(--te-yellow)] hover:text-[var(--te-white)] transition-colors tracking-widest uppercase text-[9px] sm:text-[10px]"
                    >
                        <FileText size={12} />
                        <span className="relative">
                            View shipping policy
                            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-300" />
                        </span>
                    </Link>
                </div>
                
                {/* Close button - ABSOLUTE POSITIONED */}
                <button 
                    onClick={handleClose} 
                    type="button" 
                    className="absolute right-4 flex items-center justify-center w-6 h-6 text-[var(--te-grey-400)] hover:text-[var(--te-yellow)] transition-colors"
                    aria-label="Close banner"
                >
                    <X size={14} />
                </button>
            </div>
        </div>
    );
};
