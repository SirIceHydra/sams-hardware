'use client'

import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import { Zap, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CategoriesMarquee = ({ products }) => {
    const containerRef = useRef(null);
    const marqueeRef = useRef(null);
    const marqueeTweenRef = useRef(null);
    const itemsRef = useRef([]);
    const hoveredIndexRef = useRef(null);
    const centerIndexRef = useRef(-1); // Track the center item
    
    const allProducts = useSelector(state => state.product.list);
    const [randomProducts, setRandomProducts] = useState([]);
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'
    
    useEffect(() => {
        // Clear refs when products change
        itemsRef.current = [];
        centerIndexRef.current = -1;
        hoveredIndexRef.current = null;

        const source = Array.isArray(products) && products.length > 0 ? products : allProducts;
        if (!source || source.length === 0) {
            setRandomProducts([]);
            return;
        }
        if (typeof window === 'undefined') return;
        
        const baseList = Array.isArray(products) && products.length > 0
            ? products
            : [...source].sort(() => Math.random() - 0.5).slice(0, 10);
        
        const enriched = baseList.map(product => {
            const hasRegular = product.regularPrice !== undefined && product.regularPrice !== null;
            const hasSale = product.salePrice !== undefined && product.salePrice !== null;
            const onSale = product.onSale || (product.mrp && product.price < product.mrp);
            const regular = hasRegular ? product.regularPrice : (product.mrp || product.price);
            const current = onSale && hasSale ? product.salePrice : product.price;
            const salePercentage = regular > 0 && current < regular
                ? Math.round(((regular - current) / regular) * 100)
                : 0;
            return { ...product, salePercentage };
        });
        
        const filtered = enriched.filter(p => p.onSale || p.salePercentage > 0);
        setRandomProducts(filtered);
    }, [products, allProducts]);

    // Unified function to update styles based on both hover and center state
    const updateStyles = () => {
        itemsRef.current.forEach((el, idx) => {
            if (!el) return;
            
            const isHovered = idx === hoveredIndexRef.current;
            const isCenter = idx === centerIndexRef.current;
            
            // Priority: Hover > Center
            // If anything is hovered, only show the hovered item as active.
            // If nothing is hovered, show the center item as active.
            const anyHovered = hoveredIndexRef.current !== null;
            const isActive = anyHovered ? isHovered : isCenter;

            gsap.to(el, {
                scale: isActive ? 1.12 : 1,
                borderColor: isActive ? "var(--te-yellow)" : "var(--te-grey-300)",
                boxShadow: isActive 
                    ? "0 12px 40px rgba(248, 204, 40, 0.4), 0 0 0 2px var(--te-yellow)"
                    : "0 2px 8px rgba(0, 0, 0, 0.08)",
                duration: 0.3,
                overwrite: "auto",
            });
        });
    };

    useGSAP(() => {
        if (!marqueeRef.current || randomProducts.length === 0) return;
        
        const isMobile = window.innerWidth < 768;

        // 1. Marquee Animation
        const tween = gsap.to(marqueeRef.current, {
            xPercent: -50,
            repeat: -1,
            ease: "none",
            duration: 25,
        });

        marqueeTweenRef.current = tween;

        // 2. Center Detection Loop (Desktop Only)
        const checkCenter = () => {
            if (!containerRef.current) return;
            
            const containerRect = containerRef.current.getBoundingClientRect();
            const containerCenter = containerRect.left + containerRect.width / 2;
            
            let closestIndex = -1;
            let minDistance = Infinity;

            itemsRef.current.forEach((el, idx) => {
                if (!el) return;
                
                const rect = el.getBoundingClientRect();
                
                // Skip items completely out of view to optimize
                if (rect.right < containerRect.left || rect.left > containerRect.right) return;

                const itemCenter = rect.left + rect.width / 2;
                const distance = Math.abs(containerCenter - itemCenter);
                
                if (distance < minDistance) {
                    minDistance = distance;
                    closestIndex = idx;
                }
            });

            // Update if the center item has changed
            if (closestIndex !== -1 && closestIndex !== centerIndexRef.current) {
                centerIndexRef.current = closestIndex;
                updateStyles();
            }
        };

        // Add to GSAP ticker for smooth updates only on desktop
        if (!isMobile) {
            gsap.ticker.add(checkCenter);
        }
        
        return () => {
             tween.kill();
             if (!isMobile) {
                 gsap.ticker.remove(checkCenter);
             }
        };
    }, [randomProducts]);

    const handleItemMouseEnter = (index) => {
        if (window.innerWidth < 768) return;
        hoveredIndexRef.current = index;
        updateStyles();
        if (marqueeTweenRef.current) {
            gsap.to(marqueeTweenRef.current, { timeScale: 0.3, duration: 0.3 });
        }
    };

    const handleItemMouseLeave = () => {
        if (window.innerWidth < 768) return;
        hoveredIndexRef.current = null;
        updateStyles();

        if (marqueeTweenRef.current) {
            gsap.to(marqueeTweenRef.current, { timeScale: 1, duration: 0.3 });
        }
    };

    return (
        <div
            ref={containerRef}
            className="overflow-x-hidden overflow-y-visible w-full relative select-none py-8 sm:py-12 scrollbar-hide"
        >
            {/* Gradient fades */}
            <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-r from-[var(--te-dark)] to-transparent" />
            <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 z-20 pointer-events-none bg-gradient-to-l from-[var(--te-dark)] to-transparent" />
            
            <div className="relative w-full overflow-x-hidden overflow-y-visible scrollbar-hide" style={{ paddingTop: '6%', paddingBottom: '6%', marginTop: '-6%', marginBottom: '-6%' }}>
                <div
                    ref={marqueeRef}
                    className="flex flex-nowrap min-w-[200%] gap-6 sm:gap-8 items-center relative z-10"
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
                                <div className="absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 bg-[var(--te-yellow)] text-[var(--te-dark)]">
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
                                            {currency}{(product.onSale && product.salePrice ? product.salePrice : product.price)?.toLocaleString()}
                                        </span>
                                        {(() => {
                                            const regular = product.regularPrice ?? product.mrp;
                                            const current = product.onSale && product.salePrice ? product.salePrice : product.price;
                                            return regular && regular > current ? (
                                                <span className="text-xs text-[var(--te-grey-400)] line-through font-[family-name:var(--font-jetbrains)]">
                                                    {currency}{regular?.toLocaleString()}
                                                </span>
                                            ) : null;
                                        })()}
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
