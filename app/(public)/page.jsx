'use client'
import { Metadata } from 'next'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import HeroCard from "@/components/HeroCard";
import Reviews from "@/components/Reviews";

// Note: Metadata export doesn't work with 'use client'
// We'll handle SEO via the root layout and structured data

export default function Home() {
    return (
        <div>
            <Hero />
            <LatestProducts />
            <HeroCard />
            <BestSelling />
            <OurSpecs />
            <Reviews />
        </div>
    );
}
