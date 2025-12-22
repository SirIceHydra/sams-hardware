'use client'
import { useEffect, useState } from "react"
import Link from "next/link"
import Banner from "@/components/Banner"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import ScrollProgress from "@/components/ScrollProgress"
import { StructuredData } from "@/components/StructuredData"
import { storage } from "@/shop/utils/helpers"
import { STORAGE_KEYS } from "@/shop/utils/constants"
import { Cookie, X } from "lucide-react"

export default function PublicLayout({ children }) {
    const [showCookie, setShowCookie] = useState(false)
    
    useEffect(() => {
        const consent = storage.get(STORAGE_KEYS.COOKIE_CONSENT)
        setShowCookie(!consent || !consent.accepted)
    }, [])
    
    const acceptCookies = () => {
        storage.set(STORAGE_KEYS.COOKIE_CONSENT, {
            accepted: true,
            date: new Date().toISOString(),
        })
        setShowCookie(false)
    }
    
    const closeCookie = () => setShowCookie(false)
    
    return (
        <div className="min-h-screen flex flex-col bg-[var(--te-white)]">
            <StructuredData type="business" />
            <Navbar />
            <ScrollProgress />
            <Banner />
            <main className="flex-1">
                {children}
            </main>
            <Footer />
            
            {showCookie && (
                <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-[440px] z-[10000]">
                    <div className="te-panel-dark rounded-md shadow-lg">
                        <div className="flex items-start gap-4 p-5">
                            <div className="flex items-center justify-center w-10 h-10 bg-[var(--te-charcoal)] border border-[var(--te-grey-500)] text-[var(--te-yellow)]">
                                <Cookie size={18} />
                            </div>
                            <div className="flex-1">
                                <h3 className="text-sm font-bold text-[var(--te-white)] tracking-[0.2em] uppercase mb-2">Cookies</h3>
                                <p className="text-sm text-[var(--te-grey-300)]">
                                    We use essential and performance cookies to operate and improve your shopping experience. See our{" "}
                                    <Link href="/cookies" className="text-[var(--te-yellow)] underline underline-offset-4">Cookies Policy</Link>{" "}
                                    and{" "}
                                    <Link href="/privacy" className="text-[var(--te-yellow)] underline underline-offset-4">Privacy Policy</Link>.
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <button onClick={acceptCookies} className="te-button te-button-primary">Accept Cookies</button>
                                    <Link href="/cookies" className="te-button te-button-ghost">Learn More</Link>
                                </div>
                            </div>
                            <button onClick={closeCookie} aria-label="Close" className="text-[var(--te-grey-400)] hover:text-[var(--te-yellow)] transition-colors">
                                <X size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
