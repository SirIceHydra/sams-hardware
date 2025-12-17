'use client'
import { dummyAdminDashboardData } from "@/assets/assets"
import Loading from "@/components/Loading"
import OrdersAreaChart from "@/components/OrdersAreaChart"
import { CircleDollarSignIcon, ShoppingBasketIcon, StoreIcon, TagsIcon } from "lucide-react"
import { useEffect, useState } from "react"

export default function AdminDashboard() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'

    const [loading, setLoading] = useState(true)
    const [dashboardData, setDashboardData] = useState({
        products: 0,
        revenue: 0,
        orders: 0,
        stores: 0,
        allOrders: [],
    })

    const dashboardCardsData = [
        { title: 'Total Products', value: dashboardData.products, icon: ShoppingBasketIcon, color: 'orange' },
        { title: 'Total Revenue', value: currency + dashboardData.revenue, icon: CircleDollarSignIcon, color: 'green' },
        { title: 'Total Orders', value: dashboardData.orders, icon: TagsIcon, color: 'cyan' },
        { title: 'Total Stores', value: dashboardData.stores, icon: StoreIcon, color: 'yellow' },
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
        setDashboardData(dummyAdminDashboardData)
        setLoading(false)
    }

    useEffect(() => {
        fetchDashboardData()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-[var(--te-grey-400)]">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-orange)]" style={{ boxShadow: '0 0 8px var(--te-orange)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Dashboard</h1>
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

            {/* Area Chart */}
            <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-6">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-1.5 h-1.5 rounded-full bg-[var(--te-cyan)]" style={{ boxShadow: '0 0 6px var(--te-cyan)' }} />
                    <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">Orders Overview</span>
                </div>
                <OrdersAreaChart allOrders={dashboardData.allOrders} />
            </div>
        </div>
    )
}