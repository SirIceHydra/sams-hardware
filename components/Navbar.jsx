'use client'
import { Search, ShoppingCart, ChevronDown, Menu, X, Zap, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useShop } from "@/shop/core/ShopProvider";
import { useCategories } from "@/shop/core/hooks/useCategories";
import { useProducts } from "@/shop/core/hooks/useProducts";

gsap.registerPlugin(useGSAP);

const Navbar = () => {
    const router = useRouter();
    const pathname = usePathname();

    const { categories, loading, fetchCategories } = useCategories()
    const { products: searchResults, loading: isSearching, fetchProducts: searchProducts } = useProducts()

    const [search, setSearch] = useState('')
    const [showResults, setShowResults] = useState(false)
    const [isShopHovered, setIsShopHovered] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMobileShopOpen, setIsMobileShopOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { cart } = useShop()
    const cartCount = cart.itemCount

    const navbarRef = useRef(null)
    const searchContainerRef = useRef(null)
    const dropdownRef = useRef(null)
    const dropdownMenuRef = useRef(null)
    const mobileMenuRef = useRef(null)
    const isDropdownVisibleRef = useRef(false)
    const isDropdownInitializedRef = useRef(false)
    const linkRefs = useRef([])
    const shopLinkRef = useRef(null)
    const hoverTimeoutRef = useRef(null)
    const mouseTrackingRef = useRef({ x: 0, y: 0 })
    
    // Track mouse position globally
    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseTrackingRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);
    
    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (hoverTimeoutRef.current) {
                clearTimeout(hoverTimeoutRef.current);
            }
        };
    }, [])

    useEffect(() => {
        fetchCategories({ hideEmpty: true })
    }, [fetchCategories])

    // Function to check if mouse is actually over link or menu
    const isMouseOverShopArea = () => {
        if (!shopLinkRef.current) return false;
        
        const linkRect = shopLinkRef.current.getBoundingClientRect();
        const mouse = mouseTrackingRef.current;
        
        const isOverLink = mouse.x >= linkRect.left && 
                          mouse.x <= linkRect.right &&
                          mouse.y >= linkRect.top && 
                          mouse.y <= linkRect.bottom;
        
        // Check if mouse is over any menu link (not the wrapper)
        // This prevents checking an invisible hover zone from the wrapper
        let isOverMenuLink = false;
        if (dropdownMenuRef.current && isDropdownVisibleRef.current) {
            const menuLinks = dropdownMenuRef.current.querySelectorAll('a');
            menuLinks.forEach(link => {
                const linkRect = link.getBoundingClientRect();
                if (mouse.x >= linkRect.left && 
                    mouse.x <= linkRect.right &&
                    mouse.y >= linkRect.top && 
                    mouse.y <= linkRect.bottom) {
                    isOverMenuLink = true;
                }
            });
        }
        
        return isOverLink || isOverMenuLink;
    };

    // Scroll detection for navbar background change
    useEffect(() => {
        const handleScroll = () => {
            // Mobile optimization: simpler check or debounce could be added if needed
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Check for mobile to optimize backdrop blur
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Staggered link animation on mount
    useEffect(() => {
        if (linkRefs.current.length > 0) {
            gsap.fromTo(linkRefs.current,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.2 }
            )
        }
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
        setIsMobileShopOpen(false)
    }, [pathname])

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    useEffect(() => {
        if (!mobileMenuRef.current) return

        if (isMobileMenuOpen) {
            gsap.fromTo(mobileMenuRef.current,
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 0.3, ease: 'power3.out' }
            )
            // Stagger menu items
            const menuItems = mobileMenuRef.current.querySelectorAll('.mobile-menu-item')
            gsap.fromTo(menuItems,
                { x: 30, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
            )
        } else {
            gsap.to(mobileMenuRef.current,
                { x: '100%', opacity: 0, duration: 0.2, ease: 'power2.in' }
            )
        }
    }, [isMobileMenuOpen])

    // Search debounce effect
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (search.trim()) {
                searchProducts({ search: search, perPage: 5 })
                setShowResults(true)
            } else {
                setShowResults(false)
            }
        }, 300)

        return () => clearTimeout(timeoutId)
    }, [search, searchProducts])

    // Close search results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setShowResults(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        router.push(`/shop?search=${search}`)
        setIsMobileMenuOpen(false)
        setShowResults(false)
    }

    // Dropdown animations
    useEffect(() => {
        if (!dropdownRef.current || !dropdownMenuRef.current || isDropdownInitializedRef.current) return

        gsap.set(dropdownRef.current, { opacity: 0, y: -12, scale: 0.95, pointerEvents: 'none' })
        const menuItems = dropdownMenuRef.current.querySelectorAll('a')
        if (menuItems.length > 0) {
            gsap.set(menuItems, { opacity: 0, x: -10, pointerEvents: 'none' })
        }
        isDropdownVisibleRef.current = false
        isDropdownInitializedRef.current = true
    }, [])

    useEffect(() => {
        if (!dropdownRef.current || !dropdownMenuRef.current) return

        if (!isDropdownInitializedRef.current) {
            gsap.set(dropdownRef.current, { opacity: 0, y: -12, scale: 0.95, pointerEvents: 'none' })
            return
        }

        // Add a small delay to prevent rapid toggling
        const timeoutId = setTimeout(() => {
            if (isShopHovered) {
                gsap.killTweensOf([dropdownRef.current, dropdownMenuRef.current.querySelectorAll('a')])

                // NEVER enable pointer events on the menu wrapper div
                // Only enable on the actual link elements inside
                const menuItems = dropdownMenuRef.current.querySelectorAll('a')
                
                // Keep menu wrapper pointerEvents as 'none' ALWAYS
                if (dropdownMenuRef.current) {
                    dropdownMenuRef.current.style.pointerEvents = 'none';
                }
                
                // Enable pointer events ONLY on the link elements
                menuItems.forEach(link => {
                    gsap.set(link, { pointerEvents: 'auto' })
                })

                gsap.to(dropdownRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.25,
                    ease: 'power3.out',
                    onComplete: () => { 
                        isDropdownVisibleRef.current = true;
                    }
                })

                gsap.to(menuItems, {
                    opacity: 1,
                    x: 0,
                    duration: 0.2,
                    stagger: 0.03,
                    ease: 'power2.out',
                    delay: 0.08
                })
            } else if (isDropdownVisibleRef.current) {
                gsap.killTweensOf([dropdownRef.current, dropdownMenuRef.current.querySelectorAll('a')])

                // IMMEDIATELY disable pointer events on everything
                const menuItems = dropdownMenuRef.current.querySelectorAll('a')
                menuItems.forEach(link => {
                    gsap.set(link, { pointerEvents: 'none' })
                })
                
                if (dropdownMenuRef.current) {
                    dropdownMenuRef.current.style.pointerEvents = 'none';
                }
                gsap.set(dropdownRef.current, { pointerEvents: 'none' });

                gsap.to(menuItems, { opacity: 0, x: -10, duration: 0.1, stagger: 0.02, ease: 'power2.in' })
                
                gsap.to(dropdownRef.current, {
                    opacity: 0,
                    y: -12,
                    scale: 0.95,
                    duration: 0.2,
                    ease: 'power2.in',
                    delay: 0.05,
                    onComplete: () => {
                        // Ensure everything is disabled
                        menuItems.forEach(link => {
                            gsap.set(link, { pointerEvents: 'none' })
                        })
                        gsap.set(dropdownRef.current, { pointerEvents: 'none' })
                        if (dropdownMenuRef.current) {
                            dropdownMenuRef.current.style.pointerEvents = 'none';
                        }
                        isDropdownVisibleRef.current = false
                    }
                })
            }
        }, 50)

        return () => clearTimeout(timeoutId)
    }, [isShopHovered])

    // Magnetic hover effect for nav links
    const handleLinkHover = (e, isEntering) => {
        const link = e.currentTarget
        const underline = link.querySelector('.nav-underline')
        
        if (isEntering) {
            gsap.to(underline, { scaleX: 1, duration: 0.3, ease: 'power2.out' })
            gsap.to(link, { y: -2, duration: 0.2, ease: 'power2.out' })
        } else {
            gsap.to(underline, { scaleX: 0, duration: 0.3, ease: 'power2.in' })
            gsap.to(link, { y: 0, duration: 0.2, ease: 'power2.in' })
        }
    }

    return (
        <nav 
            ref={navbarRef}
            className={`sticky top-0 left-0 right-0 z-[10000] transition-all duration-500 ${
                isScrolled 
                    ? (isMobile 
                        ? 'bg-[var(--te-dark)] shadow-md' // Mobile: Solid background, no blur for performance
                        : 'bg-[var(--te-dark)]/95 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.3)]') // Desktop: Blur effect
                    : 'bg-[var(--te-dark)]'
            }`}
        >
            <div className="mx-4 sm:mx-6">
                <div className="relative flex items-center justify-between max-w-7xl mx-auto py-4 transition-all">

                    {/* WHITE LOGO for dark navbar */}
                    <Link href="/" className="relative z-10 group">
                        <div className="relative">
                            <Image 
                                src="/whiteLogo.svg" 
                                alt="Sam's Hardware" 
                                width={180} 
                                height={50}
                                className="h-10 sm:h-12 w-auto transition-transform duration-300"
                                priority
                            />
                        </div>
                    </Link>

                    {/* Desktop Menu - LARGER TEXT */}
                    <div className="hidden lg:flex items-center gap-8 xl:gap-10 text-[var(--te-grey-200)] font-semibold relative z-[10001]">
                        {['Home', 'Shop', 'About', 'Contact'].map((item, i) => (
                            <div 
                                key={item}
                                ref={el => linkRefs.current[i] = el}
                                className="relative"
                            >
                                <Link 
                                    href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                                    ref={item === 'Shop' ? shopLinkRef : null}
                                    className="relative flex items-center gap-1.5 py-2 text-sm tracking-[0.15em] uppercase hover:text-[var(--te-yellow)] transition-colors"
                                    onMouseEnter={(e) => {
                                        handleLinkHover(e, true);
                                        if (item === 'Shop') {
                                            if (hoverTimeoutRef.current) {
                                                clearTimeout(hoverTimeoutRef.current);
                                            }
                                            setIsShopHovered(true);
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        handleLinkHover(e, false);
                                        if (item === 'Shop') {
                                            // Clear any existing timeout
                                            if (hoverTimeoutRef.current) {
                                                clearTimeout(hoverTimeoutRef.current);
                                            }
                                            // Use a shorter delay and check actual element under mouse
                                            hoverTimeoutRef.current = setTimeout(() => {
                                                // Get the element currently under the mouse
                                                const elementUnderMouse = document.elementFromPoint(
                                                    e.clientX || 0,
                                                    e.clientY || 0
                                                );
                                                
                                                // Check if mouse is over the link or menu
                                                const isOverLink = elementUnderMouse && shopLinkRef.current?.contains(elementUnderMouse);
                                                const isOverMenu = elementUnderMouse && dropdownMenuRef.current?.contains(elementUnderMouse);
                                                
                                                // Only hide if mouse is NOT over link or menu
                                                if (!isOverLink && !isOverMenu) {
                                                    setIsShopHovered(false);
                                                }
                                            }, 80);
                                        }
                                    }}
                                >
                                    {item}
                                    {item === 'Shop' && (
                                        <ChevronDown 
                                            size={14} 
                                            className={`transition-transform duration-200 ${isShopHovered ? 'rotate-180 text-[var(--te-yellow)]' : ''}`} 
                                        />
                                    )}
                                    <span className="nav-underline absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--te-yellow)] origin-left scale-x-0" />
                                </Link>

                                {/* Shop Dropdown */}
                                {item === 'Shop' && (
                                    <div
                                        ref={dropdownRef}
                                        className="absolute top-full left-0 w-56 z-[99999]"
                                        style={{ opacity: 0, pointerEvents: 'none' }}
                                    >
                                        {/* Invisible spacer to bridge gap - but not hoverable */}
                                        <div className="h-2 w-full pointer-events-none" />
                                        <div 
                                            ref={dropdownMenuRef} 
                                            className="bg-[var(--te-dark)] border-2 border-[var(--te-grey-500)] overflow-hidden relative mt-2"
                                            style={{ pointerEvents: 'none' }}
                                        >
                                            {/* Yellow accent bar */}
                                            <div className="h-1 bg-[var(--te-yellow)]" />
                                            
                                            <div className="py-2">
                                                {(categories || []).filter(c => !c.parent || c.parent === 0).slice(0, 12).map((category) => (
                                                    <Link
                                                        key={category.id}
                                                        href={`/shop?category=${category.id}`}
                                                        className="group relative flex items-center gap-3 px-5 py-3 text-xs tracking-wider text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-all duration-150"
                                                        style={{ pointerEvents: 'none' }}
                                                        onMouseEnter={() => {
                                                            if (hoverTimeoutRef.current) {
                                                                clearTimeout(hoverTimeoutRef.current);
                                                            }
                                                            setIsShopHovered(true);
                                                        }}
                                                        onMouseLeave={() => {
                                                            if (hoverTimeoutRef.current) {
                                                                clearTimeout(hoverTimeoutRef.current);
                                                            }
                                                            hoverTimeoutRef.current = setTimeout(() => {
                                                                if (!isMouseOverShopArea()) {
                                                                    setIsShopHovered(false);
                                                                }
                                                            }, 100);
                                                        }}
                                                    >
                                                        {/* LED indicator */}
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] group-hover:shadow-[0_0_8px_var(--te-yellow-glow)] transition-all" />
                                                        <span className="font-medium">{category.name}</span>
                                                        {/* Hover arrow */}
                                                        <span className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all text-[var(--te-yellow)]">→</span>
                                                    </Link>
                                                ))}
                                            </div>
                                            
                                            {/* View all link */}
                                            <div className="border-t border-[var(--te-grey-500)] px-5 py-3">
                                                <Link href="/shop" className="flex items-center gap-2 text-xs font-bold text-[var(--te-yellow)] hover:text-[var(--te-yellow-light)] tracking-wider transition-colors">
                                                    <Zap size={12} />
                                                    VIEW ALL PRODUCTS
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Search */}
                        <div ref={searchContainerRef} className="relative hidden xl:block w-56">
                            <form onSubmit={handleSearch} className="flex items-center text-xs gap-3 bg-[var(--te-charcoal)] px-4 py-3 border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] focus-within:border-[var(--te-yellow)] focus-within:shadow-[0_0_20px_rgba(248,204,40,0.15)] transition-all">
                                {isSearching ? (
                                    <Loader2 size={16} className="text-[var(--te-yellow)] animate-spin" />
                                ) : (
                                    <Search size={16} className="text-[var(--te-grey-400)]" />
                                )}
                                <input 
                                    className="w-full bg-transparent outline-none placeholder-[var(--te-grey-500)] text-[var(--te-white)] font-semibold tracking-widest" 
                                    type="text" 
                                    placeholder="SEARCH..." 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)}
                                    onFocus={() => {
                                        if (search.trim()) setShowResults(true)
                                    }}
                                />
                            </form>

                            {/* Search Results Dropdown */}
                            {showResults && search.trim() && (
                                <div className="absolute top-full left-0 right-0 mt-2 bg-[var(--te-dark)] border-2 border-[var(--te-grey-500)] shadow-xl z-[99999]">
                                    <div className="h-1 bg-[var(--te-yellow)]" />
                                    
                                    {isSearching ? (
                                        <div className="p-4 text-center text-[var(--te-grey-400)] text-xs">
                                            Searching...
                                        </div>
                                    ) : searchResults?.length > 0 ? (
                                        <div className="max-h-80 overflow-y-auto">
                                            {searchResults.map((product) => (
                                                <Link 
                                                    key={product.id} 
                                                    href={`/product/${product.id}`}
                                                    className="flex items-center gap-3 p-3 hover:bg-[var(--te-charcoal)] transition-colors border-b border-[var(--te-grey-500)] last:border-0 group"
                                                    onClick={() => {
                                                        setShowResults(false)
                                                        setSearch('')
                                                    }}
                                                >
                                                    {product.images?.[0] ? (
                                                        <div className="relative w-10 h-10 flex-shrink-0 bg-white p-0.5">
                                                            <Image 
                                                                src={product.images[0]} 
                                                                alt={product.name} 
                                                                fill
                                                                className="object-contain"
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div className="w-10 h-10 bg-[var(--te-grey-500)] flex items-center justify-center text-[var(--te-dark)]">
                                                            <Search size={14} />
                                                        </div>
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-xs text-[var(--te-white)] font-medium truncate group-hover:text-[var(--te-yellow)] transition-colors">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-[10px] text-[var(--te-grey-400)] mt-0.5">
                                                            R {parseFloat(product.price || 0).toFixed(2)}
                                                        </p>
                                                    </div>
                                                </Link>
                                            ))}
                                            <Link 
                                                href={`/shop?search=${search}`}
                                                className="block p-3 text-center text-xs font-bold text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-colors uppercase tracking-wider"
                                                onClick={() => setShowResults(false)}
                                            >
                                                View All Results
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="p-4 text-center text-[var(--te-grey-400)] text-xs">
                                            No results found
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Cart - LARGER TEXT */}
                        <Link 
                            href="/cart" 
                            className="relative group flex items-center gap-3 px-5 py-3 bg-[var(--te-yellow)] text-[var(--te-dark)] font-bold text-sm tracking-widest uppercase hover:bg-[var(--te-yellow-light)] active:scale-95 transition-all"
                            style={{ boxShadow: '0 4px 0 var(--te-yellow-dark)' }}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(4px)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <ShoppingCart size={16} strokeWidth={2.5} />
                            <span>Cart</span>
                            {cartCount > 0 && (
                                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 bg-[var(--te-dark)] text-[var(--te-white)] text-[10px] font-bold rounded-sm font-[family-name:var(--font-jetbrains)]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Menu Button & Cart */}
                    <div className="flex lg:hidden items-center gap-3">
                        <Link 
                            href="/cart" 
                            className="relative flex items-center justify-center w-10 h-10 bg-[var(--te-yellow)] text-[var(--te-dark)]"
                        >
                            <ShoppingCart size={18} strokeWidth={2.5} />
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-[var(--te-dark)] text-[var(--te-white)] text-[9px] font-bold font-[family-name:var(--font-jetbrains)]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="flex items-center justify-center w-10 h-10 text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] border-2 border-[var(--te-grey-500)] hover:border-[var(--te-yellow)] transition-all"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>

                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/80 backdrop-blur-sm z-[9998] lg:hidden transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <div
                ref={mobileMenuRef}
                className="fixed top-0 right-0 h-full w-[90%] max-w-md bg-[var(--te-dark)] z-[9999] lg:hidden overflow-y-auto"
                style={{ transform: 'translateX(100%)' }}
            >
                {/* Yellow accent bar */}
                <div className="h-1 bg-[var(--te-yellow)]" />
                
                <div className="p-6">
                    {/* Mobile Menu Header */}
                    <div className="flex items-center justify-between mb-8">
                        <Image 
                            src="/whiteLogo.svg" 
                            alt="Sam's Hardware" 
                            width={140} 
                            height={40}
                            className="h-8 w-auto"
                        />
                        <button
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center justify-center w-10 h-10 text-[var(--te-grey-300)] hover:text-[var(--te-yellow)] border border-[var(--te-grey-500)] transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Mobile Search */}
                    <form onSubmit={handleSearch} className="mobile-menu-item flex items-center gap-3 bg-[var(--te-charcoal)] px-4 py-4 border-2 border-[var(--te-grey-500)] mb-6">
                        <Search size={18} className="text-[var(--te-grey-400)]" />
                        <input
                            className="w-full bg-transparent outline-none placeholder-[var(--te-grey-500)] text-[var(--te-white)] font-semibold text-sm tracking-widest"
                            type="text"
                            placeholder="SEARCH PRODUCTS..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>

                    {/* Mobile Navigation Links */}
                    <nav className="space-y-1">
                        <Link
                            href="/"
                            className="mobile-menu-item group flex items-center gap-4 px-4 py-4 text-sm font-bold text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-colors tracking-widest uppercase"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="w-2 h-2 bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] transition-colors" />
                            Home
                        </Link>

                        {/* Shop with Departments */}
                        <div className="mobile-menu-item">
                            <button
                                onClick={() => setIsMobileShopOpen(!isMobileShopOpen)}
                                className="group flex items-center justify-between w-full px-4 py-4 text-sm font-bold text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-colors tracking-widest uppercase"
                            >
                                <span className="flex items-center gap-4">
                                    <span className="w-2 h-2 bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] transition-colors" />
                                    Shop
                                </span>
                                <ChevronDown size={18} className={`transition-transform duration-200 ${isMobileShopOpen ? 'rotate-180 text-[var(--te-yellow)]' : ''}`} />
                            </button>

                            <div className={`overflow-hidden transition-all duration-300 ${isMobileShopOpen ? 'max-h-[500px]' : 'max-h-0'}`}>
                                <div className="bg-[var(--te-charcoal)] border-l-4 border-[var(--te-yellow)] ml-4">
                                    <Link
                                        href="/shop"
                                        className="flex items-center gap-3 px-6 py-3 text-xs font-semibold text-[var(--te-yellow)] hover:bg-[var(--te-grey-500)]/30 transition-colors tracking-wider"
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Zap size={12} />
                                        ALL PRODUCTS
                                    </Link>
                                    {(categories || []).filter(c => !c.parent || c.parent === 0).slice(0, 12).map((category) => (
                                        <Link
                                            key={category.id}
                                            href={`/shop?category=${category.id}`}
                                            className="flex items-center gap-3 px-6 py-3 text-xs font-medium text-[var(--te-grey-300)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-grey-500)]/30 transition-colors tracking-wide"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            <span className="w-1 h-1 rounded-full bg-current" />
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Link
                            href="/about"
                            className="mobile-menu-item group flex items-center gap-4 px-4 py-4 text-sm font-bold text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-colors tracking-widest uppercase"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="w-2 h-2 bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] transition-colors" />
                            About
                        </Link>
                        <Link
                            href="/contact"
                            className="mobile-menu-item group flex items-center gap-4 px-4 py-4 text-sm font-bold text-[var(--te-grey-200)] hover:text-[var(--te-yellow)] hover:bg-[var(--te-charcoal)] transition-colors tracking-widest uppercase"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <span className="w-2 h-2 bg-[var(--te-grey-500)] group-hover:bg-[var(--te-yellow)] transition-colors" />
                            Contact
                        </Link>
                    </nav>

                    {/* Mobile Cart Link */}
                    <div className="mobile-menu-item mt-8 pt-6 border-t-2 border-[var(--te-grey-500)]">
                        <Link
                            href="/cart"
                            className="flex items-center justify-center gap-3 w-full py-4 text-sm font-bold text-[var(--te-dark)] bg-[var(--te-yellow)] hover:bg-[var(--te-yellow-light)] transition-colors tracking-widest uppercase"
                            style={{ boxShadow: '0 4px 0 var(--te-yellow-dark)' }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <ShoppingCart size={18} />
                            View Cart
                            {cartCount > 0 && (
                                <span className="flex items-center justify-center min-w-[24px] h-6 px-1.5 bg-[var(--te-dark)] text-[var(--te-white)] text-xs font-bold font-[family-name:var(--font-jetbrains)]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>
                    
                    {/* Decorative footer */}
                    <div className="mt-12 pt-6 border-t border-[var(--te-grey-500)]">
                        <p className="text-[10px] text-[var(--te-grey-500)] tracking-widest uppercase">
                            © 2025 Sam's Hardware
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
