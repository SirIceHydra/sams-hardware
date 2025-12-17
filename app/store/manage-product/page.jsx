'use client'
import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import Image from "next/image"
import Loading from "@/components/Loading"
import { productDummyData } from "@/assets/assets"

export default function StoreManageProducts() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'

    const [loading, setLoading] = useState(true)
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        setProducts(productDummyData)
        setLoading(false)
    }

    const toggleStock = async (productId) => {
        // Logic to toggle the stock of a product


    }

    useEffect(() => {
            fetchProducts()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-[var(--te-grey-400)] mb-28">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-cyan)]" style={{ boxShadow: '0 0 8px var(--te-cyan)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Manage Products</h1>
            </div>
            
            <div className="overflow-x-auto bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm">
                <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--te-white)] border-b border-[var(--te-grey-200)]">
                        <tr>
                            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Name</th>
                            <th className="px-4 py-3 hidden md:table-cell text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Description</th>
                            <th className="px-4 py-3 hidden md:table-cell text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">MRP</th>
                            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Price</th>
                            <th className="px-4 py-3 text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase text-center">In Stock</th>
                        </tr>
                    </thead>
                    <tbody className="text-[var(--te-dark)]">
                        {products.map((product) => (
                            <tr key={product.id} className="border-b border-[var(--te-grey-200)] last:border-0 hover:bg-[var(--te-white)] transition-colors">
                                <td className="px-4 py-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="w-12 h-12 bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm flex items-center justify-center">
                                            <Image width={40} height={40} className='max-h-10 w-auto' src={product.images[0]} alt="" />
                                        </div>
                                        <span className="font-semibold text-sm tracking-wide uppercase">{product.name}</span>
                                    </div>
                                </td>
                                <td className="px-4 py-4 max-w-xs text-[var(--te-grey-400)] hidden md:table-cell truncate text-xs font-medium">{product.description}</td>
                                <td className="px-4 py-4 hidden md:table-cell font-[family-name:var(--font-jetbrains)] text-[var(--te-grey-400)]">{currency}{product.mrp.toLocaleString()}</td>
                                <td className="px-4 py-4 font-bold font-[family-name:var(--font-jetbrains)]">{currency}{product.price.toLocaleString()}</td>
                                <td className="px-4 py-4 text-center">
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleStock(product.id), { loading: "Updating..." })} checked={product.inStock} />
                                        <div className="w-9 h-5 bg-[var(--te-grey-200)] rounded-sm peer peer-checked:bg-[var(--te-green)] transition-colors duration-150"></div>
                                        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-sm transition-transform duration-150 ease-out peer-checked:translate-x-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}