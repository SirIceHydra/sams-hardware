'use client'
import { usePathname } from "next/navigation"
import { HomeIcon, LayoutListIcon, SquarePenIcon, SquarePlusIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const StoreSidebar = ({storeInfo}) => {

    const pathname = usePathname()

    const sidebarLinks = [
        { name: 'Dashboard', href: '/store', icon: HomeIcon },
        { name: 'Add Product', href: '/store/add-product', icon: SquarePlusIcon },
        { name: 'Manage Product', href: '/store/manage-product', icon: SquarePenIcon },
        { name: 'Orders', href: '/store/orders', icon: LayoutListIcon },
    ]

    return (
        <div className="inline-flex h-full flex-col border-r border-[var(--te-grey-200)] bg-[var(--te-cream)] sm:min-w-56">
            {/* Store info */}
            <div className="hidden sm:flex flex-col items-center pt-6 pb-4 px-4 border-b border-[var(--te-grey-200)]">
                <div className="w-14 h-14 rounded-full border-2 border-[var(--te-grey-200)] overflow-hidden mb-3">
                    <Image className="w-full h-full object-cover" src={storeInfo?.logo} alt="" width={80} height={80} />
                </div>
                <p className="text-sm font-semibold text-[var(--te-dark)] tracking-wide uppercase">{storeInfo?.name}</p>
            </div>

            {/* Navigation */}
            <nav className="max-sm:mt-4 px-2 sm:px-3 pt-4">
                <span className="hidden sm:block text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase px-3 mb-3">Navigation</span>
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

export default StoreSidebar