'use client'

import { usePathname } from "next/navigation"
import { HomeIcon, ShieldCheckIcon, StoreIcon, TicketPercentIcon } from "lucide-react"
import Link from "next/link"

const AdminSidebar = () => {

    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/admin', icon: HomeIcon },
        { name: 'Stores', href: '/admin/stores', icon: StoreIcon },
        { name: 'Approve Store', href: '/admin/approve', icon: ShieldCheckIcon },
        { name: 'Coupons', href: '/admin/coupons', icon: TicketPercentIcon  },
    ]

    return (
        <div className="inline-flex h-full flex-col border-r border-[var(--te-grey-200)] bg-[var(--te-cream)] sm:min-w-56">
            {/* Section label */}
            <div className="hidden sm:block px-6 pt-6 pb-3">
                <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">Navigation</span>
            </div>

            <nav className="max-sm:mt-4 px-2 sm:px-3">
                {
                    sidebarLinks.map((link, index) => (
                        <Link 
                            key={index} 
                            href={link.href} 
                            className={`relative flex items-center gap-3 text-[var(--te-grey-400)] hover:text-[var(--te-dark)] hover:bg-[var(--te-white)] p-3 rounded-sm transition-colors mb-1 ${
                                pathname === link.href 
                                    ? 'bg-[var(--te-white)] text-[var(--te-dark)] border border-[var(--te-grey-200)]' 
                                    : ''
                            }`}
                        >
                            {/* Active indicator */}
                            {pathname === link.href && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--te-yellow)] rounded-r-sm" />
                            )}
                            <link.icon size={16} className="sm:ml-2" strokeWidth={pathname === link.href ? 2 : 1.5} />
                            <span className="max-sm:hidden text-xs font-medium tracking-wide uppercase">{link.name}</span>
                        </Link>
                    ))
                }
            </nav>
        </div>
    )
}

export default AdminSidebar