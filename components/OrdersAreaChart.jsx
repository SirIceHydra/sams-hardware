'use client'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function OrdersAreaChart({ allOrders }) {

    // Group orders by date
    const ordersPerDay = allOrders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toISOString().split('T')[0] // format: YYYY-MM-DD
        acc[date] = (acc[date] || 0) + 1
        return acc
    }, {})

    // Convert to array for Recharts
    const chartData = Object.entries(ordersPerDay).map(([date, count]) => ({
        date,
        orders: count
    }))

    // Custom tooltip styles
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-[var(--te-dark)] border border-[var(--te-grey-500)] rounded-sm px-3 py-2">
                    <p className="text-[10px] text-[var(--te-grey-300)] tracking-widest uppercase mb-1">{label}</p>
                    <p className="text-sm font-bold text-[var(--te-white)] font-[family-name:var(--font-jetbrains)]">
                        {payload[0].value} orders
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="w-full h-[280px] text-xs">
            <div className="flex items-center justify-end gap-2 mb-4">
                <span className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase">Orders</span>
                <span className="text-[10px] text-[var(--te-dark)] font-bold tracking-widest uppercase">/ Day</span>
            </div>
            <ResponsiveContainer width="100%" height="100%"> 
                <AreaChart data={chartData}>
                    <defs>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#FF5500" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#FF5500" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid 
                        strokeDasharray="3 3" 
                        stroke="var(--te-grey-200)" 
                        vertical={false}
                    />
                    <XAxis 
                        dataKey="date" 
                        stroke="var(--te-grey-300)"
                        tick={{ fill: 'var(--te-grey-400)', fontSize: 10, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--te-grey-200)' }}
                    />
                    <YAxis 
                        allowDecimals={false} 
                        stroke="var(--te-grey-300)"
                        tick={{ fill: 'var(--te-grey-400)', fontSize: 10, fontWeight: 500 }}
                        tickLine={false}
                        axisLine={{ stroke: 'var(--te-grey-200)' }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                        type="monotone" 
                        dataKey="orders" 
                        stroke="var(--te-orange)" 
                        fillOpacity={1} 
                        fill="url(#colorOrders)" 
                        strokeWidth={2} 
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    )
}
