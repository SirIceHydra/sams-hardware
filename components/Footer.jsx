'use client'
import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Zap } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const pathname = usePathname();
    const footerRef = useRef(null);
    const linksRef = useRef(null);

    const MailIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.6654 4.66699L8.67136 8.48499C8.46796 8.60313 8.23692 8.66536 8.0017 8.66536C7.76647 8.66536 7.53544 8.60313 7.33203 8.48499L1.33203 4.66699M2.66536 2.66699H13.332C14.0684 2.66699 14.6654 3.26395 14.6654 4.00033V12.0003C14.6654 12.7367 14.0684 13.3337 13.332 13.3337H2.66536C1.92898 13.3337 1.33203 12.7367 1.33203 12.0003V4.00033C1.33203 3.26395 1.92898 2.66699 2.66536 2.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const PhoneIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M9.22003 11.045C9.35772 11.1082 9.51283 11.1227 9.65983 11.086C9.80682 11.0493 9.93692 10.9636 10.0287 10.843L10.2654 10.533C10.3896 10.3674 10.5506 10.233 10.7357 10.1404C10.9209 10.0479 11.125 9.99967 11.332 9.99967H13.332C13.6857 9.99967 14.0248 10.1402 14.2748 10.3902C14.5249 10.6402 14.6654 10.9794 14.6654 11.333V13.333C14.6654 13.6866 14.5249 14.0258 14.2748 14.2758C14.0248 14.5259 13.6857 14.6663 13.332 14.6663C10.1494 14.6663 7.09719 13.4021 4.84675 11.1516C2.59631 8.90119 1.33203 5.84894 1.33203 2.66634C1.33203 2.31272 1.47251 1.97358 1.72256 1.72353C1.9726 1.47348 2.31174 1.33301 2.66536 1.33301H4.66536C5.01899 1.33301 5.35812 1.47348 5.60817 1.72353C5.85822 1.97358 5.9987 2.31272 5.9987 2.66634V4.66634C5.9987 4.87333 5.9505 5.07749 5.85793 5.26263C5.76536 5.44777 5.63096 5.60881 5.46536 5.73301L5.15336 5.96701C5.03098 6.06046 4.94471 6.1934 4.90923 6.34324C4.87374 6.49308 4.89122 6.65059 4.9587 6.78901C5.86982 8.63959 7.36831 10.1362 9.22003 11.045Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const MapPinIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66634C13.3346 9.99501 9.64197 13.4617 8.40197 14.5323C8.28645 14.6192 8.14583 14.6662 8.0013 14.6662C7.85677 14.6662 7.71615 14.6192 7.60064 14.5323C6.36064 13.4617 2.66797 9.99501 2.66797 6.66634C2.66797 5.25185 3.22987 3.8953 4.23007 2.89511C5.23026 1.89491 6.58681 1.33301 8.0013 1.33301C9.41579 1.33301 10.7723 1.89491 11.7725 2.89511C12.7727 3.8953 13.3346 5.25185 13.3346 6.66634Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M8.0013 8.66634C9.10587 8.66634 10.0013 7.77091 10.0013 6.66634C10.0013 5.56177 9.10587 4.66634 8.0013 4.66634C6.89673 4.66634 6.0013 5.56177 6.0013 6.66634C6.0013 7.77091 6.89673 8.66634 8.0013 8.66634Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const ClockIcon = () => (<svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><path d="M8 4.5V8L10.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>)
    const FacebookIcon = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.9987 1.66699H12.4987C11.3936 1.66699 10.3338 2.10598 9.55242 2.88738C8.77102 3.66878 8.33203 4.72859 8.33203 5.83366V8.33366H5.83203V11.667H8.33203V18.3337H11.6654V11.667H14.1654L14.9987 8.33366H11.6654V5.83366C11.6654 5.61265 11.7532 5.40068 11.9094 5.2444C12.0657 5.08812 12.2777 5.00033 12.4987 5.00033H14.9987V1.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const InstagramIcon = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M14.5846 5.41699H14.593M5.83464 1.66699H14.168C16.4692 1.66699 18.3346 3.53247 18.3346 5.83366V14.167C18.3346 16.4682 16.4692 18.3337 14.168 18.3337H5.83464C3.53345 18.3337 1.66797 16.4682 1.66797 14.167V5.83366C1.66797 3.53247 3.53345 1.66699 5.83464 1.66699ZM13.3346 9.47533C13.4375 10.1689 13.319 10.8772 12.9961 11.4995C12.6732 12.1218 12.1623 12.6265 11.536 12.9417C10.9097 13.2569 10.2 13.3667 9.50779 13.2553C8.81557 13.1439 8.1761 12.8171 7.68033 12.3213C7.18457 11.8255 6.85775 11.1861 6.74636 10.4938C6.63497 9.80162 6.74469 9.0919 7.05991 8.46564C7.37512 7.83937 7.87979 7.32844 8.50212 7.00553C9.12445 6.68261 9.83276 6.56415 10.5263 6.66699C11.2337 6.7719 11.8887 7.10154 12.3944 7.60725C12.9001 8.11295 13.2297 8.76789 13.3346 9.47533Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const TwitterIcon = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.3346 3.33368C18.3346 3.33368 17.7513 5.08368 16.668 6.16701C18.0013 14.5003 8.83464 20.5837 1.66797 15.8337C3.5013 15.917 5.33464 15.3337 6.66797 14.167C2.5013 12.917 0.417969 8.00034 2.5013 4.16701C4.33464 6.33368 7.16797 7.58368 10.0013 7.50034C9.2513 4.00034 13.3346 2.00034 15.8346 4.33368C16.7513 4.33368 18.3346 3.33368 18.3346 3.33368Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)
    const LinkedinIcon = () => (<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M13.3346 6.66699C14.6607 6.66699 15.9325 7.19378 16.8702 8.13146C17.8079 9.06914 18.3346 10.3409 18.3346 11.667V17.5003H15.0013V11.667C15.0013 11.225 14.8257 10.801 14.5131 10.4885C14.2006 10.1759 13.7767 10.0003 13.3346 10.0003C12.8926 10.0003 12.4687 10.1759 12.1561 10.4885C11.8436 10.801 11.668 11.225 11.668 11.667V17.5003H8.33464V11.667C8.33464 10.3409 8.86142 9.06914 9.7991 8.13146C10.7368 7.19378 12.0086 6.66699 13.3346 6.66699Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M5.0013 7.50033H1.66797V17.5003H5.0013V7.50033Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> <path d="M3.33464 5.00033C4.25511 5.00033 5.0013 4.25413 5.0013 3.33366C5.0013 2.41318 4.25511 1.66699 3.33464 1.66699C2.41416 1.66699 1.66797 2.41318 1.66797 3.33366C1.66797 4.25413 2.41416 5.00033 3.33464 5.00033Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /> </svg>)

    const linkSections = [
        {
            title: "COMPANY",
            links: [
                { text: "Home", path: '/' },
                { text: "Shop", path: '/shop' },
                { text: "About", path: '/about' },
                { text: "Contact", path: '/contact' },
            ]
        },
        {
            title: "ADDRESS",
            links: [
                { text: "49b Grant Avenue, Norwood", path: '#', icon: MapPinIcon },
                { text: "Johannesburg, 2192", path: '#', icon: MapPinIcon }
            ]
        },
        {
            title: "WORKING HOURS",
            links: [
                { text: "Mon–Sat: 08:00–20:00", path: '#', icon: ClockIcon },
                { text: "Sun: 08:00–15:00", path: '#', icon: ClockIcon }
            ]
        },
        {
            title: "CONTACT",
            links: [
                { text: "0712492206", path: 'tel:+27712492206', icon: PhoneIcon },
                { text: "samshardwareza@gmail.com", path: 'mailto:samshardwareza@gmail.com', icon: MailIcon }
            ]
        }
    ];

    const socialIcons = [
        { icon: FacebookIcon, link: "https://www.facebook.com", label: "Facebook" },
        { icon: InstagramIcon, link: "https://www.instagram.com", label: "Instagram" },
        { icon: TwitterIcon, link: "https://twitter.com", label: "Twitter" },
        { icon: LinkedinIcon, link: "https://www.linkedin.com", label: "LinkedIn" },
    ]

    // Scroll-triggered reveal animation (desktop only)
    useEffect(() => {
        // CRITICAL: Always ensure content is visible immediately on mount and route changes
        const ensureVisibility = () => {
            if (linksRef.current) {
                const sections = linksRef.current.querySelectorAll('.footer-section');
                // Force visibility with immediate style application
                sections.forEach(section => {
                    gsap.set(section, { 
                        y: 0, 
                        opacity: 1,
                        clearProps: 'all',
                        immediateRender: true
                    });
                    // Also set inline style as fallback
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                });
            }
        };
        
        // Run immediately
        ensureVisibility();
        
        // Also run after a tiny delay to ensure DOM is ready
        const timeoutId = setTimeout(ensureVisibility, 0);
        
        // Skip scroll animations on mobile - just show content
        const isMobile = window.innerWidth < 768
        if (isMobile) {
            return () => clearTimeout(timeoutId);
        }
        
        if (footerRef.current && linksRef.current) {
            const sections = linksRef.current.querySelectorAll('.footer-section');
            
            // Kill any existing ScrollTriggers for these sections
            ScrollTrigger.getAll().forEach(trigger => {
                if (sections.length > 0 && Array.from(sections).includes(trigger.trigger)) {
                    trigger.kill();
                }
            });
            
            // Ensure content is visible first (before any animation)
            gsap.set(sections, { 
                y: 0, 
                opacity: 1,
                clearProps: 'all',
                immediateRender: true
            });
            
            // Refresh ScrollTrigger to recalculate positions
            ScrollTrigger.refresh();
            
            // Then animate on scroll (only if scrolling into view)
            const triggers = gsap.utils.toArray(sections).map((section) => {
                return gsap.fromTo(section,
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1,
                        duration: 0.6,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 95%',
                            toggleActions: 'play none none none',
                            once: true,
                            // Don't hide if already in view
                            onEnter: () => {
                                gsap.set(section, { opacity: 1, y: 0 });
                            }
                        }
                    }
                );
            });
            
            return () => {
                clearTimeout(timeoutId);
                triggers.forEach(trigger => {
                    if (trigger && trigger.scrollTrigger) {
                        trigger.scrollTrigger.kill();
                    }
                    trigger?.kill?.();
                });
            }
        }
        
        return () => clearTimeout(timeoutId);
    }, [pathname]) // Re-run on route changes - pathname is always a string (array size is constant)

    return (
        <footer ref={footerRef} className="bg-[var(--te-dark)] relative overflow-hidden">
            {/* Background texture */}
            <div 
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
                        linear-gradient(var(--te-grey-400) 1px, transparent 1px),
                        linear-gradient(90deg, var(--te-grey-400) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px'
                }}
            />
            
            {/* Yellow accent bar at top */}
            <div className="h-1 bg-[var(--te-yellow)]" />
            
            {/* Decorative corner elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[var(--te-yellow)]/20" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-[var(--te-yellow)]/20" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                {/* Main footer content */}
                <div ref={linksRef} className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 py-16 border-b border-[var(--te-grey-500)]">
                    
                    {/* Brand column */}
                    <div className="footer-section w-full lg:w-auto lg:max-w-xs">
                        {/* Original Logo */}
                        <Link href="/" className="block mb-6 group">
                            <Image 
                                src="/whiteLogo.svg" 
                                alt="Sam's Hardware" 
                                width={200} 
                                height={60}
                                className="h-12 sm:h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                            />
                        </Link>
                        
                        <p className="text-base text-[var(--te-grey-400)] leading-relaxed mb-8">
                            Your ultimate destination for professional-grade tools, reliable hardware, 
                            and smart home technology. Building trust with every tool since 1985.
                        </p>
                        
                        {/* Social icons */}
                        <div className="flex items-center gap-3">
                            {socialIcons.map((item, i) => (
                                <Link 
                                    href={item.link} 
                                    key={i}
                                    aria-label={item.label}
                                    className="flex items-center justify-center w-11 h-11 bg-[var(--te-charcoal)] border border-[var(--te-grey-500)] text-[var(--te-grey-400)] hover:bg-[var(--te-yellow)] hover:border-[var(--te-yellow)] hover:text-[var(--te-dark)] transition-all duration-300"
                                >
                                    <item.icon />
                                </Link>
                            ))}
                        </div>
                        
                        {/* Newsletter mini signup */}
                        <div className="mt-8 pt-8 border-t border-[var(--te-grey-500)]">
                            <p className="text-xs font-bold text-[var(--te-white)] tracking-widest uppercase mb-3">
                                Stay Updated
                            </p>
                            <div className="flex">
                                <input 
                                    type="email" 
                                    placeholder="YOUR EMAIL" 
                                    className="flex-1 bg-[var(--te-charcoal)] border-2 border-[var(--te-grey-500)] border-r-0 px-4 py-3 text-xs text-[var(--te-white)] placeholder-[var(--te-grey-500)] tracking-widest focus:outline-none focus:border-[var(--te-yellow)]"
                                />
                                <button className="px-4 bg-[var(--te-yellow)] text-[var(--te-dark)] hover:bg-[var(--te-yellow-light)] transition-colors">
                                    <Zap size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    {/* Links columns */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 w-full lg:w-auto gap-8 sm:gap-12">
                        {linkSections.map((section, index) => (
                            <div key={index} className="footer-section">
                                <h3 className="text-sm font-bold text-[var(--te-yellow)] mb-6 tracking-[0.2em] uppercase flex items-center gap-2">
                                    <span className="w-2 h-2 bg-[var(--te-yellow)]" />
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <Link 
                                                href={link.path} 
                                                className="group flex items-start gap-2 text-base text-[var(--te-grey-400)] hover:text-[var(--te-white)] transition-colors"
                                            >
                                                {link.icon && <div className="mt-1 shrink-0"><link.icon /></div>}
                                                <span className="relative break-words max-w-[160px] sm:max-w-full">
                                                    {link.text}
                                                    <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[var(--te-yellow)] group-hover:w-full transition-all duration-300" />
                                                </span>
                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 mt-1 shrink-0 -translate-y-1 translate-x-1 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-[var(--te-yellow)]" />
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Bottom bar - LARGER TEXT */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
                        {/* LED indicator */}
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[var(--te-green)] shadow-[0_0_8px_rgba(0,200,83,0.6)] animate-pulse" />
                            <span className="text-xs text-[var(--te-grey-500)] tracking-widest uppercase font-[family-name:var(--font-jetbrains)]">
                                Online
                            </span>
                        </div>
                        <span className="text-[var(--te-grey-500)] hidden sm:block">|</span>
                        <p className="text-xs text-[var(--te-grey-500)] tracking-widest uppercase text-center sm:text-left">
                            © 2025 Sam's Hardware. All Rights Reserved.
                        </p>
                        <span className="text-[var(--te-grey-500)] hidden sm:block">|</span>
                        <p className="text-xs text-[var(--te-grey-500)] tracking-widest uppercase text-center sm:text-left">
                            Designed and developed by{' '}
                            <Link href="https://kaizentech.co.za/" className="hover:text-[var(--te-yellow)] transition-colors">
                                Kaizen Technology
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
                        <Link href="/terms" className="text-xs text-[var(--te-grey-500)] hover:text-[var(--te-yellow)] font-medium tracking-widest uppercase transition-colors">
                            Terms
                        </Link>
                        <Link href="/privacy" className="text-xs text-[var(--te-grey-500)] hover:text-[var(--te-yellow)] font-medium tracking-widest uppercase transition-colors">
                            Privacy
                        </Link>
                        <Link href="/cookies" className="text-xs text-[var(--te-grey-500)] hover:text-[var(--te-yellow)] font-medium tracking-widest uppercase transition-colors">
                            Cookies
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
