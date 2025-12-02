'use client'
import { assets } from '@/assets/assets'
import { ArrowRightIcon, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import React, { useRef } from 'react'
import CategoriesMarquee from './CategoriesMarquee'
import Scene from './Scene'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// Register GSAP plugin if needed, but basic gsap works without it for simple tweens.

const Hero = () => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '$'
    const heroRef = useRef(null)
    const titleRef = useRef(null)
    const badgeRef = useRef(null)
    const priceRef = useRef(null)
    const buttonRef = useRef(null)

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        
        tl.fromTo(heroRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 })
          .fromTo(badgeRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.4")
          .fromTo(titleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")
          .fromTo(priceRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.3")
          .fromTo(buttonRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.4 }, "-=0.2")
    }, { scope: heroRef })

    return (
        <div className='mx-6'>
            <div className='flex max-xl:flex-col gap-8 max-w-7xl mx-auto my-10'>
                <div ref={heroRef} className='relative flex-1 flex flex-col bg-slate-100 rounded-3xl xl:min-h-100 group overflow-hidden border border-slate-200'>
                    
                    {/* 3D Scene Background */}
                    <div className='absolute inset-0 z-0 translate-x-1/4 sm:translate-x-1/3 opacity-80'>
                        <Scene />
                    </div>

                    <div className='relative z-10 p-5 sm:p-16 bg-gradient-to-r from-slate-100/90 via-slate-100/50 to-transparent h-full flex flex-col justify-center'>
                        <div ref={badgeRef} className='inline-flex items-center gap-3 bg-orange-100 text-orange-600 pr-4 p-1 rounded-full text-xs sm:text-sm w-fit'>
                            <span className='bg-orange-500 px-3 py-1 max-sm:ml-1 rounded-full text-white text-xs'>PRO</span> Heavy Duty Gear <ChevronRightIcon className='group-hover:ml-2 transition-all' size={16} />
                        </div>
                        <h2 ref={titleRef} className='text-3xl sm:text-5xl leading-[1.2] my-3 font-bold text-slate-800 max-w-xs sm:max-w-lg'>
                            Build Bold. <br/>
                            <span className='text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500'>Tools for the Future.</span>
                        </h2>
                        <div ref={priceRef} className='text-slate-700 text-sm font-medium mt-4 sm:mt-8'>
                            <p>Professional tools from</p>
                            <p className='text-3xl font-bold text-slate-900'>{currency}19.99</p>
                        </div>
                        <button ref={buttonRef} className='w-fit bg-slate-900 text-white text-sm py-3 px-8 sm:py-4 sm:px-12 mt-4 sm:mt-10 rounded-full hover:bg-orange-600 hover:shadow-lg hover:shadow-orange-500/30 active:scale-95 transition-all duration-300'>
                            SHOP NOW
                        </button>
                    </div>
                </div>
                
                <div className='flex flex-col md:flex-row xl:flex-col gap-5 w-full xl:max-w-sm text-sm text-slate-600'>
                    <div className='flex-1 flex items-center justify-between w-full bg-amber-100 rounded-3xl p-6 px-8 group border border-amber-200 hover:shadow-md transition-all'>
                        <div>
                            <p className='text-3xl font-medium text-amber-800 max-w-40'>Power Tools</p>
                            <p className='flex items-center gap-1 mt-4 text-amber-700 font-semibold group-hover:gap-2 transition-all'>View collection <ArrowRightIcon size={18} /> </p>
                        </div>
                        <Image className='w-24 drop-shadow-lg' src={assets.product_img2} alt="Power Tool" />
                    </div>
                    <div className='flex-1 flex items-center justify-between w-full bg-slate-200 rounded-3xl p-6 px-8 group border border-slate-300 hover:shadow-md transition-all'>
                        <div>
                            <p className='text-3xl font-medium text-slate-800 max-w-40'>Pro Deals</p>
                            <p className='flex items-center gap-1 mt-4 text-slate-700 font-semibold group-hover:gap-2 transition-all'>Save up to 40% <ArrowRightIcon size={18} /> </p>
                        </div>
                        <Image className='w-24 drop-shadow-lg' src={assets.product_img1} alt="Pro Deal" />
                    </div>
                </div>
            </div>
            <CategoriesMarquee />
        </div>

    )
}

export default Hero