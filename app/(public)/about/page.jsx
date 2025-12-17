'use client'

import AnimatedTitle from "@/components/AnimatedTitle";

export default function AboutPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="About Us" />
            
            <div className="max-w-3xl mx-auto">
                {/* Stats row */}
                <div className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-10 pb-10 border-b border-[var(--te-grey-200)]">
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">15+</div>
                        <div className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase mt-1">Years</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">10K+</div>
                        <div className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase mt-1">Customers</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl sm:text-3xl font-bold text-[var(--te-dark)] font-[family-name:var(--font-jetbrains)]">5K+</div>
                        <div className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-widest uppercase mt-1">Products</div>
                    </div>
                </div>
                
                {/* Content sections */}
                <section className="space-y-6 text-[var(--te-grey-400)] text-sm leading-relaxed tracking-wide">
                    <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--te-orange)]" style={{ boxShadow: '0 0 8px var(--te-orange)' }} />
                            <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">Our Mission</span>
                        </div>
                        <p className="text-[var(--te-dark)] font-medium">
                            Sam's Hardware is your trusted partner for quality tools, equipment, and supplies
                            for every project, big or small.
                        </p>
                    </div>
                    
                    <div className="bg-[var(--te-cream)] border border-[var(--te-grey-200)] rounded-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--te-green)]" style={{ boxShadow: '0 0 8px var(--te-green)' }} />
                            <span className="text-[10px] font-semibold text-[var(--te-grey-400)] tracking-[0.2em] uppercase">What We Do</span>
                        </div>
                        <p className="text-[var(--te-dark)] font-medium">
                            We focus on delivering great products, fast delivery, and reliable customer support so
                            you can keep building with confidence.
                        </p>
                    </div>
                    
                    <div className="bg-[var(--te-dark)] border border-[var(--te-grey-500)] rounded-sm p-6">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[var(--te-cyan)]" style={{ boxShadow: '0 0 8px var(--te-cyan)' }} />
                            <span className="text-[10px] font-semibold text-[var(--te-grey-300)] tracking-[0.2em] uppercase">Quality First</span>
                        </div>
                        <p className="text-[var(--te-grey-200)] font-medium">
                            Every product we carry is carefully selected for durability, performance, and value.
                            We stand behind everything we sell with our lifetime warranty on hand tools.
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}
