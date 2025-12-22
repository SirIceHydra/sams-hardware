'use client'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import type { Product } from "@/shop/core/ports"

const ProductDescription = ({ product }: { product: Product }) => {

    const [selectedTab, setSelectedTab] = useState('Overview')

    // Handle store - API products might not have store
    const hasStore = product && 'store' in product && (product as any).store;

    // Get short description for Overview
    const overview = product.shortDescription || 'No overview available.';
    
    // Get full description for Description tab
    const description = product.description || 'No description available.';

    return (
        <div className="my-12 text-sm text-[var(--te-grey-400)]">

            {/* Tabs */}
            <div className="flex border-b border-[var(--te-grey-200)] mb-6 max-w-2xl">
                {['Overview', 'Description'].map((tab, index) => (
                    <button 
                        className={`px-4 py-2.5 text-xs font-semibold tracking-widest uppercase transition-all ${
                            tab === selectedTab 
                                ? 'text-[var(--te-dark)] border-b-2 border-[var(--te-orange)]' 
                                : 'text-[var(--te-grey-300)] hover:text-[var(--te-grey-400)]'
                        }`} 
                        key={index} 
                        onClick={() => setSelectedTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Overview - Short Description */}
            {selectedTab === "Overview" && (
                <div className="max-w-xl bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5">
                    <div 
                        className="text-[var(--te-dark)] font-medium leading-relaxed tracking-wide"
                        dangerouslySetInnerHTML={{ __html: overview }}
                    />
                </div>
            )}

            {/* Description - Full Description */}
            {selectedTab === "Description" && (
                <div className="max-w-xl bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5">
                    <div 
                        className="text-[var(--te-dark)] font-medium leading-relaxed tracking-wide"
                        dangerouslySetInnerHTML={{ __html: description }}
                    />
                </div>
            )}

            {/* Store Page - Only show if store data exists */}
            {hasStore && (product as any).store && (
                <div className="flex gap-4 mt-10 p-5 bg-[var(--te-dark)] border border-[var(--te-grey-500)] rounded-sm">
                    {(product as any).store.logo && (
                        <Image src={(product as any).store.logo} alt={(product as any).store.name} className="w-12 h-12 rounded-full object-cover border-2 border-[var(--te-grey-500)]" width={48} height={48} />
                    )}
                    <div>
                        <p className="font-medium text-[var(--te-grey-300)] text-xs tracking-wide">Product by <span className="text-[var(--te-white)]">{(product as any).store.name}</span></p>
                        {(product as any).store.username && (
                            <Link href={`/shop/${(product as any).store.username}`} className="inline-flex items-center gap-1.5 text-[var(--te-orange)] hover:text-[var(--te-orange-light)] text-xs font-semibold tracking-widest uppercase mt-1 transition-colors">
                                View Store <ArrowRight size={12} />
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDescription
