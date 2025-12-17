'use client'
import PageTitle from "@/components/PageTitle"
import { useEffect, useState } from "react";
import OrderItem from "@/components/OrderItem";
import { orderDummyData } from "@/assets/assets";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        setOrders(orderDummyData)
    }, []);

    return (
        <div className="min-h-[70vh] mx-4 sm:mx-6">
            {orders.length > 0 ? (
                (
                    <div className="my-12 max-w-7xl mx-auto">
                        <PageTitle heading="My Orders" text={`Showing total ${orders.length} orders`} linkText={'Go to home'} />

                        <div className="overflow-x-auto">
                            <table className="w-full max-w-5xl text-[var(--te-grey-400)] text-xs">
                                <thead>
                                    <tr className="border-b border-[var(--te-grey-200)] max-md:hidden">
                                        <th className="text-left py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Product</th>
                                        <th className="text-center py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Total</th>
                                        <th className="text-left py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Address</th>
                                        <th className="text-left py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <OrderItem order={order} key={order.id} />
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
            ) : (
                <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-[var(--te-grey-300)]">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                            <path d="m3.3 7 8.7 5 8.7-5"/>
                            <path d="M12 22V12"/>
                        </svg>
                    </div>
                    <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-widest">No Orders</h1>
                    <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">You haven't placed any orders yet</p>
                </div>
            )}
        </div>
    )
}
