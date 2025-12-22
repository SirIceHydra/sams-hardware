'use client'
import AnimatedTitle from "@/components/AnimatedTitle"

export default function PrivacyPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="Privacy Policy" />
            <div className="max-w-3xl mx-auto space-y-8 text-[var(--te-grey-400)]">
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Introduction</h2>
                    <p className="leading-relaxed">
                        We respect your privacy. This Policy explains what personal information we collect, how we use it, and your rights under South African privacy law.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Information We Collect</h2>
                    <p className="leading-relaxed">
                        We collect contact details, delivery addresses, order information, device and usage data, and limited payment details required to process orders. Payment card data is handled by secure payment providers.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">How We Use Information</h2>
                    <p className="leading-relaxed">
                        We use your information to process orders, deliver products, provide support, personalize the shopping experience, and comply with legal obligations.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Lawful Basis</h2>
                    <p className="leading-relaxed">
                        We process data based on consent, contract performance, legal obligations, and legitimate interests such as improving our services and preventing fraud.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Cookies & Tracking</h2>
                    <p className="leading-relaxed">
                        We use essential and performance cookies to operate the site and analyze usage. See our Cookies Policy for details and how to manage preferences.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Payments & Security</h2>
                    <p className="leading-relaxed">
                        Payments are processed by trusted gateways. We implement security measures to protect your data; however, no method is 100% secure.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Sharing & Disclosure</h2>
                    <p className="leading-relaxed">
                        We share data with couriers, payment providers, and service partners as needed to fulfill orders. We do not sell personal information.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Retention</h2>
                    <p className="leading-relaxed">
                        We retain data for as long as necessary to provide services, meet legal requirements, and resolve disputes. Retention periods vary by record type.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Your Rights</h2>
                    <p className="leading-relaxed">
                        You may request access, correction, deletion, or object to certain processing. To exercise rights, contact us using the details below.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Contact</h2>
                    <p className="leading-relaxed">
                        For privacy inquiries, contact 0712492206 or samshardwareza@gmail.com.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Changes to This Policy</h2>
                    <p className="leading-relaxed">
                        We may update this Policy periodically. Continued use of our services after updates indicates acceptance of the changes.
                    </p>
                </section>
            </div>
        </main>
    )
}
