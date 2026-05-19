'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, isDrawerOpen, closeDrawer, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeDrawer}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-slate-200 z-[70] flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100">
              <h2 className="text-lg font-bold text-chalk">Your Cart</h2>
              <button onClick={closeDrawer} className="text-chalk-muted hover:text-brand-blue transition-colors" aria-label="Close cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="text-5xl mb-4">📚</div>
                  <p className="text-chalk-muted text-sm">Your cart is empty</p>
                  <button onClick={closeDrawer} className="btn-brand-blue text-sm mt-4">Browse Notes</button>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.productId} className="flex gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 shadow-sm">
                    <div className="w-16 h-20 rounded bg-slate-100 flex-shrink-0 overflow-hidden">
                      {item.coverImage ? (
                        <img src={item.coverImage} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">📖</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-chalk truncate">{item.title}</h3>
                      <p className="text-xs text-brand-blue font-mono mt-0.5">{formatPrice(item.price)}</p>
                      <span className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-brand-blue/10 text-brand-blue mt-1">{item.format}</span>
                      <div className="flex items-center gap-2 mt-2">
                        {item.format !== 'PDF' && (
                          <div className="flex items-center border border-slate-200 rounded bg-white">
                            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="px-2 py-0.5 text-xs text-chalk-dim hover:text-brand-blue">−</button>
                            <span className="px-2 text-xs text-chalk font-mono">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="px-2 py-0.5 text-xs text-chalk-dim hover:text-brand-blue">+</button>
                          </div>
                        )}
                        <button onClick={() => removeItem(item.productId)} className="ml-auto text-xs text-chalk-muted hover:text-error transition-colors">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 border-t border-slate-100 space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-chalk-dim">Subtotal</span>
                  <span className="text-sm font-bold text-chalk font-mono">{formatPrice(subtotal)}</span>
                </div>
                <Link href="/cart" onClick={closeDrawer} className="block w-full text-center btn-ghost text-sm">View Full Cart</Link>
                <Link href="/checkout" onClick={closeDrawer} className="block w-full text-center btn-brand-blue text-sm">Checkout →</Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
