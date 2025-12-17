'use client'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function AnimatedLabel({ label, isActive, htmlFor }) {
    const labelRef = useRef(null)
    const timelineRef = useRef(null)
    const hasAnimatedRef = useRef(false)

    useGSAP(() => {
        if (!labelRef.current || !label || !isActive || hasAnimatedRef.current) return

        const chars = labelRef.current.querySelectorAll('.animated-label-char')
        
        if (chars.length === 0) return

        gsap.set(chars, { 
            opacity: 0,
            color: 'var(--te-dark)'
        })

        if (timelineRef.current) {
            timelineRef.current.kill()
        }

        const tl = gsap.timeline()

        const letterDuration = 0.08
        const letterDelay = 0.06
        const wholeWordDuration = 0.2
        const pauseDuration = 0.05

        chars.forEach((char, index) => {
            tl.to(char, {
                opacity: 1,
                duration: letterDuration,
                ease: 'power1.out'
            }, index * letterDelay)

            if (index > 0) {
                tl.to(chars[index - 1], {
                    color: 'var(--te-orange)',
                    duration: letterDuration,
                    ease: 'power1.out'
                }, `-=${letterDuration}`)
            }
        })

        if (chars.length > 0) {
            const lastIndex = chars.length - 1
            tl.to(chars[lastIndex], {
                color: 'var(--te-orange)',
                duration: letterDuration,
                ease: 'power1.out'
            }, `+=${pauseDuration}`)
        }

        tl.to(chars, {
            color: 'var(--te-orange)',
            duration: wholeWordDuration,
            ease: 'power1.out'
        }, `+=${pauseDuration}`)

        tl.to(chars, {
            color: 'var(--te-dark)',
            duration: wholeWordDuration,
            ease: 'power1.out'
        })

        timelineRef.current = tl
        hasAnimatedRef.current = true
    }, { scope: labelRef, dependencies: [label, isActive] })

    useEffect(() => {
        if (!isActive && hasAnimatedRef.current) {
            if (labelRef.current) {
                const chars = labelRef.current.querySelectorAll('.animated-label-char')
                gsap.set(chars, { 
                    opacity: 1,
                    color: 'var(--te-dark)'
                })
            }
            hasAnimatedRef.current = false
        }
    }, [isActive])

    if (!label) return null

    return (
        <label 
            ref={labelRef}
            htmlFor={htmlFor}
            className="block text-sm font-semibold text-[var(--te-dark)] mb-2 uppercase tracking-widest"
        >
            {label.split('').map((char, i) => (
                <span 
                    key={i} 
                    className="animated-label-char inline-block"
                >
                    {char === ' ' ? '\u00A0' : char}
                </span>
            ))}
        </label>
    )
}

export default AnimatedLabel
