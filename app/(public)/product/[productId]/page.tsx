'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { StructuredData } from "@/components/StructuredData";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getProduct } from "@/services/woocommerce";
import { LoadingSpinner } from "@/shop/ui/LoadingSpinner";
import type { Product } from "@/shop/core/ports";

export default function Product() {
    const { productId } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!productId) return;
            
            setLoading(true);
            setError(null);
            
            try {
                // Handle both string and string[] from useParams
                const idString = Array.isArray(productId) ? productId[0] : productId;
                if (!idString) {
                    setError('Invalid product ID');
                    setLoading(false);
                    return;
                }
                
                const id = parseInt(idString, 10);
                if (isNaN(id)) {
                    setError('Invalid product ID');
                    setLoading(false);
                    return;
                }
                
                const productData = await getProduct(id);
                setProduct(productData);
            } catch (err: any) {
                console.error('Error fetching product:', err);
                setError(err?.message || 'Failed to load product');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        scrollTo(0, 0);
    }, [productId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" text="Loading product..." />
            </div>
        );
    }

    if (error) {
        return (
            <div className="mx-4 sm:mx-6">
                <div className="max-w-7xl mx-auto py-16">
                    <div className="te-panel-dark p-8 text-center">
                        <h2 className="text-2xl font-bold text-te-white mb-4">Product Not Found</h2>
                        <p className="text-te-white/70 mb-6">{error}</p>
                        <Link href="/shop">
                            <button className="te-button-primary">Back to Shop</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return null;
    }

    return (
        <div className="mx-4 sm:mx-6">
            <StructuredData type="product" product={product} />
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase mt-6 mb-5 text-[var(--te-grey-400)]">
                    <Link href="/" className="hover:text-[var(--te-orange)] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-[var(--te-orange)] transition-colors">Products</Link>
                    {product.categories && product.categories.length > 0 && (
                        <>
                            <span>/</span>
                            <span className="text-[var(--te-dark)]">{product.categories[0]}</span>
                        </>
                    )}
                </div>

                {/* Product Details */}
                <ProductDetails product={product} />

                {/* Description & Reviews */}
                <ProductDescription product={product} />
            </div>
        </div>
    );
}
