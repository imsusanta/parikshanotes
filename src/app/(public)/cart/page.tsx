'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';

const FREE_DELIVERY_THRESHOLD = 29900; // ₹299

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart();

  const deliveryCharge = subtotal >= FREE_DELIVERY_THRESHOLD || items.every((i) => i.format === 'PDF') ? 0 : 4900;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <section className="py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-7xl mb-4">🛒</div>
          <h1 className="text-2xl font-bold text-chalk mb-2">Your cart is empty</h1>
          <p className="text-sm text-chalk-muted mb-6">Browse our notes and add them to your cart</p>
          <Link href="/shop" className="btn-saffron text-sm">Browse Notes →</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-chalk mb-8">Your <span className="text-gradient">Cart</span></h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, i) => (
              <motion.div key={item.productId} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex gap-4 p-4 rounded-xl bg-ink-light border border-white/5">
                <div className="w-20 h-28 rounded-lg bg-ink flex-shrink-0 overflow-hidden">
                  {item.coverImage ? <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-3xl">📚</div>}
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`} className="text-sm font-semibold text-chalk hover:text-saffron transition-colors line-clamp-2">{item.title}</Link>
                  <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-saffron/10 text-saffron mt-1">{item.format}</span>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-3">
                      {item.format !== 'PDF' && (
                        <div className="flex items-center border border-white/10 rounded">
                          <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-3 py-1 text-sm text-chalk-dim hover:text-saffron">−</button>
                          <span className="px-3 py-1 text-sm text-chalk font-mono border-x border-white/10">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-3 py-1 text-sm text-chalk-dim hover:text-saffron">+</button>
                        </div>
                      )}
                      <button onClick={() => removeItem(item.productId)} className="text-xs text-chalk-muted hover:text-error transition-colors">Remove</button>
                    </div>
                    <span className="text-base font-bold text-saffron font-[family-name:var(--font-mono)]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
            <button onClick={clearCart} className="text-xs text-chalk-muted hover:text-error transition-colors">Clear Cart</button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 p-6 rounded-xl bg-ink-light border border-white/5 space-y-4">
              <h2 className="text-lg font-bold text-chalk">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-chalk-dim"><span>Subtotal</span><span className="font-mono">{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-chalk-dim">
                  <span>Delivery</span>
                  <span className="font-mono">{deliveryCharge === 0 ? <span className="text-success">FREE</span> : formatPrice(deliveryCharge)}</span>
                </div>
                {deliveryCharge > 0 && <p className="text-[10px] text-saffron">Free delivery on orders above ₹299</p>}
              </div>
              <div className="border-t border-white/10 pt-3">
                <div className="flex justify-between text-chalk font-bold"><span>Total</span><span className="text-lg text-saffron font-mono">{formatPrice(total)}</span></div>
              </div>
              <Link href="/checkout" className="block w-full btn-saffron text-center text-sm py-3 mt-4">Proceed to Checkout →</Link>
              <Link href="/shop" className="block w-full text-center text-xs text-chalk-muted hover:text-saffron transition-colors">Continue Shopping</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
