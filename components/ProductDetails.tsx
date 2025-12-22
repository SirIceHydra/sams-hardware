'use client'

import { TagIcon, EarthIcon, CreditCardIcon, UserIcon, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Counter from "./Counter";
import { useShop } from "@/shop/core/ShopProvider";
import { formatPrice } from "@/shop/utils/helpers";
import toast from "react-hot-toast";
import type { Product, ProductVariation } from "@/shop/core/ports";
import { getProduct } from "@/services/woocommerce";

const ProductDetails = ({ product: initialProduct }: { product: Product }) => {
    const [product, setProduct] = useState(initialProduct);

    // Sync with prop updates
    useEffect(() => {
        setProduct(initialProduct);
    }, [initialProduct]);

    // Enhanced stock check on mount
    useEffect(() => {
        const checkStock = async () => {
            try {
                if (product.id) {
                    const freshProduct = await getProduct(product.id);
                    if (freshProduct) {
                        setProduct(freshProduct);
                    }
                }
            } catch (error) {
                console.error('Failed to refresh stock status', error);
            }
        };
        checkStock();
    }, [product.id]);

    const productId = product.id;
    const currency = process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || 'R';
    const { cart } = useShop();
    const { addItem, isInCart, getItemQuantity } = cart;
    const router = useRouter();

    // Variation state
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({});
    const [selectedVariation, setSelectedVariation] = useState<ProductVariation | null>(null);

    // Get first image or placeholder
    const firstImage = product.images && product.images.length > 0 ? product.images[0] : '/Images/product-placeholder.png';
    const [mainImage, setMainImage] = useState(firstImage);

    // Initialize default attributes if available
    useEffect(() => {
        if (product.defaultAttributes) {
            setSelectedAttributes(product.defaultAttributes);
        } else if (product.variationAttributes) {
            // Optional: Auto-select first option for each attribute if no defaults
            const defaults: Record<string, string> = {};
            // Object.keys(product.variationAttributes).forEach(key => {
            //     if (product.variationAttributes![key].length > 0) {
            //         defaults[key] = product.variationAttributes![key][0];
            //     }
            // });
            // setSelectedAttributes(defaults);
        }
    }, [product]);

    // Update main image when product changes
    useEffect(() => {
        if (product.images && product.images.length > 0) {
            setMainImage(product.images[0]);
        }
    }, [product]);

    // Find matching variation when attributes change
    useEffect(() => {
        if (!product.variations || !product.hasVariations) return;

        // Check if all attributes are selected
        const allAttributesSelected = product.variationAttributes 
            ? Object.keys(product.variationAttributes).every(key => selectedAttributes[key])
            : false;

        if (allAttributesSelected) {
            const match = product.variations.find(v => {
                // Robust matching: Check if all variation attributes match selected attributes
                // Handles case sensitivity and potential key mismatches
                return Object.entries(v.attributes).every(([vKey, vValue]) => {
                    // 1. Exact match
                    if (selectedAttributes[vKey] === vValue) return true;

                    // 2. Case-insensitive key match
                    const selectedKey = Object.keys(selectedAttributes).find(
                        k => k.toLowerCase() === vKey.toLowerCase()
                    );
                    if (selectedKey && selectedAttributes[selectedKey] === vValue) return true;

                    return false;
                });
            });

            setSelectedVariation(match || null);

            if (match && match.image?.src) {
                setMainImage(match.image.src);
            } else if (product.images && product.images.length > 0) {
                // Revert to product image if variation has no image
                setMainImage(product.images[0]);
            }
        } else {
            setSelectedVariation(null);
        }
    }, [selectedAttributes, product]);

    const handleAttributeChange = (attribute: string, value: string) => {
        setSelectedAttributes(prev => ({
            ...prev,
            [attribute]: value
        }));
    };

    const addToCartHandler = () => {
        // Validation for variable products
        if (product.hasVariations) {
            const missingAttributes = product.variationAttributes 
                ? Object.keys(product.variationAttributes).filter(key => !selectedAttributes[key])
                : [];
            
            if (missingAttributes.length > 0) {
                toast.error(`Please select ${missingAttributes.join(', ')}`);
                return;
            }

            if (!selectedVariation) {
                toast.error('This combination is unavailable');
                return;
            }

            if (selectedVariation.stockStatus === 'outofstock') {
                toast.error('This variation is out of stock');
                return;
            }
        } else if (product.stockStatus === 'outofstock') {
            toast.error('This product is out of stock');
            return;
        }
        
        // Pass variation data if applicable
        const success = addItem(
            product, 
            1, 
            selectedVariation?.id, 
            selectedVariation ? selectedAttributes : undefined
        );

        if (success) {
            toast.success('Added to cart');
        } else {
            toast.error('Could not add to cart');
        }
    }

    // Handle rating - API products might not have rating
    const hasRating = product && 'rating' in product && Array.isArray((product as any).rating) && (product as any).rating.length > 0;
    const averageRating = hasRating 
        ? (product as any).rating.reduce((acc: number, item: any) => acc + item.rating, 0) / (product as any).rating.length 
        : 0;
    const ratingCount = hasRating ? (product as any).rating.length : 0;

    // Get category - handle both old format (category) and new format (categories array)
    const category = (product as any).category || (product.categories && product.categories.length > 0 ? product.categories[0] : '');

    // Get price - handle both old format (mrp) and new format (regularPrice)
    // Use variation price if selected, otherwise product price
    const activePriceObject = selectedVariation || product;
    
    const regularPrice = (activePriceObject as any).mrp || activePriceObject.regularPrice || activePriceObject.price;
    const currentPrice = activePriceObject.onSale && activePriceObject.salePrice ? activePriceObject.salePrice : activePriceObject.price;
    const savingsPercent = regularPrice > currentPrice ? ((regularPrice - currentPrice) / regularPrice * 100) : 0;
    const savings = savingsPercent > 0 ? savingsPercent.toFixed(0) : '0';
    
    // Stock status logic
    const currentStockStatus = selectedVariation ? selectedVariation.stockStatus : product.stockStatus;
    const currentStockQuantity = selectedVariation ? selectedVariation.stockQuantity : product.stockQuantity;
    const isOutOfStock = currentStockStatus === 'outofstock' || (currentStockQuantity !== undefined && currentStockQuantity !== null && currentStockQuantity === 0);

    const isInCartCheck = selectedVariation 
        ? isInCart(productId, selectedVariation.id)
        : isInCart(productId);
        
    const cartQuantity = selectedVariation
        ? getItemQuantity(productId, selectedVariation.id)
        : getItemQuantity(productId);
    
    return (
        <div className="flex max-lg:flex-col gap-8 lg:gap-12 py-6">
            {/* Images */}
            <div className="flex max-sm:flex-col-reverse gap-3">
                {/* Thumbnails */}
                {product.images && product.images.length > 0 && (
                    <div className="flex sm:flex-col gap-2">
                        {product.images.map((image, index) => (
                            <div 
                                key={index} 
                                onClick={() => setMainImage(image)} 
                                className={`bg-[var(--te-cream)] flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-sm group cursor-pointer border-2 transition-all ${mainImage === image ? 'border-[var(--te-yellow)]' : 'border-[var(--te-grey-200)] hover:border-[var(--te-grey-300)]'}`}
                            >
                                <Image src={image} className="max-w-[70%] max-h-[70%] object-contain group-hover:scale-105 transition" alt={product.name} width={45} height={45} />
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Main Image */}
                <div className="flex justify-center items-center h-80 sm:h-[400px] w-full sm:w-[400px] bg-[var(--te-cream)] rounded-sm border border-[var(--te-grey-200)] relative">
                    {/* Corner accents */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-[var(--te-grey-300)]" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-[var(--te-grey-300)]" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-[var(--te-grey-300)]" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-[var(--te-grey-300)]" />
                    <Image src={mainImage} alt="" width={250} height={250} className="max-w-[80%] max-h-[80%] object-contain" />
                </div>
            </div>
            
            {/* Details */}
            <div className="flex-1">
                {/* Category label */}
                {category && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--te-yellow)]" style={{ boxShadow: '0 0 6px var(--te-yellow-glow)' }} />
                        <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">{category}</span>
                    </div>
                )}
                
                <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight">{product.name}</h1>
                
                {/* Rating - LED style dots */}
                {hasRating && (
                    <div className='flex items-center gap-3 mt-3'>
                        <div className="flex gap-1">
                            {Array(5).fill('').map((_, index) => (
                                <div 
                                    key={index} 
                                    className={`w-2 h-2 rounded-full ${averageRating >= index + 1 ? 'bg-[var(--te-green)]' : 'bg-[var(--te-grey-200)]'}`}
                                    style={averageRating >= index + 1 ? { boxShadow: '0 0 4px var(--te-green)' } : {}}
                                />
                            ))}
                        </div>
                        <span className="text-[10px] text-[var(--te-grey-400)] font-medium tracking-widest uppercase">{ratingCount} Reviews</span>
                    </div>
                )}
                
                {/* Stock Status */}
                {isOutOfStock ? (
                    <div className="mt-3 inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-sm px-3 py-1.5">
                        <span className="text-xs font-semibold text-red-600 tracking-wide">Out of Stock</span>
                    </div>
                ) : (
                    <div className="mt-3 inline-flex items-center gap-2 bg-[var(--te-green)]/10 border border-[var(--te-green)]/20 rounded-sm px-3 py-1.5">
                        <span className="text-xs font-semibold text-[var(--te-green)] tracking-wide">
                            {currentStockQuantity !== undefined && currentStockQuantity !== null
                                ? `${currentStockQuantity} in stock`
                                : 'In Stock'}
                        </span>
                    </div>
                )}
                
                {/* Price */}
                <div className="flex flex-col gap-1 my-6">
                    <span className="text-[10px] text-[var(--te-grey-400)] font-medium tracking-widest uppercase">Price</span>
                    <div className="flex flex-col">
                        {product.onSale && regularPrice > currentPrice && (
                            <span className="text-lg text-[var(--te-grey-300)] line-through font-[family-name:var(--font-jetbrains)] mb-0.5">{formatPrice(regularPrice)}</span>
                        )}
                        <span className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)] leading-none">{formatPrice(currentPrice)}</span>
                    </div>
                </div>
                
                {/* Savings badge */}
                {product.onSale && savingsPercent > 0 && (
                    <div className="inline-flex items-center gap-2 bg-[var(--te-yellow)]/10 border border-[var(--te-yellow)]/30 rounded-sm px-3 py-1.5 text-[var(--te-dark)] mb-6">
                        <TagIcon size={12} className="text-[var(--te-yellow)]" />
                        <span className="text-xs font-semibold tracking-wide">Save {savings}% right now</span>
                    </div>
                )}

                {/* Variations */}
                {product.hasVariations && product.variationAttributes && (
                    <div className="flex flex-col gap-4 mb-8">
                        {Object.entries(product.variationAttributes).map(([name, options]) => (
                            <div key={name} className="flex flex-col gap-2">
                                <label className="text-xs font-bold text-[var(--te-dark)] uppercase tracking-wider">
                                    {name}
                                </label>
                                <div className="relative max-w-xs">
                                    <select
                                        value={selectedAttributes[name] || ''}
                                        onChange={(e) => handleAttributeChange(name, e.target.value)}
                                        className="w-full appearance-none bg-[var(--te-white)] border-2 border-[var(--te-grey-200)] text-[var(--te-dark)] text-sm font-medium py-3 px-4 rounded-none focus:border-[var(--te-yellow)] focus:outline-none transition-colors cursor-pointer uppercase tracking-wide"
                                    >
                                        <option value="">Select {name}</option>
                                        {options.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-[var(--te-grey-400)]">
                                        <ChevronDown size={16} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                
                {/* Add to Cart section */}
                <div className="flex items-end gap-4 mt-8">
                    {isInCartCheck && (
                        <div className="flex flex-col gap-2">
                            <span className="text-[10px] text-[var(--te-grey-400)] font-semibold tracking-widest uppercase">Quantity</span>
                            <Counter 
                                productId={productId} 
                                variationId={selectedVariation?.id}
                            />
                        </div>
                    )}
                    <button 
                        onClick={() => !isInCartCheck ? addToCartHandler() : router.push('/cart')} 
                        disabled={isOutOfStock}
                        className="bg-[var(--te-yellow)] text-[var(--te-dark)] px-8 sm:px-10 py-3.5 text-xs font-bold hover:bg-[var(--te-yellow-light)] active:scale-[0.98] transition-all tracking-widest uppercase disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ boxShadow: '0 4px 0 var(--te-yellow-dark), 0 8px 20px rgba(248, 204, 40, 0.3)' }}
                    >
                        {isOutOfStock 
                            ? 'Out of Stock' 
                            : !isInCartCheck 
                                ? 'Add to Cart' 
                                : 'View Cart'
                        }
                    </button>
                </div>
                
                {/* Divider */}
                <hr className="border-[var(--te-grey-200)] my-6" />
                
                {/* Features */}
                <div className="flex flex-col gap-3 text-xs text-[var(--te-grey-400)]">
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <EarthIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">Free shipping worldwide</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <CreditCardIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">100% Secured Payment</span>
                    </p>
                    <p className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-sm bg-[var(--te-cream)] border border-[var(--te-grey-200)] flex items-center justify-center">
                            <UserIcon size={14} className="text-[var(--te-grey-400)]" />
                        </span>
                        <span className="font-medium tracking-wide">Trusted by top brands</span>
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ProductDetails
