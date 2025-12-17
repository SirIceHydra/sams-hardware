'use client'
import { Suspense } from "react"
import ProductCard from "@/components/ProductCard"
import { MoveLeftIcon } from "lucide-react"
import { useRouter, useParams } from "next/navigation"
import { useSelector } from "react-redux"
import AnimatedTitle from "@/components/AnimatedTitle"


function DepartmentContent() {
    const params = useParams()
    const router = useRouter()
    const products = useSelector(state => state.product.list)

    // Decode department name from URL
    const departmentUrlName = params.departmentName 
        ? decodeURIComponent(params.departmentName).replace(/-/g, ' ').toLowerCase()
        : ''

    // Map department URL names to display names and categories
    const departmentMap = {
        'general hardware': { displayName: 'General hardware', category: 'Hand Tools' },
        'building materials': { displayName: 'Building materials', category: 'Hand Tools' },
        'lighting': { displayName: 'Lighting', category: 'Electrical' },
        'electrical': { displayName: 'Electrical', category: 'Electrical' },
        'paint': { displayName: 'Paint', category: 'Hand Tools' },
        'plumbing': { displayName: 'Plumbing', category: 'Plumbing' },
        'handtools': { displayName: 'Handtools', category: 'Hand Tools' },
        'powertools': { displayName: 'Powertools', category: 'Power Tools' }
    }

    // Get department info or use fallback
    const departmentInfo = departmentMap[departmentUrlName] || {
        displayName: departmentUrlName
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ') || 'Department',
        category: departmentUrlName || ''
    }

    const displayName = departmentInfo.displayName || 'Department'
    const category = departmentInfo.category || ''

    // Filter products by category
    const filteredProducts = products.filter(product => {
        if (!product.category) return false
        return product.category.toLowerCase() === category.toLowerCase()
    })

    return (
        <div className="min-h-[70vh] mx-4 sm:mx-6">
            <div className="max-w-7xl mx-auto">
                {/* Back navigation */}
                <div 
                    onClick={() => router.push('/')}
                    className="my-6 pb-4 border-b border-[var(--te-grey-200)] flex items-center gap-3 cursor-pointer group"
                >
                    <MoveLeftIcon 
                        size={16} 
                        className="text-[var(--te-orange)] group-hover:text-[var(--te-dark)] transition-colors"
                    />
                    <span className="text-[var(--te-grey-400)] text-xs font-medium tracking-widest uppercase group-hover:text-[var(--te-dark)] transition-colors">Back to Home</span>
                </div>
                
                <div className="mb-8">
                    <AnimatedTitle title={displayName} />
                    <div className="flex justify-center mt-2">
                        <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase bg-[var(--te-cream)] px-3 py-1 rounded-sm border border-[var(--te-grey-200)] font-[family-name:var(--font-jetbrains)]">
                            {filteredProducts.length} Products
                        </span>
                    </div>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mb-20">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-[var(--te-grey-300)]">
                        <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                                <path d="m3.3 7 8.7 5 8.7-5"/>
                                <path d="M12 22V12"/>
                            </svg>
                        </div>
                        <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">No Products</h2>
                        <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide mb-6">No products found in this department</p>
                        <button
                            onClick={() => router.push('/shop')}
                            className="bg-[var(--te-orange)] text-white px-6 py-2.5 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all"
                            style={{ boxShadow: '0 2px 0 rgba(200, 60, 0, 0.4)' }}
                        >
                            Browse All Products
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default function Department() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-8 h-8 border-2 border-[var(--te-orange)] border-t-transparent rounded-full animate-spin" />
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase">Loading</span>
                </div>
            </div>
        }>
            <DepartmentContent />
        </Suspense>
    )
}


