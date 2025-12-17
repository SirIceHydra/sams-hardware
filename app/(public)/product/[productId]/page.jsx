'use client'
import ProductDescription from "@/components/ProductDescription";
import ProductDetails from "@/components/ProductDetails";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Product() {

    const { productId } = useParams();
    const [product, setProduct] = useState();
    const products = useSelector(state => state.product.list);

    const fetchProduct = async () => {
        const product = products.find((product) => product.id === productId);
        setProduct(product);
    }

    useEffect(() => {
        if (products.length > 0) {
            fetchProduct()
        }
        scrollTo(0, 0)
    }, [productId, products]);

    return (
        <div className="mx-4 sm:mx-6">
            <div className="max-w-7xl mx-auto">

                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-[10px] font-medium tracking-widest uppercase mt-6 mb-5 text-[var(--te-grey-400)]">
                    <Link href="/" className="hover:text-[var(--te-orange)] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/shop" className="hover:text-[var(--te-orange)] transition-colors">Products</Link>
                    <span>/</span>
                    <span className="text-[var(--te-dark)]">{product?.category}</span>
                </div>

                {/* Product Details */}
                {product && (<ProductDetails product={product} />)}

                {/* Description & Reviews */}
                {product && (<ProductDescription product={product} />)}
            </div>
        </div>
    );
}
