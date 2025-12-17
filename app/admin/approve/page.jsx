'use client'
import { storesDummyData } from "@/assets/assets"
import StoreInfo from "@/components/admin/StoreInfo"
import Loading from "@/components/Loading"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"

export default function AdminApprove() {

    const [stores, setStores] = useState([])
    const [loading, setLoading] = useState(true)


    const fetchStores = async () => {
        setStores(storesDummyData)
        setLoading(false)
    }

    const handleApprove = async ({ storeId, status }) => {
        // Logic to approve a store


    }

    useEffect(() => {
            fetchStores()
    }, [])

    return !loading ? (
        <div className="text-[var(--te-grey-400)] mb-28">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-yellow)]" style={{ boxShadow: '0 0 8px var(--te-yellow)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Approve Stores</h1>
            </div>

            {stores.length ? (
                <div className="space-y-4">
                    {stores.map((store) => (
                        <div key={store.id} className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5 flex max-md:flex-col gap-4 md:items-end hover:border-[var(--te-orange)] transition-colors" >
                            {/* Store Info */}
                            <StoreInfo store={store} />

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button 
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'approved' }), { loading: "Approving..." })} 
                                    className="px-5 py-2.5 bg-[var(--te-green)] text-white rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all"
                                    style={{ boxShadow: '0 2px 0 rgba(0, 200, 83, 0.4)' }}
                                >
                                    Approve
                                </button>
                                <button 
                                    onClick={() => toast.promise(handleApprove({ storeId: store.id, status: 'rejected' }), { loading: 'Rejecting...' })} 
                                    className="px-5 py-2.5 bg-[var(--te-grey-400)] text-white rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all"
                                    style={{ boxShadow: '0 2px 0 rgba(0,0,0,0.2)' }}
                                >
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-[var(--te-grey-300)]">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                            <polyline points="22 4 12 14.01 9 11.01"/>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">All Clear</h2>
                    <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">No applications pending</p>
                </div>
            )}
        </div>
    ) : <Loading />
}