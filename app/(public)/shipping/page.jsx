'use client'
import AnimatedTitle from "@/components/AnimatedTitle"

export default function ShippingPage() {
    return (
        <main className="max-w-7xl mx-auto px-6 py-10">
            <AnimatedTitle title="Shipping Policy" />
            <div className="max-w-3xl mx-auto space-y-8 text-[var(--te-grey-400)]">
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">General Shipping Information</h2>
                    <p className="leading-relaxed">
                        We deliver nationwide within South Africa using trusted courier partners. Orders include power tools, hand tools, electrical supplies, plumbing equipment, and general hardware accessories.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Delivery Timeframes</h2>
                    <p className="leading-relaxed">
                        Standard Shipping: 3–5 business days. Express Shipping: 1–2 business days. Delivery time begins once your order is processed and dispatched.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Shipping Fees</h2>
                    <p className="leading-relaxed">
                        Standard shipping is R75 and express shipping is R120. Free shipping applies on orders over R1000. Oversized or heavy items may incur additional surcharges.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Order Processing</h2>
                    <p className="leading-relaxed">
                        Orders placed Monday to Friday before 12:00 are typically processed the same day. Weekend and public holiday orders are processed on the next business day.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Oversized & Heavy Items</h2>
                    <p className="leading-relaxed">
                        Items such as compressors, generators, bulk materials, and long-length products may require special handling. Delivery for these items can take longer and may include additional fees.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Delivery Areas</h2>
                    <p className="leading-relaxed">
                        We ship nationwide. Remote or outlying areas may require extra time and incur a remote area surcharge. If a delivery is not possible, we will contact you to arrange alternatives.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">In‑Store Pickup</h2>
                    <p className="leading-relaxed">
                        Free collection can be arranged by contacting our team. We will notify you when your order is ready for pickup.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Tracking & Notifications</h2>
                    <p className="leading-relaxed">
                        Once dispatched, you will receive a tracking link via email or SMS. You can monitor your shipment status with our courier partners until delivery.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Failed Deliveries</h2>
                    <p className="leading-relaxed">
                        Couriers usually attempt delivery at least twice. If delivery fails, the parcel may be returned to us. Additional shipping fees may apply for re-dispatch.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Damaged or Incorrect Items</h2>
                    <p className="leading-relaxed">
                        Inspect your order upon delivery. If items are damaged or incorrect, contact us within 48 hours with photos and your order number so we can assist promptly.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Returns & Exchanges</h2>
                    <p className="leading-relaxed">
                        Unopened items can be returned within 7 days in original packaging. Some items (consumables, cut-to-length materials, custom orders) are excluded. Shipping costs are non‑refundable unless the return is due to our error.
                    </p>
                </section>
                <section>
                    <h2 className="text-lg font-bold text-[var(--te-dark)] uppercase tracking-widest mb-3">Contact & Support</h2>
                    <p className="leading-relaxed">
                        For shipping questions, contact 0712492206 or email samshardwareza@gmail.com. Our support hours are Mon–Sat: 08:00–20:00 and Sun: 08:00–15:00.
                    </p>
                </section>
            </div>
        </main>
    )
}
