'use client'
import ProductCard from "@/components/ProductCard"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { MailIcon, MapPinIcon } from "lucide-react"
import Loading from "@/components/Loading"
import Image from "next/image"
import { dummyStoreData, productDummyData } from "@/assets/assets"

export default function StoreShop() {

    const { username } = useParams()
    const [products, setProducts] = useState([])
    const [storeInfo, setStoreInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchStoreData = async () => {
        setStoreInfo(dummyStoreData)
        setProducts(productDummyData)
        setLoading(false)
    }

    useEffect(() => {
        fetchStoreData()
    }, [])

    return !loading ? (
        <div className="min-h-[70vh] mx-4 sm:mx-6">

            {/* Store Info Banner */}
            {storeInfo && (
                <div className="max-w-7xl mx-auto bg-[var(--te-dark)] border border-[var(--te-grey-500)] rounded-sm p-6 md:p-8 mt-6 flex flex-col md:flex-row items-center gap-6 relative overflow-hidden">
                    {/* Orange accent bar */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-orange)]" />
                    
                    {/* Grid pattern overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.03]"
                        style={{
                            backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, var(--te-grey-400) 20px, var(--te-grey-400) 21px),
                                             repeating-linear-gradient(90deg, transparent, transparent 20px, var(--te-grey-400) 20px, var(--te-grey-400) 21px)`,
                        }}
                    />
                    
                    <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-sm border-2 border-[var(--te-grey-500)] overflow-hidden bg-[var(--te-grey-500)]">
                        <Image
                            src={storeInfo.logo}
                            alt={storeInfo.name}
                            className="w-full h-full object-cover"
                            width={128}
                            height={128}
                        />
                    </div>
                    
                    <div className="text-center md:text-left relative z-10 flex-1">
                        <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
                            <div className="w-2 h-2 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 8px var(--te-green)' }} />
                            <span className="text-[10px] font-semibold text-[var(--te-grey-300)] tracking-[0.2em] uppercase">Verified Store</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--te-white)] uppercase tracking-tight">{storeInfo.name}</h1>
                        <p className="text-sm text-[var(--te-grey-300)] mt-2 max-w-lg font-medium tracking-wide leading-relaxed">{storeInfo.description}</p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 mt-5">
                            <div className="flex items-center gap-2 text-xs text-[var(--te-grey-300)]">
                                <span className="w-7 h-7 bg-[var(--te-grey-500)]/50 border border-[var(--te-grey-500)] rounded-sm flex items-center justify-center">
                                    <MapPinIcon size={14} />
                                </span>
                                <span className="font-medium tracking-wide">{storeInfo.address}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs text-[var(--te-grey-300)]">
                                <span className="w-7 h-7 bg-[var(--te-grey-500)]/50 border border-[var(--te-grey-500)] rounded-sm flex items-center justify-center">
                                    <MailIcon size={14} />
                                </span>
                                <span className="font-medium tracking-wide">{storeInfo.email}</span>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Products */}
            <div className="max-w-7xl mx-auto mb-20">
                <div className="flex items-center gap-3 mt-10 mb-6 pb-4 border-b border-[var(--te-grey-200)]">
                    <h2 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Store Products</h2>
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase bg-[var(--te-cream)] px-2 py-1 rounded-sm border border-[var(--te-grey-200)] font-[family-name:var(--font-jetbrains)]">
                        {products.length}
                    </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                    {products.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        </div>
    ) : <Loading />
}