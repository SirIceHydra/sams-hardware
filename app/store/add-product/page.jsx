'use client'
import { assets } from "@/assets/assets"
import Image from "next/image"
import { useState } from "react"
import { toast } from "react-hot-toast"

export default function StoreAddProduct() {

    const categories = ['Electronics', 'Clothing', 'Home & Kitchen', 'Beauty & Health', 'Toys & Games', 'Sports & Outdoors', 'Books & Media', 'Food & Drink', 'Hobbies & Crafts', 'Others']

    const [images, setImages] = useState({ 1: null, 2: null, 3: null, 4: null })
    const [productInfo, setProductInfo] = useState({
        name: "",
        description: "",
        mrp: 0,
        price: 0,
        category: "",
    })
    const [loading, setLoading] = useState(false)


    const onChangeHandler = (e) => {
        setProductInfo({ ...productInfo, [e.target.name]: e.target.value })
    }

    const onSubmitHandler = async (e) => {
        e.preventDefault()
        // Logic to add a product
        
    }


    return (
        <form onSubmit={e => toast.promise(onSubmitHandler(e), { loading: "Adding Product..." })} className="text-[var(--te-grey-400)] mb-28 max-w-2xl">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-orange)]" style={{ boxShadow: '0 0 8px var(--te-orange)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Add Product</h1>
            </div>

            {/* Images Section */}
            <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5 mb-6">
                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase block mb-4">Product Images</span>
                <div className="flex gap-3 flex-wrap">
                    {Object.keys(images).map((key) => (
                        <label key={key} htmlFor={`images${key}`} className="cursor-pointer">
                            <div className="w-20 h-20 bg-[var(--te-white)] border-2 border-dashed border-[var(--te-grey-200)] rounded-sm flex items-center justify-center hover:border-[var(--te-orange)] transition-colors overflow-hidden">
                                {images[key] ? (
                                    <Image width={80} height={80} className='w-full h-full object-cover' src={URL.createObjectURL(images[key])} alt="" />
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--te-grey-300)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/>
                                        <line x1="16" y1="5" x2="22" y2="5"/>
                                        <line x1="19" y1="2" x2="19" y2="8"/>
                                        <circle cx="9" cy="9" r="2"/>
                                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
                                    </svg>
                                )}
                            </div>
                            <input type="file" accept='image/*' id={`images${key}`} onChange={e => setImages({ ...images, [key]: e.target.files[0] })} hidden />
                        </label>
                    ))}
                </div>
            </div>

            {/* Product Info */}
            <div className="space-y-5">
                <div>
                    <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                        Product Name
                    </label>
                    <input 
                        type="text" 
                        name="name" 
                        onChange={onChangeHandler} 
                        value={productInfo.name} 
                        placeholder="Enter product name" 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors" 
                        required 
                    />
                </div>

                <div>
                    <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                        Description
                    </label>
                    <textarea 
                        name="description" 
                        onChange={onChangeHandler} 
                        value={productInfo.description} 
                        placeholder="Enter product description" 
                        rows={4} 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors resize-none" 
                        required 
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                            Actual Price
                        </label>
                        <input 
                            type="number" 
                            name="mrp" 
                            onChange={onChangeHandler} 
                            value={productInfo.mrp} 
                            placeholder="0" 
                            className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)]" 
                            required 
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                            Offer Price
                        </label>
                        <input 
                            type="number" 
                            name="price" 
                            onChange={onChangeHandler} 
                            value={productInfo.price} 
                            placeholder="0" 
                            className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] placeholder-[var(--te-grey-300)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors font-[family-name:var(--font-jetbrains)]" 
                            required 
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase mb-2">
                        Category
                    </label>
                    <select 
                        onChange={e => setProductInfo({ ...productInfo, category: e.target.value })} 
                        value={productInfo.category} 
                        className="w-full px-4 py-2.5 border border-[var(--te-grey-200)] rounded-sm focus:outline-none focus:border-[var(--te-orange)] text-[var(--te-dark)] bg-[var(--te-white)] font-medium text-sm tracking-wide transition-colors" 
                        required
                    >
                        <option value="" className="text-[var(--te-grey-300)]">Select a category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>{category}</option>
                        ))}
                    </select>
                </div>
            </div>

            <button 
                disabled={loading} 
                className="w-full bg-[var(--te-orange)] text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
            >
                Add Product
            </button>
        </form>
    )
}