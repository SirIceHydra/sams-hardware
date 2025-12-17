'use client'
import Banner from "@/components/Banner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

export default function PublicLayout({ children }) {
    return (
        <div className="min-h-screen flex flex-col bg-[var(--te-white)]">
            <Navbar />
            <ScrollProgress />
            <Banner />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
        </div>
    );
}
