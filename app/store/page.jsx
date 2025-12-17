'use client'
import { dummyStoreDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import Rating from "@/components/Rating"
import { CircleDollarSignIcon, ShoppingBasketIcon, StarIcon, TagsIcon } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Dashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'

    const router = useRouter()

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        totalProducts: 0,
        totalEarnings: 0,
        totalOrders: 0,
        ratings: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.totalProducts, icon: ShoppingBasketIcon, color: 'orange' },
        { title: 'Total Earnings', value: currency + dashboardData.totalEarnings, icon: CircleDollarSignIcon, color: 'green' },
        { title: 'Total Orders', value: dashboardData.totalOrders, icon: TagsIcon, color: 'cyan' },
        { title: 'Total Ratings', value: dashboardData.ratings.length, icon: StarIcon, color: 'yellow' },
    ]

    const getIconColor = (color) => {
        switch(color) {
            case 'orange': return 'var(--te-orange)';
            case 'green': return 'var(--te-green)';
            case 'cyan': return 'var(--te-cyan)';
            case 'yellow': return 'var(--te-yellow)';
            default: return 'var(--te-grey-400)';
        }
    }

    const fetchDashboardData = async () => {
        setDashboardData(dummyStoreDashboardData)
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-[var(--te-grey-400)] mb-28">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 8px var(--te-green)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Store Dashboard</h1>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {
                    dashboardCardsData.map((card, index) => (
                        <div 
                            key={index} 
                            className="relative bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-5 hover:border-[var(--te-orange)] transition-colors"
                        >
                            {/* Top accent */}
                            <div 
                                className="absolute top-0 left-0 right-0 h-[2px] rounded-t-sm"
                                style={{ backgroundColor: getIconColor(card.color) }}
                            />
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase mb-2">{card.title}</p>
                                    <p className="text-2xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{card.value}</p>
                                </div>
                                <div 
                                    className="w-12 h-12 rounded-sm bg-[var(--te-white)] border border-[var(--te-grey-200)] flex items-center justify-center"
                                >
                                    <card.icon size={20} style={{ color: getIconColor(card.color) }} />
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Reviews Section */}
            <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--te-yellow)]" style={{ boxShadow: '0 0 6px var(--te-yellow)' }} />
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">Customer Reviews</span>
                </div>

                <div className="space-y-0">
                    {dashboardData.ratings.length > 0 ? (
                        dashboardData.ratings.map((review, index) => (
                            <div key={index} className="flex max-sm:flex-col gap-5 sm:items-center justify-between py-5 border-b border-[var(--te-grey-200)] last:border-0">
                                <div className="flex-1">
                                    <div className="flex gap-3 items-start">
                                        <Image src={review.user.image} alt="" className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
                                        <div className="flex-1">
                                            <p className="font-semibold text-[var(--te-dark)] text-sm tracking-wide">{review.user.name}</p>
                                            <p className="text-[10px] text-[var(--te-grey-400)] tracking-wide mt-0.5">{new Date(review.createdAt).toDateString()}</p>
                                        </div>
                                    </div>
                                    <p className="mt-3 text-sm text-[var(--te-grey-400)] font-medium leading-relaxed tracking-wide max-w-sm">{review.review}</p>
                                </div>
                                <div className="flex flex-col gap-3 sm:items-end">
                                    <div className="flex flex-col sm:items-end">
                                        <p className="text-[10px] text-[var(--te-grey-400)] tracking-[0.15em] uppercase">{review.product?.category}</p>
                                        <p className="font-semibold text-[var(--te-dark)] text-sm tracking-wide uppercase mt-0.5">{review.product?.name}</p>
                                        <div className="mt-2">
                                            <Rating value={review.rating} />
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => router.push(`/product/${review.product.id}`)} 
                                        className="bg-[var(--te-white)] border border-[var(--te-grey-200)] px-4 py-2 text-xs font-semibold tracking-widest uppercase text-[var(--te-dark)] hover:border-[var(--te-orange)] hover:text-[var(--te-orange)] rounded-sm transition-all"
                                    >
                                        View Product
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-sm text-[var(--te-grey-400)] font-medium tracking-wide">No reviews yet</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}