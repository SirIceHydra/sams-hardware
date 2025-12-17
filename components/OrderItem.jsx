'use client'
import Image from "next/image";
import { useSelector } from "react-redux";
import Rating from "./Rating";
import { useState } from "react";
import RatingModal from "./RatingModal";

const OrderItem = ({ order }) => {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R';
    const [ratingModal, setRatingModal] = useState(null);

    const { ratings } = useSelector(state => state.rating);

    const getStatusStyles = (status) => {
        switch(status.toLowerCase()) {
            case 'confirmed':
                return 'text-[var(--te-orange)] bg-[var(--te-orange)]/10 border-[var(--te-orange)]/20';
            case 'delivered':
                return 'text-[var(--te-green)] bg-[var(--te-green)]/10 border-[var(--te-green)]/20';
            default:
                return 'text-[var(--te-grey-400)] bg-[var(--te-grey-200)] border-[var(--te-grey-200)]';
        }
    }

    return (
        <>
            <tr className="text-xs border-b border-[var(--te-grey-200)]">
                <td className="text-left py-6">
                    <div className="flex flex-col gap-5">
                        {order.orderItems.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                                <div className="w-16 h-16 bg-[var(--te-cream)] flex items-center justify-center rounded-sm border border-[var(--te-grey-200)]">
                                    <Image
                                        className="max-h-12 w-auto"
                                        src={item.product.images[0]}
                                        alt="product_img"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <div className="flex flex-col justify-center">
                                    <p className="font-semibold text-[var(--te-dark)] text-sm uppercase tracking-wide">{item.product.name}</p>
                                    <p className="text-[var(--te-grey-400)] font-medium mt-0.5">
                                        <span className="font-[family-name:var(--font-jetbrains)]">{currency}{item.price}</span>
                                        <span className="mx-2">·</span>
                                        <span>Qty: {item.quantity}</span>
                                    </p>
                                    <p className="text-[10px] text-[var(--te-grey-400)] mt-1 tracking-wide">{new Date(order.createdAt).toDateString()}</p>
                                    <div className="mt-2">
                                        {ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId)
                                            ? <Rating value={ratings.find(rating => order.id === rating.orderId && item.product.id === rating.productId).rating} />
                                            : <button onClick={() => setRatingModal({ orderId: order.id, productId: item.product.id })} className={`text-[var(--te-orange)] hover:text-[var(--te-dark)] font-semibold tracking-widest uppercase text-[10px] transition-colors ${order.status !== "DELIVERED" && 'hidden'}`}>Rate Product</button>
                                        }</div>
                                    {ratingModal && <RatingModal ratingModal={ratingModal} setRatingModal={setRatingModal} />}
                                </div>
                            </div>
                        ))}
                    </div>
                </td>

                <td className="text-center max-md:hidden py-6">
                    <span className="font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{currency}{order.total}</span>
                </td>

                <td className="text-left max-md:hidden py-6 text-[var(--te-grey-400)]">
                    <p className="font-medium">{order.address.name}, {order.address.street},</p>
                    <p>{order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country},</p>
                    <p className="font-[family-name:var(--font-jetbrains)]">{order.address.phone}</p>
                </td>

                <td className="text-left max-md:hidden py-6">
                    <div
                        className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase border ${getStatusStyles(order.status)}`}
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-current" />
                        {order.status.split('_').join(' ').toLowerCase()}
                    </div>
                </td>
            </tr>
            
            {/* Mobile */}
            <tr className="md:hidden border-b border-[var(--te-grey-200)]">
                <td colSpan={5} className="py-4 text-[var(--te-grey-400)] text-xs">
                    <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-3 mb-3">
                        <p className="font-medium">{order.address.name}, {order.address.street}</p>
                        <p>{order.address.city}, {order.address.state}, {order.address.zip}, {order.address.country}</p>
                        <p className="font-[family-name:var(--font-jetbrains)]">{order.address.phone}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">{currency}{order.total}</span>
                        <span className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1.5 text-[10px] font-semibold tracking-widest uppercase border ${getStatusStyles(order.status)}`}>
                            <div className="w-1.5 h-1.5 rounded-full bg-current" />
                            {order.status.replace(/_/g, ' ').toLowerCase()}
                        </span>
                    </div>
                </td>
            </tr>
        </>
    )
}

export default OrderItem
