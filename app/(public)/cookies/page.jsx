'use client'
import AnimatedTitle from "@/components/AnimatedTitle"

export default function CookiesPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="Cookies Policy" />
            <div className="max-w-3xl mx-auto space-y-8 text-[var(--te-grey-400)]">
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">What Are Cookies</h2>
                    <p className="leading-relaxed">
                        Cookies are small text files stored on your device. They help websites remember your preferences and improve performance.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Types of Cookies</h2>
                    <p className="leading-relaxed">
                        We use essential cookies to operate the site, performance cookies to analyze usage, and functional cookies to remember preferences. We do not use invasive tracking technologies.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">How We Use Cookies</h2>
                    <p className="leading-relaxed">
                        Cookies are used to maintain your cart, keep you signed in, measure page performance, and understand which products and categories are most popular.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Managing Preferences</h2>
                    <p className="leading-relaxed">
                        Most browsers let you block or delete cookies. Blocking essential cookies may impact core features like login and checkout. You can also use private browsing modes to limit tracking.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Changes to This Policy</h2>
                    <p className="leading-relaxed">
                        We may update this Policy as we improve our site. Continued use of our services after updates indicates acceptance of the changes.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Contact</h2>
                    <p className="leading-relaxed">
                        For cookie inquiries, contact 0712492206 or samshardwareza@gmail.com.
                    </p>
                </section>
            </div>
        </main>
    )
}
