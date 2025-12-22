'use client'
import { useShop } from "@/shop/core/ShopProvider";

const Counter = ({ productId, variationId }) => {
    const { cart } = useShop();
    const { updateQuantity, getItemQuantity } = cart;

    // Get current quantity from cart
    const currentQuantity = getItemQuantity(productId, variationId);

    const decreaseQuantity = () => {
        const newQuantity = currentQuantity - 1;
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity, variationId);
        } else {
            // Keep minimum at 1 (don't allow going to 0)
            updateQuantity(productId, 1, variationId);
        }
    }

    const increaseQuantity = () => {
        updateQuantity(productId, currentQuantity + 1, variationId);
    }

    // Ensure we always show at least 1 (shouldn't happen if item is in cart, but safety check)
    const displayQuantity = currentQuantity > 0 ? currentQuantity : 1;

    return (
        <div className="inline-flex items-center gap-0 border border-[var(--te-grey-200)] rounded-sm overflow-hidden text-[var(--te-dark)]">
            <button 
                onClick={decreaseQuantity} 
                className="px-3 py-1.5 text-sm font-bold select-none bg-[var(--te-cream)] hover:bg-[var(--te-grey-200)] transition-colors active:scale-95"
            >
                −
            </button>
            <p className="px-4 py-1.5 text-sm font-bold font-[family-name:var(--font-jetbrains)] bg-[var(--te-white)] min-w-[40px] text-center">
                {displayQuantity}
            </p>
            <button 
                onClick={increaseQuantity} 
                className="px-3 py-1.5 text-sm font-bold select-none bg-[var(--te-cream)] hover:bg-[var(--te-grey-200)] transition-colors active:scale-95"
            >
                +
            </button>
        </div>
    )
}

export default Counter
