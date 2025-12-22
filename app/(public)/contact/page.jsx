'use client'

import { useState, useRef, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import AnimatedTitle from "@/components/AnimatedTitle"
import AnimatedLabel from "@/components/AnimatedLabel"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export default function ContactPage() {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        subject: '',
        message: ''
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitStatus, setSubmitStatus] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const [activeField, setActiveField] = useState(null)
    
    const dropdownRef = useRef(null)
    const dropdownMenuRef = useRef(null)
    const isDropdownVisibleRef = useRef(false)
    const isDropdownInitializedRef = useRef(false)

    const subjectOptions = [
        { value: '', label: 'Select a subject' },
        { value: 'general', label: 'General Inquiry' },
        { value: 'support', label: 'Customer Support' },
        { value: 'sales', label: 'Sales Question' },
        { value: 'partnership', label: 'Partnership' },
        { value: 'other', label: 'Other' }
    ]

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        if (value.length === 1 && activeField !== name) {
            setActiveField(name)
        }
    }

    const handleFocus = (fieldName) => {
        setActiveField(fieldName)
    }

    const handleBlur = (fieldName) => {
        if (!formData[fieldName] || formData[fieldName].length === 0) {
            setActiveField(null)
        }
    }

    const handleSubjectSelect = (value) => {
        setFormData(prev => ({
            ...prev,
            subject: value
        }))
        setIsDropdownOpen(false)
        if (value && activeField !== 'subject') {
            setActiveField('subject')
        }
    }

    const handleSubjectFocus = () => {
        if (!formData.subject) {
            setActiveField('subject')
        }
    }

    const handleSubjectBlur = () => {
        if (!formData.subject || formData.subject.length === 0) {
            setActiveField(null)
        }
    }

    useGSAP(() => {
        if (!dropdownRef.current || !dropdownMenuRef.current || isDropdownInitializedRef.current) return
        
        gsap.set(dropdownRef.current, { 
            opacity: 0, 
            y: -8, 
            pointerEvents: 'none',
            display: 'none'
        })
        const menuItems = dropdownMenuRef.current.querySelectorAll('.dropdown-item')
        if (menuItems.length > 0) {
            gsap.set(menuItems, { opacity: 0, y: -4, pointerEvents: 'none' })
        }
        isDropdownVisibleRef.current = false
        isDropdownInitializedRef.current = true
    }, { scope: dropdownRef })

    useEffect(() => {
        if (!dropdownRef.current || !dropdownMenuRef.current) return

        if (!isDropdownInitializedRef.current) {
            gsap.set(dropdownRef.current, { 
                opacity: 0, 
                y: -8, 
                pointerEvents: 'none',
                display: 'none'
            })
            const menuItems = dropdownMenuRef.current.querySelectorAll('.dropdown-item')
            if (menuItems.length > 0) {
                gsap.set(menuItems, { opacity: 0, y: -4, pointerEvents: 'none' })
            }
            isDropdownVisibleRef.current = false
            isDropdownInitializedRef.current = true
            return
        }

        if (isDropdownOpen) {
            gsap.killTweensOf([dropdownRef.current, dropdownMenuRef.current.querySelectorAll('.dropdown-item')])
            
            gsap.set(dropdownRef.current, { pointerEvents: 'auto', display: 'block' })
            const menuItems = dropdownMenuRef.current.querySelectorAll('.dropdown-item')
            if (menuItems.length > 0) {
                menuItems.forEach(item => {
                    gsap.set(item, { pointerEvents: 'auto' })
                })
            }
            
            gsap.set(dropdownRef.current, { opacity: 0, y: -8 })
            if (menuItems.length > 0) {
                gsap.set(menuItems, { opacity: 0, y: -4 })
            }

            gsap.to(dropdownRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out',
                onComplete: () => {
                    isDropdownVisibleRef.current = true
                }
            })

            if (menuItems.length > 0) {
                gsap.to(menuItems, {
                    opacity: 1,
                    y: 0,
                    duration: 0.15,
                    stagger: 0.02,
                    ease: 'power2.out',
                    delay: 0.05
                })
            }
        } else if (isDropdownVisibleRef.current) {
            gsap.killTweensOf([dropdownRef.current, dropdownMenuRef.current.querySelectorAll('.dropdown-item')])
            
            const menuItems = dropdownMenuRef.current.querySelectorAll('.dropdown-item')
            if (menuItems.length > 0) {
                gsap.to(menuItems, {
                    opacity: 0,
                    y: -4,
                    duration: 0.1,
                    stagger: 0.015,
                    ease: 'power2.in'
                })
            }
            
            gsap.to(dropdownRef.current, {
                opacity: 0,
                y: -8,
                duration: 0.15,
                ease: 'power2.in',
                delay: 0.05,
                onComplete: () => {
                    gsap.set(dropdownRef.current, { pointerEvents: 'none', display: 'none' })
                    const menuItems = dropdownMenuRef.current.querySelectorAll('.dropdown-item')
                    if (menuItems.length > 0) {
                        menuItems.forEach(item => {
                            gsap.set(item, { pointerEvents: 'none' })
                        })
                    }
                    isDropdownVisibleRef.current = false
                }
            })
        }
    }, [isDropdownOpen])

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && 
                !event.target.closest('.subject-dropdown-trigger')) {
                setIsDropdownOpen(false)
            }
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [isDropdownOpen])

    const selectedSubject = subjectOptions.find(opt => opt.value === formData.subject) || subjectOptions[0]

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setSubmitStatus(null)

        setTimeout(() => {
            setIsSubmitting(false)
            setSubmitStatus('success')
            setFormData({
                fullName: '',
                email: '',
                subject: '',
                message: ''
            })
            
            setTimeout(() => {
                setSubmitStatus(null)
            }, 5000)
        }, 1000)
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="Contact Us" />
            
            <div className="mt-8">
                <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
                    {/* Full Name */}
                    <div>
                        <AnimatedLabel 
                            label="Full Name" 
                            isActive={activeField === 'fullName'}
                            htmlFor="fullName"
                        />
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            onFocus={() => handleFocus('fullName')}
                            onBlur={() => handleBlur('fullName')}
                            placeholder="Enter your full name"
                            required
                            className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-yellow)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                        />
                    </div>

                    {/* Email Address */}
                    <div>
                        <AnimatedLabel 
                            label="Email Address" 
                            isActive={activeField === 'email'}
                            htmlFor="email"
                        />
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => handleFocus('email')}
                            onBlur={() => handleBlur('email')}
                            placeholder="Enter your email address"
                            required
                            className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-yellow)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                        />
                    </div>

                    {/* Subject */}
                    <div className="relative">
                        <AnimatedLabel 
                            label="Subject" 
                            isActive={activeField === 'subject'}
                            htmlFor="subject"
                        />
                        <div className="relative">
                            <button
                                type="button"
                                id="subject"
                                onClick={() => {
                                    setIsDropdownOpen(!isDropdownOpen)
                                    handleSubjectFocus()
                                }}
                                onFocus={handleSubjectFocus}
                                onBlur={handleSubjectBlur}
                                className="subject-dropdown-trigger w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-yellow)] text-[var(--te-dark)] bg-[var(--te-white)] text-left flex items-center justify-between font-medium text-sm tracking-wide transition-colors"
                                aria-haspopup="listbox"
                                aria-expanded={isDropdownOpen}
                            >
                                <span className={formData.subject ? 'text-[var(--te-dark)]' : 'text-[var(--te-grey-300)]'}>
                                    {selectedSubject.label}
                                </span>
                                <ChevronDown 
                                    size={14} 
                                    className={`transition-transform duration-150 text-[var(--te-grey-400)] ${isDropdownOpen ? 'rotate-180' : ''}`} 
                                />
                            </button>
                            <input
                                type="hidden"
                                name="subject"
                                value={formData.subject}
                                required
                            />
                            <div 
                                ref={dropdownRef}
                                className="absolute top-full left-0 right-0 mt-1 z-50"
                                style={{ opacity: 0, pointerEvents: 'none', display: 'none' }}
                            >
                                <div 
                                    ref={dropdownMenuRef} 
                                    className="bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm py-1 overflow-visible min-w-full relative"
                                >
                                    {subjectOptions.map((option) => (
                                        option.value && (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => handleSubjectSelect(option.value)}
                                                className="dropdown-item relative block w-full text-left px-4 py-2 text-sm text-[var(--te-grey-400)] hover:text-[var(--te-dark)] hover:bg-[var(--te-cream)] transition-all duration-100 font-medium tracking-wide"
                                            >
                                                {option.label}
                                            </button>
                                        )
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Message */}
                    <div>
                        <AnimatedLabel 
                            label="Message" 
                            isActive={activeField === 'message'}
                            htmlFor="message"
                        />
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => handleFocus('message')}
                            onBlur={() => handleBlur('message')}
                            placeholder="Tell us how we can help you..."
                            required
                            rows={6}
                            className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-yellow)] resize-none text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                        />
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-[var(--te-yellow)] rounded-sm disabled:opacity-50 disabled:cursor-not-allowed text-[var(--te-dark)] font-bold tracking-widest uppercase text-xs hover:bg-[var(--te-yellow-light)] active:scale-[0.98] transition-all"
                            style={{ boxShadow: '0 3px 0 var(--te-yellow-dark)' }}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>

                    {/* Success Message */}
                    {submitStatus === 'success' && (
                        <div className="p-4 bg-[var(--te-cream)] border border-[var(--te-green)] rounded-sm text-[var(--te-dark)] text-sm font-medium">
                            <span className="inline-block w-2 h-2 rounded-full bg-[var(--te-green)] mr-2" style={{ boxShadow: '0 0 8px var(--te-green)' }} />
                            Thank you! Your message has been sent successfully. We'll get back to you soon.
                        </div>
                    )}
                </form>
            </div>
        </main>
    )
}
