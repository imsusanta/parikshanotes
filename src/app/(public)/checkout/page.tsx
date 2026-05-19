'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const INDIAN_STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Chandigarh','Jammu & Kashmir','Ladakh'];
const FREE_DELIVERY_THRESHOLD = 29900;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const hasPrinted = items.some((i) => i.format !== 'PDF');
  const hasPdf = items.some((i) => i.format !== 'Printed');
  const orderType = hasPrinted && hasPdf ? 'mixed' : hasPdf ? 'pdf' : 'printed';
  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || !hasPrinted ? 0 : 4900;
  const total = subtotal + deliveryCharge;

  const [form, setForm] = useState({
    name: '', email: '', phone: '', line1: '', city: '', state: '', pincode: '', paymentMethod: 'razorpay' as 'razorpay' | 'cod',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) { toast.error('Cart is empty'); return; }
    setLoading(true);

    try {
      // Simulate order creation
      const orderId = 'PN-' + Math.random().toString(36).substring(2, 8).toUpperCase();

      if (form.paymentMethod === 'razorpay') {
        toast.success('Razorpay integration ready — connect your API keys!');
        // In production: call /api/payment/create, open Razorpay modal
      }

      clearCart();
      router.push(`/order-confirmation/${orderId}`);
    } catch {
      toast.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-xl font-bold text-chalk mb-2">Nothing to checkout</h1>
          <a href="/shop" className="btn-saffron text-sm mt-4 inline-block">Browse Notes</a>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-chalk mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Info */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-ink-light border border-white/5 space-y-4">
                <h2 className="text-base font-semibold text-chalk">Contact Information</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">Full Name *</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="Rahul Kumar" />
                  </div>
                  <div>
                    <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="rahul@email.com" />
                  </div>
                </div>
                {hasPrinted && (
                  <div>
                    <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">Phone *</label>
                    <input name="phone" value={form.phone} onChange={handleChange} required={hasPrinted} className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="9876543210" />
                  </div>
                )}
              </motion.div>

              {/* Address — only for printed */}
              {hasPrinted && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="p-6 rounded-xl bg-ink-light border border-white/5 space-y-4">
                  <h2 className="text-base font-semibold text-chalk">Delivery Address</h2>
                  <div>
                    <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">Address Line *</label>
                    <input name="line1" value={form.line1} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="House No, Street, Locality" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">City *</label>
                      <input name="city" value={form.city} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="Lucknow" />
                    </div>
                    <div>
                      <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">State *</label>
                      <select name="state" value={form.state} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50 cursor-pointer">
                        <option value="">Select State</option>
                        {INDIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-chalk-dim uppercase tracking-wider mb-1 block">Pincode *</label>
                      <input name="pincode" value={form.pincode} onChange={handleChange} required className="w-full px-4 py-2.5 rounded-lg bg-ink border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50" placeholder="226001" maxLength={6} />
                    </div>
                  </div>
                  <p className="text-xs text-chalk-muted">📦 Estimated delivery: 4-7 business days</p>
                </motion.div>
              )}

              {/* Payment Method */}
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="p-6 rounded-xl bg-ink-light border border-white/5 space-y-4">
                <h2 className="text-base font-semibold text-chalk">Payment Method</h2>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 rounded-lg border border-white/10 cursor-pointer hover:border-saffron/30 transition-colors">
                    <input type="radio" name="paymentMethod" value="razorpay" checked={form.paymentMethod === 'razorpay'} onChange={handleChange} className="accent-[var(--color-saffron)]" />
                    <div>
                      <span className="text-sm font-medium text-chalk">💳 Pay Online (Razorpay)</span>
                      <p className="text-xs text-chalk-muted">UPI, Cards, Net Banking, Wallets</p>
                    </div>
                  </label>
                  {hasPrinted && (
                    <label className="flex items-center gap-3 p-3 rounded-lg border border-white/10 cursor-pointer hover:border-saffron/30 transition-colors">
                      <input type="radio" name="paymentMethod" value="cod" checked={form.paymentMethod === 'cod'} onChange={handleChange} className="accent-[var(--color-saffron)]" />
                      <div>
                        <span className="text-sm font-medium text-chalk">🏠 Cash on Delivery</span>
                        <p className="text-xs text-chalk-muted">Pay when your notes arrive</p>
                      </div>
                    </label>
                  )}
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 p-6 rounded-xl bg-ink-light border border-white/5 space-y-4">
                <h2 className="text-lg font-bold text-chalk">Order Summary</h2>
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.productId} className="flex justify-between text-sm">
                      <span className="text-chalk-dim truncate max-w-[60%]">{item.title} × {item.quantity}</span>
                      <span className="text-chalk font-mono">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-3 space-y-2 text-sm">
                  <div className="flex justify-between text-chalk-dim"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span></div>
                  <div className="flex justify-between text-chalk-dim"><span>Delivery</span><span className="font-mono">{deliveryCharge === 0 ? <span className="text-success">FREE</span> : formatPrice(deliveryCharge)}</span></div>
                </div>
                <div className="border-t border-white/10 pt-3">
                  <div className="flex justify-between font-bold text-chalk"><span>Total</span><span className="text-lg text-saffron font-mono">{formatPrice(total)}</span></div>
                </div>
                <button type="submit" disabled={loading} className="w-full btn-saffron text-sm py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? 'Processing...' : form.paymentMethod === 'cod' ? 'Place Order (COD)' : `Pay ${formatPrice(total)}`}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
