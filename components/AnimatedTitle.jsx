'use client'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

function AnimatedTitle({ title }) {
    const titleRef = useRef(null)
    const timelineRef = useRef(null)

    useGSAP(() => {
        if (!titleRef.current || !title) return

        const chars = titleRef.current.querySelectorAll('.animated-title-char')
        
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
    }, { scope: titleRef, dependencies: [title] })

    if (!title) return null

    return (
        <div className="flex flex-col items-center mb-8">
            <h1 
                ref={titleRef} 
                className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] uppercase tracking-tight"
            >
                {title.split('').map((char, i) => (
                    <span 
                        key={i} 
                        className="animated-title-char inline-block"
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </span>
                ))}
            </h1>
        </div>
    )
}

export default AnimatedTitle
