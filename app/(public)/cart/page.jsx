'use client'
import Counter from "@/components/Counter";
import OrderSummary from "@/components/OrderSummary";
import PageTitle from "@/components/PageTitle";
import { deleteItemFromCart } from "@/lib/features/cart/cartSlice";
import { Trash2Icon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Cart() {

    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R';
    
    const { cartItems } = useSelector(state => state.cart);
    const products = useSelector(state => state.product.list);

    const dispatch = useDispatch();

    const [cartArray, setCartArray] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const createCartArray = () => {
        setTotalPrice(0);
        const cartArray = [];
        for (const [key, value] of Object.entries(cartItems)) {
            const product = products.find(product => product.id === key);
            if (product) {
                cartArray.push({
                    ...product,
                    quantity: value,
                });
                setTotalPrice(prev => prev + product.price * value);
            }
        }
        setCartArray(cartArray);
    }

    const handleDeleteItemFromCart = (productId) => {
        dispatch(deleteItemFromCart({ productId }))
    }

    useEffect(() => {
        if (products.length > 0) {
            createCartArray();
        }
    }, [cartItems, products]);

    return cartArray.length > 0 ? (
        <div className="min-h-screen mx-4 sm:mx-6 text-[var(--te-dark)]">

            <div className="max-w-7xl mx-auto">
                {/* Title */}
                <PageTitle heading="My Cart" text="items in your cart" linkText="Add more" />

                <div className="flex items-start justify-between gap-6 max-lg:flex-col">

                    <div className="w-full max-w-4xl overflow-x-auto -mx-4 sm:mx-0">
                        <div className="min-w-[600px] sm:min-w-0">
                        <table className="w-full text-[var(--te-grey-400)] text-xs">
                            <thead>
                                <tr className="border-b border-[var(--te-grey-200)]">
                                    <th className="text-left py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Product</th>
                                    <th className="py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Quantity</th>
                                    <th className="py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Total</th>
                                    <th className="max-md:hidden py-3 font-semibold uppercase tracking-widest text-[10px] text-[var(--te-grey-400)]">Remove</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cartArray.map((item, index) => (
                                        <tr key={index} className="border-b border-[var(--te-grey-200)]">
                                            <td className="py-4">
                                                <div className="flex gap-3 items-center">
                                                    <div className="flex items-center justify-center bg-[var(--te-cream)] w-16 h-16 sm:w-18 sm:h-18 rounded-sm border border-[var(--te-grey-200)]">
                                                        <Image src={item.images[0]} className="h-12 w-auto" alt="" width={45} height={45} />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-[var(--te-dark)] uppercase tracking-wide">{item.name}</p>
                                                        <p className="text-[10px] text-[var(--te-grey-400)] mt-0.5 tracking-wide">{item.category}</p>
                                                        <p className="text-sm font-bold text-[var(--te-dark)] mt-1 font-[family-name:var(--font-jetbrains)]">{currency}{item.price}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="text-center py-4">
                                                <Counter productId={item.id} />
                                            </td>
                                            <td className="text-center py-4">
                                                <span className="font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">
                                                    {currency}{(item.price * item.quantity).toLocaleString()}
                                                </span>
                                            </td>
                                            <td className="text-center max-md:hidden py-4">
                                                <button 
                                                    onClick={() => handleDeleteItemFromCart(item.id)} 
                                                    className="text-[var(--te-grey-400)] hover:text-[var(--te-red)] p-2 rounded-sm hover:bg-[var(--te-cream)] active:scale-95 transition-all"
                                                >
                                                    <Trash2Icon size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                    </div>
                    
                    <OrderSummary totalPrice={totalPrice} items={cartArray} />
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-[80vh] mx-6 flex flex-col items-center justify-center text-[var(--te-grey-300)]">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-4">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="m1 1 4 4m0 0 2.68 9.39a2 2 0 0 0 1.92 1.45h9.78a2 2 0 0 0 1.92-1.45L23 6H6"/>
                </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-widest">Cart Empty</h1>
            <p className="text-sm text-[var(--te-grey-400)] mt-2 tracking-wide">Add some products to get started</p>
        </div>
    )
}
