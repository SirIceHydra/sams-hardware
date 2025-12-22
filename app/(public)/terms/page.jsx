'use client'
import AnimatedTitle from "@/components/AnimatedTitle"

export default function TermsPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="Terms of Service" />
            <div className="max-w-3xl mx-auto space-y-8 text-[var(--te-grey-400)]">
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Overview</h2>
                    <p className="leading-relaxed">
                        These Terms govern your use of Sam&apos;s Hardware online store and services. By placing an order or using our website, you agree to these Terms.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Orders & Pricing</h2>
                    <p className="leading-relaxed">
                        All prices are listed in ZAR and include VAT unless stated. We may cancel orders due to stock issues, pricing errors, or suspected fraud. If cancelled, we will refund any payment received.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Shipping & Pickup</h2>
                    <p className="leading-relaxed">
                        Delivery times and fees are outlined in our Shipping Policy. Oversized or heavy items may incur additional fees or longer delivery windows. Pickup can be arranged by contacting our team.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Returns & Exchanges</h2>
                    <p className="leading-relaxed">
                        Unopened items may be returned within 7 days in original packaging. Some items are excluded, including consumables, cut‑to‑length materials, and custom orders. See our Shipping Policy for more details on returns logistics.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Warranties & Repairs</h2>
                    <p className="leading-relaxed">
                        Power tools and equipment may include manufacturer warranties. Warranty claims follow the manufacturer&apos;s process; proof of purchase is required. Damage caused by misuse or improper installation is excluded.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Accounts & Security</h2>
                    <p className="leading-relaxed">
                        You are responsible for maintaining the confidentiality of your account credentials. Notify us immediately of any unauthorized use. We may suspend or terminate accounts for misuse or security concerns.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Prohibited Conduct</h2>
                    <p className="leading-relaxed">
                        Do not engage in fraud, abuse, scraping, interference with site operations, or violations of applicable laws. We reserve the right to restrict access or take action if misuse is detected.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Liability</h2>
                    <p className="leading-relaxed">
                        To the extent permitted by law, we are not liable for indirect, incidental, or consequential damages arising from use of our site or products. Nothing limits rights under consumer protection laws.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Governing Law</h2>
                    <p className="leading-relaxed">
                        These Terms are governed by the laws of South Africa. Any disputes shall be handled by competent courts within South Africa.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Changes to Terms</h2>
                    <p className="leading-relaxed">
                        We may update these Terms periodically. Continued use of our services after changes constitutes acceptance of the updated Terms.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Contact</h2>
                    <p className="leading-relaxed">
                        For questions, contact 0712492206 or samshardwareza@gmail.com. Support hours: Mon–Sat: 08:00–20:00, Sun: 08:00–15:00.
                    </p>
                </section>
            </div>
        </main>
    )
}
