'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { use } from 'react';

export default function OrderConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);

  const whatsappText = encodeURIComponent(`I just ordered study notes from ParikshaNotes! 📚 Order ID: ${orderId}. Check them out at pariksha notes.com`);

  return (
    <section className="py-20 min-h-screen flex items-center justify-center">
      <div className="max-w-lg mx-auto px-4 text-center">
        {/* Animated Checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 10, stiffness: 100 }}
          className="w-24 h-24 mx-auto mb-8 rounded-full bg-success/20 flex items-center justify-center"
        >
          <motion.svg
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
          >
            <motion.path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </motion.svg>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-chalk mb-3">Order Confirmed! 🎉</h1>
          <p className="text-chalk-muted text-sm mb-6">Thank you for your order. We&apos;ve sent a confirmation to your email.</p>

          <div className="p-4 rounded-xl bg-ink-light border border-white/5 mb-6 inline-block">
            <p className="text-xs text-chalk-muted">Order ID</p>
            <p className="text-xl font-bold text-saffron font-mono">{orderId}</p>
          </div>

          <div className="p-4 rounded-xl bg-saffron/5 border border-saffron/10 mb-8">
            <p className="text-sm text-chalk">📦 <strong>Printed notes:</strong> Delivered in 4-7 business days</p>
            <p className="text-sm text-chalk mt-1">📥 <strong>PDF notes:</strong> Check your email for download link</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/?text=${whatsappText}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-saffron text-sm inline-flex items-center justify-center gap-2"
            >
              <span>📱</span> Share on WhatsApp
            </a>
            <Link href="/track-order" className="btn-ghost text-sm">Track Order</Link>
            <Link href="/shop" className="btn-ghost text-sm">Continue Shopping</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
