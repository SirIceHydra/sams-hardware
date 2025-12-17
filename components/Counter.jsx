'use client'
import { addToCart, removeFromCart } from "@/lib/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = ({ productId }) => {

    const { cartItems } = useSelector(state => state.cart);

    const dispatch = useDispatch();

    const addToCartHandler = () => {
        dispatch(addToCart({ productId }))
    }

    const removeFromCartHandler = () => {
        dispatch(removeFromCart({ productId }))
    }

    return (
        <div className="inline-flex items-center gap-0 border border-[var(--te-grey-200)] rounded-sm overflow-hidden text-[var(--te-dark)]">
            <button 
                onClick={removeFromCartHandler} 
                className="px-3 py-1.5 text-sm font-bold select-none bg-[var(--te-cream)] hover:bg-[var(--te-grey-200)] transition-colors active:scale-95"
            >
                −
            </button>
            <p className="px-4 py-1.5 text-sm font-bold font-[family-name:var(--font-jetbrains)] bg-[var(--te-white)] min-w-[40px] text-center">
                {cartItems[productId]}
            </p>
            <button 
                onClick={addToCartHandler} 
                className="px-3 py-1.5 text-sm font-bold select-none bg-[var(--te-cream)] hover:bg-[var(--te-grey-200)] transition-colors active:scale-95"
            >
                +
            </button>
        </div>
    )
}

export default Counter
