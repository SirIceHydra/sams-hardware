'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminStores() {

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchStores = async () => {
        setStores(storesDummyData)
        setLoading(false)
    }

    const toggleIsActive = async (storeId) => {
        // Logic to toggle the status of a store

    }

    useEffect(() => {
        fetchStores()
    }, [])

    return !loading ? (
        <div className="text-[var(--te-grey-400)] mb-28">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 8px var(--te-green)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Live Stores</h1>
            </div>

            {stores.length ? (
                <div className="space-y-4">
                    {stores.map((store) => (
                        <div key={store.id} className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5 flex max-md:flex-col gap-4 md:items-end hover:border-[var(--te-orange)] transition-colors" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex items-center gap-3 pt-2">
                                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase">Active</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" onChange={() => toast.promise(toggleIsActive(store.id), { loading: "Updating..." })} checked={store.isActive} />
                                    <div className="w-9 h-5 bg-[var(--te-grey-200)] rounded-sm peer peer-checked:bg-[var(--te-green)] transition-colors duration-150"></div>
                                    <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-sm transition-transform duration-150 ease-out peer-checked:translate-x-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-[var(--te-grey-300)]">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                            <polyline points="9 22 9 12 15 12 15 22"/>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">No Stores</h2>
                    <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">No stores available yet</p>
                </div>
            )}
        </div>
    ) : <Loading />
}