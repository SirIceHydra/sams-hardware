'use client'
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"
import { orderDummyData } from "@/assets/assets"
import { XIcon } from "lucide-react"

export default function StoreOrders() {
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R'
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)


    const fetchOrders = async () => {
       setOrders(orderDummyData)
       setLoading(false)
    }

    const updateOrderStatus = async (orderId, status) => {
        // Logic to update the status of an order


    }

    const openModal = (order) => {
        setSelectedOrder(order)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setSelectedOrder(null)
        setIsModalOpen(false)
    }

    useEffect(() => {
        fetchOrders()
    }, [])

    if (loading) return <Loading />

    return (
        <div className="text-[var(--te-grey-400)] mb-28">
            {/* Header */}
            <div className="flex items-center gap-3 mb-8">
                <div className="w-2 h-2 rounded-full bg-[var(--te-yellow)]" style={{ boxShadow: '0 0 8px var(--te-yellow)' }} />
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">Store Orders</h1>
            </div>
            
            {orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-[var(--te-grey-300)]">
                    <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
                            <path d="m3.3 7 8.7 5 8.7-5"/>
                            <path d="M12 22V12"/>
                        </svg>
                    </div>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">No Orders</h2>
                    <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">No orders found yet</p>
                </div>
            ) : (
                <div className="overflow-x-auto bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-[var(--te-white)] border-b border-[var(--te-grey-200)]">
                            <tr>
                                {["#", "Customer", "Total", "Payment", "Coupon", "Status", "Date"].map((heading, i) => (
                                    <th key={i} className="px-4 py-3 text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.15em] uppercase">{heading}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order, index) => (
                                <tr
                                    key={order.id}
                                    className="border-b border-[var(--te-grey-200)] last:border-0 hover:bg-[var(--te-white)] transition-colors cursor-pointer"
                                    onClick={() => openModal(order)}
                                >
                                    <td className="px-4 py-4 font-bold font-[family-name:var(--font-jetbrains)] text-[var(--te-orange)]">
                                        {index + 1}
                                    </td>
                                    <td className="px-4 py-4 font-semibold text-[var(--te-dark)] tracking-wide">{order.user?.name}</td>
                                    <td className="px-4 py-4 font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{currency}{order.total}</td>
                                    <td className="px-4 py-4 text-xs tracking-wide uppercase">{order.paymentMethod}</td>
                                    <td className="px-4 py-4">
                                        {order.isCouponUsed ? (
                                            <span className="bg-[var(--te-green)]/10 text-[var(--te-green)] text-[10px] px-2 py-1 rounded-sm font-bold tracking-wider border border-[var(--te-green)]/20">
                                                {order.coupon?.code}
                                            </span>
                                        ) : (
                                            <span className="text-[var(--te-grey-300)]">—</span>
                                        )}
                                    </td>
                                    <td className="px-4 py-4" onClick={(e) => { e.stopPropagation() }}>
                                        <select
                                            value={order.status}
                                            onChange={e => updateOrderStatus(order.id, e.target.value)}
                                            className="border border-[var(--te-grey-200)] rounded-sm text-xs px-2 py-1.5 bg-[var(--te-white)] text-[var(--te-dark)] focus:outline-none focus:border-[var(--te-orange)] font-medium"
                                        >
                                            <option value="ORDER_PLACED">ORDER_PLACED</option>
                                            <option value="PROCESSING">PROCESSING</option>
                                            <option value="SHIPPED">SHIPPED</option>
                                            <option value="DELIVERED">DELIVERED</option>
                                        </select>
                                    </td>
                                    <td className="px-4 py-4 text-xs text-[var(--te-grey-400)] tracking-wide">
                                        {new Date(order.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal */}
            {isModalOpen && selectedOrder && (
                <div onClick={closeModal} className="fixed inset-0 flex items-center justify-center bg-[var(--te-dark)]/80 backdrop-blur-sm z-50 p-4">
                    <div onClick={e => e.stopPropagation()} className="bg-[var(--te-white)] rounded-sm border border-[var(--te-grey-200)] max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
                        <button onClick={closeModal} className="absolute top-4 right-4 text-[var(--te-grey-400)] hover:text-[var(--te-orange)] transition-colors">
                            <XIcon size={20} />
                        </button>
                        
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest">Order Details</h2>
                            <div className="w-12 h-[2px] bg-[var(--te-orange)] mt-2" />
                        </div>

                        {/* Customer Details */}
                        <div className="mb-6 bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-4">
                            <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase block mb-3">Customer Info</span>
                            <div className="space-y-1 text-sm">
                                <p className="text-[var(--te-dark)] font-medium">{selectedOrder.user?.name}</p>
                                <p className="text-[var(--te-grey-400)]">{selectedOrder.user?.email}</p>
                                <p className="text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">{selectedOrder.address?.phone}</p>
                                <p className="text-[var(--te-grey-400)]">{`${selectedOrder.address?.street}, ${selectedOrder.address?.city}, ${selectedOrder.address?.state}, ${selectedOrder.address?.zip}`}</p>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="mb-6">
                            <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase block mb-3">Products</span>
                            <div className="space-y-3">
                                {selectedOrder.orderItems.map((item, i) => (
                                    <div key={i} className="flex items-center gap-4 bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-3">
                                        <div className="w-16 h-16 bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm flex items-center justify-center">
                                            <img
                                                src={item.product.images?.[0].src || item.product.images?.[0]}
                                                alt={item.product?.name}
                                                className="max-w-12 max-h-12 object-contain"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[var(--te-dark)] uppercase tracking-wide text-sm">{item.product?.name}</p>
                                            <p className="text-xs text-[var(--te-grey-400)] mt-1">Qty: <span className="font-bold font-[family-name:var(--font-jetbrains)]">{item.quantity}</span></p>
                                            <p className="text-sm font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)] mt-1">{currency}{item.price}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Payment & Status */}
                        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
                            <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-3">
                                <span className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase">Payment</span>
                                <p className="font-semibold text-[var(--te-dark)] mt-1">{selectedOrder.paymentMethod}</p>
                            </div>
                            <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-3">
                                <span className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase">Status</span>
                                <p className="font-semibold text-[var(--te-dark)] mt-1">{selectedOrder.status}</p>
                            </div>
                        </div>

                        {/* Actions */}
                        <button 
                            onClick={closeModal} 
                            className="w-full bg-[var(--te-dark)] text-white py-3 rounded-sm text-xs font-bold tracking-widest uppercase hover:bg-[var(--te-grey-500)] active:scale-[0.98] transition-all"
                            style={{ boxShadow: '0 3px 0 rgba(0,0,0,0.3)' }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
