'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const ORDER_STEPS = ['Placed', 'Confirmed', 'Shipped', 'Delivered'];

export default function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ orderId: string; status: number; trackingNumber?: string } | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');

    // Demo: simulate order lookup
    setTimeout(() => {
      if (query.startsWith('PN-')) {
        setResult({ orderId: query.toUpperCase(), status: 1, trackingNumber: undefined });
      } else {
        setError('Order not found. Please check your Order ID or email.');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <section className="py-16 min-h-screen">
      <div className="max-w-2xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold font-[family-name:var(--font-display)] text-chalk mb-2">Track Your <span className="text-gradient">Order</span></h1>
          <p className="text-sm text-chalk-muted">Enter your Order ID or email to check status</p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-3 mb-10">
          <input
            type="text" value={query} onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Order ID (e.g., PN-ABC123) or Email"
            className="flex-1 px-4 py-3 rounded-lg bg-ink-light border border-white/10 text-chalk text-sm focus:outline-none focus:border-saffron/50"
          />
          <button type="submit" disabled={loading} className="btn-saffron text-sm px-6 disabled:opacity-50">
            {loading ? '...' : 'Track'}
          </button>
        </form>

        {error && <p className="text-center text-error text-sm mb-4">{error}</p>}

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 rounded-xl bg-ink-light border border-white/5">
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-xs text-chalk-muted">Order ID</p>
                <p className="text-lg font-bold text-saffron font-mono">{result.orderId}</p>
              </div>
              {result.trackingNumber && (
                <div className="text-right">
                  <p className="text-xs text-chalk-muted">Tracking No.</p>
                  <p className="text-sm font-mono text-chalk">{result.trackingNumber}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-white/10" />
              {ORDER_STEPS.map((step, i) => {
                const isActive = i <= result.status;
                const isCurrent = i === result.status;
                return (
                  <div key={step} className="relative flex items-center gap-4 mb-8 last:mb-0">
                    <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      isActive ? 'bg-saffron text-ink' : 'bg-white/10 text-chalk-muted'
                    } ${isCurrent ? 'ring-4 ring-saffron/20' : ''}`}>
                      {isActive ? '✓' : i + 1}
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${isActive ? 'text-chalk' : 'text-chalk-muted'}`}>{step}</p>
                      {isCurrent && <p className="text-xs text-saffron mt-0.5">Current Status</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
