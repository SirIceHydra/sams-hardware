'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSelector } from "react-redux"

function ShopContent() {

    const searchParams = useSearchParams()
    const search = searchParams.get('search')
    const router = useRouter()

    const products = useSelector(state => state.product.list)

    const filteredProducts = search
        ? products.filter(product =>
            product.name.toLowerCase().includes(search.toLowerCase())
        )
        : products;

    return (
        <div className="min-h-[70vh] mx-4 sm:mx-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div 
                    onClick={() => router.push('/shop')} 
                    className="flex items-center gap-3 my-6 pb-4 border-b border-[var(--te-grey-200)] cursor-pointer group"
                >
                    {search && <MoveLeftIcon size={16} className="text-[var(--te-orange)] group-hover:text-[var(--te-dark)] transition-colors" />}
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">
                        {search ? (
                            <>Results for "<span className="text-[var(--te-orange)]">{search}</span>"</>
                        ) : (
                            'All Products'
                        )}
                    </h1>
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase bg-[var(--te-cream)] px-2 py-1 rounded-sm border border-[var(--te-grey-200)] font-[family-name:var(--font-jetbrains)]">
                        {filteredProducts.length}
                    </span>
                </div>
                
                {/* Products grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
                    {filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
                
                {/* Empty state */}
                {filteredProducts.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-20 text-[var(--te-grey-300)]">
                        <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="m21 21-4.3-4.3"/>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">No Products Found</h2>
                        <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">Try a different search term</p>
                    </div>
                )}
            </div>
        </div>
    )
}


export default function Shop() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[var(--te-orange)] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase">Loading</span>
                </div>
            </div>
        }>
            <ShopContent />
        </Suspense>
    );
}
