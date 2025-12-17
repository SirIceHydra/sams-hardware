'use client'

import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Zap, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CategoriesMarquee = () => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeTweenRef = useRef(null);
    const itemsRef = useRef([]);
    const hoveredIndexRef = useRef(null);
    const lastActiveIndexRef = useRef(-1);
    const rafIdRef = useRef(null);
    const lastCheckTimeRef = useRef(0);
    const THROTTLE_MS = 100;

    const allProducts = useSelector(state => state.product.list);
    const [randomProducts, setRandomProducts] = useState([]);
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'
    
    useEffect(() => {
        if (!allProducts || allProducts.length === 0) {
            setRandomProducts([]);
            return;
        }
        
        if (typeof window === 'undefined') return;
        
        const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
        const products = shuffled.slice(0, 10).map(product => ({
            ...product,
            salePercentage: Math.floor(Math.random() * 30) + 10
        }));
        
        setRandomProducts(products);
    }, [allProducts]);

    const updateHighlight = (activeIndex) => {
        if (!itemsRef.current.length || activeIndex === lastActiveIndexRef.current) return;
        
        lastActiveIndexRef.current = activeIndex;

        itemsRef.current.forEach((el, idx) => {
            if (!el) return;
            const isActive = idx === activeIndex;
            const isNeighbor = Math.abs(idx - activeIndex) === 1;

            gsap.to(el, {
                scale: isActive ? 1.12 : isNeighbor ? 0.95 : 1,
                borderColor: isActive ? "var(--te-yellow)" : "var(--te-grey-300)",
                boxShadow: isActive 
                    ? "0 12px 40px rgba(248, 204, 40, 0.4), 0 0 0 2px var(--te-yellow)" 
                    : "0 2px 8px rgba(0, 0, 0, 0.08)",
                duration: 0.2,
                overwrite: "auto",
            });
        });
    };

    const checkHighlight = () => {
        const now = Date.now();
        
        if (now - lastCheckTimeRef.current < THROTTLE_MS) {
            rafIdRef.current = requestAnimationFrame(checkHighlight);
            return;
        }
        
        lastCheckTimeRef.current = now;

        if (!itemsRef.current.length || typeof window === "undefined") {
            rafIdRef.current = requestAnimationFrame(checkHighlight);
            return;
        }

        const viewportCenter = window.innerWidth / 2;

        let closestIndex = -1;
        let closestDistance = Infinity;

        itemsRef.current.forEach((el, idx) => {
            if (!el) return;
            const rect = el.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const distance = Math.abs(centerX - viewportCenter);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = idx;
            }
        });

        const activeIndex =
            hoveredIndexRef.current !== null ? hoveredIndexRef.current : closestIndex;

        updateHighlight(activeIndex);
        
        rafIdRef.current = requestAnimationFrame(checkHighlight);
    };

    useGSAP(() => {
        if (!marqueeRef.current || randomProducts.length === 0) return;

        const tween = gsap.to(marqueeRef.current, {
            xPercent: -50,
            repeat: -1,
            ease: "none",
            duration: 25,
        });

        marqueeTweenRef.current = tween;
        
        rafIdRef.current = requestAnimationFrame(checkHighlight);
        
        return () => {
            if (rafIdRef.current) {
                cancelAnimationFrame(rafIdRef.current);
            }
        };
    }, [randomProducts]);

    const handleItemMouseEnter = (index) => {
        hoveredIndexRef.current = index;
        updateHighlight(index);
        if (marqueeTweenRef.current) {
            gsap.to(marqueeTweenRef.current, { timeScale: 0.3, duration: 0.3 });
        }
    };

    const handleItemMouseLeave = () => {
        hoveredIndexRef.current = null;
        if (marqueeTweenRef.current) {
            gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.3 });
        }
    };

    return (
        <div
            ref={containerRef}
            className="overflow-x-hidden overflow-y-visible w-full relative select-none py-8 sm:py-12"
        >
            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-r from-[var(--te-dark)] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-l from-[var(--te-dark)] to-transparent" />
            
            <div className="relative w-full">
                <div
                    ref={marqueeRef}
                    className="flex min-w-[200%] gap-6 sm:gap-8 items-center relative z-10"
                >
                    {randomProducts.length > 0 && [...randomProducts, ...randomProducts, ...randomProducts, ...randomProducts].map((product, index) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={`${product.id}-${index}`}
                            className="flex-shrink-0"
                        >
                            <div
                                ref={el => itemsRef.current[index] = el}
                                onMouseEnter={() => handleItemMouseEnter(index)}
                                onMouseLeave={handleItemMouseLeave}
                                className="relative w-36 sm:w-44 md:w-52 bg-[var(--te-white)] border-2 border-[var(--te-grey-300)] overflow-hidden cursor-pointer transition-all duration-200 group"
                            >
                                {/* Yellow accent bar */}
                                <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-yellow)] z-10" />
                                
                                {/* Sale badge */}
                                <div className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 bg-[var(--te-yellow)] text-[var(--te-dark)]">
                                    <Zap size={10} />
                                    <span className="text-[9px] font-bold font-[family-name:var(--font-jetbrains)] tracking-wider">
                                        -{product.salePercentage}%
                                    </span>
                                </div>
                                
                                {/* Product image */}
                                <div className="relative w-full aspect-square bg-[var(--te-bone)] flex items-center justify-center p-6">
                                    {product.images && product.images[0] && (
                                        <Image
                                            src={product.images[0]}
                                            alt={product.name || 'Product'}
                                            width={200}
                                            height={200}
                                            className="object-contain max-h-full w-auto group-hover:scale-110 transition-transform duration-300"
                                        />
                                    )}
                                    
                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-[var(--te-dark)]/0 group-hover:bg-[var(--te-dark)]/20 transition-colors flex items-center justify-center">
                                        <div className="w-10 h-10 bg-[var(--te-yellow)] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                                            <ArrowUpRight size={18} className="text-[var(--te-dark)]" />
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Product info */}
                                <div className="p-4 border-t border-[var(--te-grey-200)]">
                                    <h4 className="text-xs font-bold text-[var(--te-dark)] uppercase tracking-wide truncate group-hover:text-[var(--te-yellow)] transition-colors">
                                        {product.name}
                                    </h4>
                                    <div className="flex items-baseline gap-2 mt-2">
                                        <span className="text-lg font-black text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">
                                            {currency}{product.price?.toLocaleString()}
                                        </span>
                                        {product.mrp && product.mrp > product.price && (
                                            <span className="text-xs text-[var(--te-grey-400)] line-through font-[family-name:var(--font-jetbrains)]">
                                                {currency}{product.mrp?.toLocaleString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Corner accents */}
                                <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors" />
                                <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-[var(--te-grey-300)] group-hover:border-[var(--te-yellow)] transition-colors" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoriesMarquee;
