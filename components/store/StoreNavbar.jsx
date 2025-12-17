'use client'
import Link from "next/link"

const StoreNavbar = () => {


    return (
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 bg-[var(--te-dark)] border-b border-[var(--te-grey-500)]">
            <Link href="/" className="flex items-center gap-3">
                {/* Logo mark */}
                <div className="flex items-center justify-center w-9 h-9 bg-[var(--te-orange)] rounded-sm">
                    <span className="text-white font-bold text-base font-[family-name:var(--font-jetbrains)]">S</span>
                </div>
                <div className="hidden sm:block">
                    <span className="text-[var(--te-white)] font-bold text-xs tracking-widest uppercase">SAM'S</span>
                    <span className="block text-[var(--te-grey-300)] text-[9px] tracking-[0.2em] uppercase font-medium">HARDWARE</span>
                </div>
                {/* Store badge */}
                <span className="ml-2 text-[9px] font-bold px-2 py-1 rounded-sm bg-[var(--te-green)] text-[var(--te-dark)] tracking-widest uppercase">
                    Store
                </span>
            </Link>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 6px var(--te-green)' }} />
                    <span className="text-xs text-[var(--te-grey-300)] font-medium tracking-wide">Hi, Seller</span>
                </div>
            </div>
        </div>
    )
}

export default StoreNavbar