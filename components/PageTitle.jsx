'use client'
import { ArrowRightIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const PageTitle = ({ heading, text, path = "/", linkText }) => {

    const headingRef = useRef(null)
    const headingTimelineRef = useRef(null)

    useGSAP(() => {
        if (!headingRef.current) return
        
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) return

        const chars = headingRef.current.querySelectorAll('.section-title-char')
        
        const tl = gsap.timeline({
            paused: true,
            defaults: { duration: 0.4, ease: 'power1.out' }
        })

        tl.fromTo(
            chars,
            { opacity: 0, y: 8 },
            {
                opacity: 1,
                y: 0,
                stagger: 0.025,
            }
        )
        
        ScrollTrigger.create({
            trigger: headingRef.current,
            start: 'top 80%',
            onEnter: () => tl.restart()
        })

        headingTimelineRef.current = tl
    }, [])

    const handleMouseEnter = () => {
        if (headingTimelineRef.current) {
            headingTimelineRef.current.restart()
        }
    }

    const safeHeading = String(heading ?? '')

    return (
        <div className="my-6 pb-4 border-b border-[var(--te-grey-200)]" onMouseEnter={handleMouseEnter}>
            <h2 ref={headingRef} className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">
                {safeHeading.split('').map((ch, i) => (
                    <span key={i} className="section-title-char inline-block">
                        {ch}
                    </span>
                ))}
            </h2>
            <div className="flex items-center gap-3 mt-1">
                <p className="text-[var(--te-grey-400)] text-xs font-medium tracking-wide">{text}</p>
                <Link href={path} className="flex items-center gap-1 text-[var(--te-orange)] hover:text-[var(--te-dark)] text-xs font-semibold tracking-widest uppercase transition-colors">
                    {linkText} <ArrowRightIcon size={12} />
                </Link>
            </div>
        </div>
    )
}

export default PageTitle
