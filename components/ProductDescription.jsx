'use client'
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const ProductDescription = ({ product }) => {

    const [selectedTab, setSelectedTab] = useState('Description')

    return (
        <div className="my-12 text-sm text-[var(--te-grey-400)]">

            {/* Tabs */}
            <div className="flex border-b border-[var(--te-grey-200)] mb-6 max-w-2xl">
                {['Description', 'Reviews'].map((tab, index) => (
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

            {/* Description */}
            {selectedTab === "Description" && (
                <div className="max-w-xl bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5">
                    <p className="text-[var(--te-dark)] font-medium leading-relaxed tracking-wide">{product.description}</p>
                </div>
            )}

            {/* Reviews - GREY BG */}
            {selectedTab === "Reviews" && (
                <div className="flex flex-col gap-4 mt-8">
                    {product.rating.length === 0 ? (
                        <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-6 text-center">
                            <p className="text-[var(--te-grey-400)] font-medium tracking-wide">No reviews yet</p>
                        </div>
                    ) : (
                        product.rating.map((item, index) => (
                            <div key={index} className="flex gap-4 bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5">
                                <Image src={item.user.image} alt="" className="w-10 h-10 rounded-full object-cover border border-[var(--te-grey-200)]" width={40} height={40} />
                                <div className="flex-1">
                                    {/* Rating - LED style dots */}
                                    <div className="flex gap-1 mb-2">
                                        {Array(5).fill('').map((_, i) => (
                                            <div 
                                                key={i} 
                                                className={`w-1.5 h-1.5 rounded-full ${item.rating >= i + 1 ? 'bg-[var(--te-green)]' : 'bg-[var(--te-grey-300)]'}`}
                                                style={item.rating >= i + 1 ? { boxShadow: '0 0 4px var(--te-green)' } : {}}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-[var(--te-dark)] font-medium leading-relaxed tracking-wide mb-3">{item.review}</p>
                                    <div className="flex items-center justify-between">
                                        <p className="font-semibold text-[var(--te-dark)] text-xs uppercase tracking-widest">{item.user.name}</p>
                                        <p className="text-[10px] text-[var(--te-grey-400)] tracking-wide">{new Date(item.createdAt).toDateString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}

            {/* Store Page */}
            <div className="flex gap-4 mt-10 p-5 bg-[var(--te-dark)] border border-[var(--te-grey-500)] rounded-sm">
                <Image src={product.store.logo} alt="" className="w-12 h-12 rounded-full object-cover border-2 border-[var(--te-grey-500)]" width={48} height={48} />
                <div>
                    <p className="font-medium text-[var(--te-grey-300)] text-xs tracking-wide">Product by <span className="text-[var(--te-white)]">{product.store.name}</span></p>
                    <Link href={`/shop/${product.store.username}`} className="inline-flex items-center gap-1.5 text-[var(--te-orange)] hover:text-[var(--te-orange-light)] text-xs font-semibold tracking-widest uppercase mt-1 transition-colors">
                        View Store <ArrowRight size={12} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
