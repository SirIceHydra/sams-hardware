'use client'
import BestSelling from "@/components/BestSelling";
import Hero from "@/components/Hero";
import OurSpecs from "@/components/OurSpec";
import LatestProducts from "@/components/LatestProducts";
import HeroCard from "@/components/HeroCard";
import Reviews from "@/components/Reviews";

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
