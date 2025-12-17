'use client'
import { XIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "react-hot-toast"

const AddressModal = ({ setShowAddressModal }) => {

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        phone: ''
    })

    const handleAddressChange = (e) => {
        setAddress({
            ...address,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setShowAddressModal(false)
    }

    return (
        <form onSubmit={e => toast.promise(handleSubmit(e), { loading: 'Adding Address...' })} className="fixed inset-0 z-50 bg-[var(--te-dark)]/80 backdrop-blur-sm h-screen flex items-center justify-center p-4">
            <div className="flex flex-col gap-4 text-[var(--te-dark)] w-full max-w-md bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm p-6 relative">
                {/* Close button */}
                <button 
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="absolute top-4 right-4 text-[var(--te-grey-400)] hover:text-[var(--te-orange)] transition-colors"
                >
                    <XIcon size={20} />
                </button>
                
                {/* Header */}
                <div className="mb-2">
                    <h2 className="text-lg font-bold uppercase tracking-widest">Add New Address</h2>
                    <div className="w-12 h-[2px] bg-[var(--te-orange)] mt-2" />
                </div>
                
                <input 
                    name="name" 
                    onChange={handleAddressChange} 
                    value={address.name} 
                    className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                    type="text" 
                    placeholder="Enter your name" 
                    required 
                />
                <input 
                    name="email" 
                    onChange={handleAddressChange} 
                    value={address.email} 
                    className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                    type="email" 
                    placeholder="Email address" 
                    required 
                />
                <input 
                    name="street" 
                    onChange={handleAddressChange} 
                    value={address.street} 
                    className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                    type="text" 
                    placeholder="Street" 
                    required 
                />
                <div className="flex gap-3">
                    <input 
                        name="city" 
                        onChange={handleAddressChange} 
                        value={address.city} 
                        className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                        type="text" 
                        placeholder="City" 
                        required 
                    />
                    <input 
                        name="state" 
                        onChange={handleAddressChange} 
                        value={address.state} 
                        className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                        type="text" 
                        placeholder="State" 
                        required 
                    />
                </div>
                <div className="flex gap-3">
                    <input 
                        name="zip" 
                        onChange={handleAddressChange} 
                        value={address.zip} 
                        className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide font-[family-name:var(--font-jetbrains)]" 
                        type="number" 
                        placeholder="Zip code" 
                        required 
                    />
                    <input 
                        name="country" 
                        onChange={handleAddressChange} 
                        value={address.country} 
                        className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide" 
                        type="text" 
                        placeholder="Country" 
                        required 
                    />
                </div>
                <input 
                    name="phone" 
                    onChange={handleAddressChange} 
                    value={address.phone} 
                    className="p-2.5 px-4 outline-none border border-[var(--te-grey-200)] rounded-sm w-full text-sm font-medium bg-[var(--te-white)] placeholder-[var(--te-grey-300)] focus:border-[var(--te-orange)] transition-colors tracking-wide font-[family-name:var(--font-jetbrains)]" 
                    type="text" 
                    placeholder="Phone" 
                    required 
                />
                <button 
                    className="bg-[var(--te-orange)] text-white text-xs font-bold py-3 rounded-sm hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all tracking-widest uppercase mt-2"
                    style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
                >
                    Save Address
                </button>
            </div>
        </form>
    )
}

export default AddressModal
