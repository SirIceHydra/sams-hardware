'use client'
import { useEffect, useState } from "react"
import { format } from "date-fns"
import toast from "react-hot-toast"
import { Trash2Icon } from "lucide-react"
import { couponDummyData } from "@/assets/assets"

export default function AdminCoupons() {

    const [coupons, setCoupons] = useState([])

    const [newCoupon, setNewCoupon] = useState({
        code: '',
        description: '',
        discount: '',
        forNewUser: false,
        forMember: false,
        isPublic: false,
        expiresAt: new Date()
    })

    const fetchCoupons = async () => {
        setCoupons(couponDummyData)
    }

    const handleAddCoupon = async (e) => {
        e.preventDefault()
        // Logic to add a coupon


    }

    const handleChange = (e) => {
        setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value })
    }

    const deleteCoupon = async (code) => {
        // Logic to delete a coupon


    }

    useEffect(() => {
        fetchCoupons();
    }, [])

    return (
        <div className="text-[var(--te-grey-400)] mb-40">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-cyan)]" style={{ boxShadow: '0 0 8px var(--te-cyan)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Manage Coupons</h1>
            </div>

            {/* Add Coupon Form */}
            <form onSubmit={(e) => toast.promise(handleAddCoupon(e), { loading: "Adding coupon..." })} className="max-w-md bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5 mb-10">
                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase block mb-4">Add New Coupon</span>
                
                <div className="grid grid-cols-2 gap-3 mb-3">
                    <input 
                        type="text" 
                        placeholder="COUPON CODE" 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)] uppercase"
                        name="code" value={newCoupon.code} onChange={handleChange} required
                    />
                    <input 
                        type="number" 
                        placeholder="Discount %" 
                        min={1} max={100} 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)]"
                        name="discount" value={newCoupon.discount} onChange={handleChange} required
                    />
                </div>
                
                <input 
                    type="text" 
                    placeholder="Coupon description" 
                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors mb-3"
                    name="description" value={newCoupon.description} onChange={handleChange} required
                />

                <div className="mb-4">
                    <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                        Expiry Date
                    </label>
                    <input 
                        type="date" 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)]"
                        name="expiresAt" value={format(newCoupon.expiresAt, 'yyyy-MM-dd')} onChange={handleChange}
                    />
                </div>

                <div className="space-y-3 mb-5">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only peer"
                                name="forNewUser" checked={newCoupon.forNewUser}
                                onChange={(e) => setNewCoupon({ ...newCoupon, forNewUser: e.target.checked })}
                            />
                            <div className="w-9 h-5 bg-[var(--te-grey-200)] rounded-sm peer peer-checked:bg-[var(--te-green)] transition-colors duration-150"></div>
                            <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-sm transition-transform duration-150 ease-out peer-checked:translate-x-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
                        </div>
                        <span className="text-xs font-medium text-[var(--te-dark)] tracking-wide">For New User</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <div className="relative">
                            <input type="checkbox" className="sr-only peer"
                                name="forMember" checked={newCoupon.forMember}
                                onChange={(e) => setNewCoupon({ ...newCoupon, forMember: e.target.checked })}
                            />
                            <div className="w-9 h-5 bg-[var(--te-grey-200)] rounded-sm peer peer-checked:bg-[var(--te-green)] transition-colors duration-150"></div>
                            <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-sm transition-transform duration-150 ease-out peer-checked:translate-x-4" style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.2)' }}></span>
                        </div>
                        <span className="text-xs font-medium text-[var(--te-dark)] tracking-wide">For Members</span>
                    </label>
                </div>
                
                <button 
                    className="w-full bg-[var(--te-orange)] text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all"
                    style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
                >
                    Add Coupon
                </button>
            </form>

            {/* List Coupons */}
            <div>
                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase block mb-4">Active Coupons</span>
                <div className="overflow-x-auto bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm">
                    <table className="min-w-full text-sm">
                        <thead className="bg-[var(--te-white)] border-b border-[var(--te-grey-200)]">
                            <tr>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Code</th>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Description</th>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Discount</th>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Expires</th>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">New User</th>
                                <th className="py-3 px-4 text-left text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">Member</th>
                                <th className="py-3 px-4 text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {coupons.map((coupon) => (
                                <tr key={coupon.code} className="border-b border-[var(--te-grey-200)] last:border-0 hover:bg-[var(--te-white)] transition-colors">
                                    <td className="py-4 px-4 font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{coupon.code}</td>
                                    <td className="py-4 px-4 text-[var(--te-grey-400)] font-medium">{coupon.description}</td>
                                    <td className="py-4 px-4 font-bold text-[var(--te-orange)] font-[family-name:var(--font-jetbrains)]">{coupon.discount}%</td>
                                    <td className="py-4 px-4 text-xs text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">{format(coupon.expiresAt, 'yyyy-MM-dd')}</td>
                                    <td className="py-4 px-4">
                                        {coupon.forNewUser ? (
                                            <span className="w-2 h-2 rounded-full bg-[var(--te-green)] inline-block" style={{ boxShadow: '0 0 6px var(--te-green)' }} />
                                        ) : (
                                            <span className="w-2 h-2 rounded-full bg-[var(--te-grey-200)] inline-block" />
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        {coupon.forMember ? (
                                            <span className="w-2 h-2 rounded-full bg-[var(--te-green)] inline-block" style={{ boxShadow: '0 0 6px var(--te-green)' }} />
                                        ) : (
                                            <span className="w-2 h-2 rounded-full bg-[var(--te-grey-200)] inline-block" />
                                        )}
                                    </td>
                                    <td className="py-4 px-4">
                                        <button 
                                            onClick={() => toast.promise(deleteCoupon(coupon.code), { loading: "Deleting..." })} 
                                            className="text-[var(--te-grey-400)] hover:text-[var(--te-orange)] transition-colors p-1"
                                        >
                                            <Trash2Icon size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}