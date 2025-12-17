'use client'
import Image from "next/image"
import { MapPin, Mail, Phone } from "lucide-react"

const StoreInfo = ({store}) => {
    
    const getStatusStyles = (status) => {
        switch(status) {
            case 'pending':
                return 'bg-[var(--te-yellow)]/10 text-[var(--te-yellow)] border-[var(--te-yellow)]/20';
            case 'rejected':
                return 'bg-[var(--te-orange)]/10 text-[var(--te-orange)] border-[var(--te-orange)]/20';
            default:
                return 'bg-[var(--te-green)]/10 text-[var(--te-green)] border-[var(--te-green)]/20';
        }
    }
    
    return (
        <div className="flex-1 space-y-3 text-sm">
            <div className="w-16 h-16 rounded-full border-2 border-[var(--te-grey-200)] overflow-hidden bg-[var(--te-white)]">
                <Image width={64} height={64} src={store.logo} alt={store.name} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <h3 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-wide">{store.name}</h3>
                <span className="text-xs text-[var(--te-grey-400)] font-[family-name:var(--font-jetbrains)]">@{store.username}</span>

                {/* Status Badge */}
                <span className={`text-[10px] font-bold px-3 py-1 rounded-sm border tracking-widest uppercase ${getStatusStyles(store.status)}`}>
                    {store.status}
                </span>
            </div>

            <p className="text-[var(--te-grey-400)] font-medium tracking-wide max-w-2xl leading-relaxed">{store.description}</p>
            
            <div className="space-y-2 pt-2">
                <p className="flex items-center gap-3 text-xs text-[var(--te-grey-400)]">
                    <span className="w-7 h-7 bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm flex items-center justify-center">
                        <MapPin size={14} className="text-[var(--te-grey-400)]" />
                    </span>
                    <span className="font-medium tracking-wide">{store.address}</span>
                </p>
                <p className="flex items-center gap-3 text-xs text-[var(--te-grey-400)]">
                    <span className="w-7 h-7 bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm flex items-center justify-center">
                        <Phone size={14} className="text-[var(--te-grey-400)]" />
                    </span>
                    <span className="font-medium tracking-wide font-[family-name:var(--font-jetbrains)]">{store.contact}</span>
                </p>
                <p className="flex items-center gap-3 text-xs text-[var(--te-grey-400)]">
                    <span className="w-7 h-7 bg-[var(--te-white)] border border-[var(--te-grey-200)] rounded-sm flex items-center justify-center">
                        <Mail size={14} className="text-[var(--te-grey-400)]" />
                    </span>
                    <span className="font-medium tracking-wide">{store.email}</span>
                </p>
            </div>
            
            <div className="pt-4 border-t border-[var(--te-grey-200)] mt-4">
                <p className="text-[10px] text-[var(--te-grey-400)] tracking-widest uppercase mb-2">
                    Applied on <span className="font-[family-name:var(--font-jetbrains)]">{new Date(store.createdAt).toLocaleDateString()}</span>
                </p>
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full border border-[var(--te-grey-200)] overflow-hidden">
                        <Image width={36} height={36} src={store.user.image} alt={store.user.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-[var(--te-dark)] tracking-wide">{store.user.name}</p>
                        <p className="text-[10px] text-[var(--te-grey-400)]">{store.user.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StoreInfo