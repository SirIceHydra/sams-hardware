'use client'

import AnimatedTitle from "@/components/AnimatedTitle"
import { CheckIcon } from "lucide-react"

export default function PricingPage() {
    
    const plans = [
        {
            name: "Starter",
            price: "0",
            period: "Forever free",
            description: "Perfect for individuals getting started",
            features: [
                "Up to 10 products",
                "Basic analytics",
                "Email support",
                "Community access"
            ],
            accent: false,
            buttonText: "Get Started"
        },
        {
            name: "Pro",
            price: "29",
            period: "/month",
            description: "For growing businesses",
            features: [
                "Unlimited products",
                "Advanced analytics",
                "Priority support",
                "Custom domain",
                "Remove branding",
                "API access"
            ],
            accent: true,
            buttonText: "Go Pro"
        },
        {
            name: "Enterprise",
            price: "99",
            period: "/month",
            description: "For large organizations",
            features: [
                "Everything in Pro",
                "Dedicated account manager",
                "Custom integrations",
                "SLA guarantee",
                "Advanced security",
                "White-label solution"
            ],
            accent: false,
            buttonText: "Contact Sales"
        }
    ]
    
    return (
        <div className='mx-auto max-w-6xl px-4 sm:px-6 py-10'>
            <AnimatedTitle title="Pricing" />
            
            <p className="text-center text-[var(--te-grey-400)] text-sm font-medium tracking-wide max-w-xl mx-auto mb-12">
                Choose the plan that's right for your business. All plans include our core features.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                {plans.map((plan, index) => (
                    <div 
                        key={index}
                        className={`relative rounded-sm p-6 sm:p-8 border transition-all ${
                            plan.accent 
                                ? 'bg-[var(--te-dark)] border-[var(--te-grey-500)]' 
                                : 'bg-[var(--te-cream)] border-[var(--te-grey-200)] hover:border-[var(--te-orange)]'
                        }`}
                    >
                        {/* Top accent bar for featured plan */}
                        {plan.accent && (
                            <div className="absolute top-0 left-0 right-0 h-1 bg-[var(--te-orange)]" />
                        )}
                        
                        {/* Plan name */}
                        <div className="flex items-center gap-2 mb-4">
                            <div 
                                className={`w-2 h-2 rounded-full ${plan.accent ? 'bg-[var(--te-orange)]' : 'bg-[var(--te-grey-300)]'}`}
                                style={plan.accent ? { boxShadow: '0 0 8px var(--te-orange)' } : {}}
                            />
                            <span className={`text-[10px] font-semibold tracking-[0.2em] uppercase ${
                                plan.accent ? 'text-[var(--te-grey-300)]' : 'text-[var(--te-grey-400)]'
                            }`}>
                                {plan.name}
                            </span>
                        </div>
                        
                        {/* Price */}
                        <div className="flex items-baseline gap-1 mb-2">
                            <span className={`text-3xl sm:text-4xl font-bold font-[family-name:var(--font-jetbrains)] ${
                                plan.accent ? 'text-[var(--te-white)]' : 'text-[var(--te-dark)]'
                            }`}>
                                ${plan.price}
                            </span>
                            <span className={`text-sm font-medium ${
                                plan.accent ? 'text-[var(--te-grey-300)]' : 'text-[var(--te-grey-400)]'
                            }`}>
                                {plan.period}
                            </span>
                        </div>
                        
                        {/* Description */}
                        <p className={`text-sm font-medium tracking-wide mb-6 ${
                            plan.accent ? 'text-[var(--te-grey-300)]' : 'text-[var(--te-grey-400)]'
                        }`}>
                            {plan.description}
                        </p>
                        
                        {/* Features */}
                        <ul className="space-y-3 mb-8">
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                                        plan.accent 
                                            ? 'bg-[var(--te-orange)]/20' 
                                            : 'bg-[var(--te-grey-200)]'
                                    }`}>
                                        <CheckIcon size={10} className={
                                            plan.accent ? 'text-[var(--te-orange)]' : 'text-[var(--te-grey-400)]'
                                        } />
                                    </div>
                                    <span className={`text-xs font-medium tracking-wide ${
                                        plan.accent ? 'text-[var(--te-grey-200)]' : 'text-[var(--te-grey-400)]'
                                    }`}>
                                        {feature}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        
                        {/* CTA Button */}
                        <button 
                            className={`w-full py-3 rounded-sm text-xs font-bold tracking-widest uppercase transition-all active:scale-[0.98] ${
                                plan.accent 
                                    ? 'bg-[var(--te-orange)] text-white hover:bg-[var(--te-orange-light)]' 
                                    : 'bg-[var(--te-dark)] text-white hover:bg-[var(--te-grey-500)]'
                            }`}
                            style={{ boxShadow: plan.accent ? '0 3px 0 rgba(200, 60, 0, 0.4)' : '0 3px 0 rgba(0, 0, 0, 0.3)' }}
                        >
                            {plan.buttonText}
                        </button>
                    </div>
                ))}
            </div>
            
            {/* Bottom note */}
            <div className="mt-12 text-center">
                <p className="text-[10px] text-[var(--te-grey-400)] font-medium tracking-widest uppercase">
                    All prices in USD. Cancel anytime.
                </p>
            </div>
        </div>
    )
}