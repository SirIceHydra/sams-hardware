'use client'
import { assets } from "@/assets/assets"
import { useEffect, useState } from "react"
import Image from "next/image"
import toast from "react-hot-toast"
import Loading from "@/components/Loading"
import AnimatedTitle from "@/components/AnimatedTitle"

export default function CreateStore() {

    const [alreadySubmitted, setAlreadySubmitted] = useState(false)
    const [status, setStatus] = useState("")
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState("")

    const [storeInfo, setStoreInfo] = useState({
        name: "",
        username: "",
        description: "",
        email: "",
        contact: "",
        address: "",
        image: ""
    })

    const onChangeHandler = (e) => {
        setStoreInfo({ ...storeInfo, [e.target.name]: e.target.value })
    }

    const fetchSellerStatus = async () => {
        // Logic to check if the store is already submitted


        setLoading(false)
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // Logic to submit the store details


    }

    useEffect(() => {
        fetchSellerStatus()
    }, [])

    return !loading ? (
        <>
            {!alreadySubmitted ? (
                <div className="mx-4 sm:mx-6 min-h-[70vh] py-10">
                    <div className="max-w-2xl mx-auto">
                        <AnimatedTitle title="Create Store" />
                        
                        <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-4 mb-8">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full bg-[var(--te-cyan)]" style={{ boxShadow: '0 0 8px var(--te-cyan)' }} />
                                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">Info</span>
                            </div>
                            <p className="text-[var(--te-dark)] text-sm font-medium tracking-wide">
                                To become a seller, submit your store details for review. Your store will be activated after admin verification.
                            </p>
                        </div>

                        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Submitting data..." })} className="space-y-5">
                            {/* Store Logo */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                            Store Logo
                                </label>
                                <label className="cursor-pointer inline-block">
                                    <div className="w-20 h-20 bg-[var(--te-white)] border-2 border-dashed border-[var(--te-grey-200)] rounded-sm flex items-center justify-center hover:border-[var(--te-orange)] transition-colors overflow-hidden">
                                        {storeInfo.image ? (
                                            <Image src={URL.createObjectURL(storeInfo.image)} className="w-full h-full object-cover" alt="" width={80} height={80} />
                                        ) : (
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--te-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
                                                <line x1="16" y1="5" x2="22" y2="5"/>
                                                <line x1="19" y1="2" x2="19" y2="8"/>
                                                <circle cx="9" cy="9" r="2"/>
                                                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                            </svg>
                                        )}
                                    </div>
                            <input type="file" accept="image/*" onChange={(e) => setStoreInfo({ ...storeInfo, image: e.target.files[0] })} hidden />
                        </label>
                            </div>

                            {/* Username */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Username
                                </label>
                                <input 
                                    name="username" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.username} 
                                    type="text" 
                                    placeholder="Enter your store username" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                                    required
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Store Name
                                </label>
                                <input 
                                    name="name" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.name} 
                                    type="text" 
                                    placeholder="Enter your store name" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Description
                                </label>
                                <textarea 
                                    name="description" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.description} 
                                    rows={4} 
                                    placeholder="Enter your store description" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Email
                                </label>
                                <input 
                                    name="email" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.email} 
                                    type="email" 
                                    placeholder="Enter your store email" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors"
                                    required
                                />
                            </div>

                            {/* Contact Number */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Contact Number
                                </label>
                                <input 
                                    name="contact" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.contact} 
                                    type="text" 
                                    placeholder="Enter your store contact number" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)]"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                                    Address
                                </label>
                                <textarea 
                                    name="address" 
                                    onChange={onChangeHandler} 
                                    value={storeInfo.address} 
                                    rows={3} 
                                    placeholder="Enter your store address" 
                                    className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors resize-none"
                                    required
                                />
                            </div>

                            {/* Submit Button */}
                            <button 
                                type="submit"
                                className="w-full bg-[var(--te-orange)] text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all mt-6"
                                style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
                            >
                                Submit Store
                            </button>
                    </form>
                    </div>
                </div>
            ) : (
                <div className="min-h-[80vh] flex flex-col items-center justify-center px-6">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                        {status === "approved" ? (
                            <div className="w-8 h-8 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 12px var(--te-green)' }} />
                        ) : (
                            <div className="w-8 h-8 rounded-full bg-[var(--te-orange)]" style={{ boxShadow: '0 0 12px var(--te-orange)' }} />
                        )}
                    </div>
                    <p className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] text-center max-w-2xl uppercase tracking-tight">{message}</p>
                    {status === "approved" && (
                        <p className="mt-4 text-sm text-[var(--te-grey-400)] font-medium tracking-wide">
                            Redirecting to dashboard in <span className="font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">5</span> seconds
                        </p>
                    )}
                </div>
            )}
        </>
    ) : (<Loading />)
}