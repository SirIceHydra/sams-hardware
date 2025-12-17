'use client'
import { useEffect, useState } from "react"
import Loading from "../Loading"
import Link from "next/link"
import { ArrowRightIcon } from "lucide-react"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"

const AdminLayout = ({ children }) => {

    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(true)

    const fetchIsAdmin = async () => {
        setIsAdmin(true)
        setLoading(false)
    }

    useEffect(() => {
        fetchIsAdmin()
    }, [])

    return loading ? (
        <Loading />
    ) : isAdmin ? (
        <div className="flex flex-col h-screen bg-[var(--te-white)]">
            <AdminNavbar />
            <div className="flex flex-1 items-start h-full overflow-y-scroll no-scrollbar">
                <AdminSidebar />
                <div className="flex-1 h-full p-5 lg:pl-10 lg:pt-8 overflow-y-scroll bg-[var(--te-white)]">
                    {children}
                </div>
            </div>
        </div>
    ) : (
        <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-[var(--te-white)]">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] flex items-center justify-center mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--te-orange)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                </svg>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[var(--te-dark)] uppercase tracking-tight mb-2">Access Denied</h1>
            <p className="text-sm text-[var(--te-grey-400)] font-medium tracking-wide mb-8">You are not authorized to access this page</p>
            <Link 
                href="/" 
                className="bg-[var(--te-orange)] text-white flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-[var(--te-dark)] active:scale-[0.98] transition-all"
                style={{ boxShadow: '0 3px 0 rgba(200, 60, 0, 0.4)' }}
            >
                Go to home <ArrowRightIcon size={14} />
            </Link>
        </div>
    )
}

export default AdminLayout