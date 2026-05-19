'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';
import toast from 'react-hot-toast';

// Demo product — will be replaced with API call using slug
const DEMO_PRODUCTS: Record<string, {
  _id: string; title: string; slug: string; examCategory: string; subject: string; format: 'PDF' | 'Printed' | 'Both';
  price: number; originalPrice?: number; description: string; coverImage: string; previewImages: string[]; inStock: boolean;
}> = {
  'ssc-cgl-maths': {
    _id: '1', title: 'SSC CGL Complete Maths Notes', slug: 'ssc-cgl-maths', examCategory: 'SSC', subject: 'Mathematics', format: 'Both',
    price: 29900, originalPrice: 49900, coverImage: '',
    description: '<p>Complete mathematics notes covering all topics for SSC CGL examination. Includes:</p><ul><li>Number System & Simplification</li><li>Algebra & Trigonometry</li><li>Geometry & Mensuration</li><li>Data Interpretation</li><li>Previous Year Solved Questions (2018-2025)</li></ul><p>Prepared by experts with 10+ years of teaching experience. Perfect for SSC CGL Tier-I and Tier-II preparation.</p>',
    previewImages: [], inStock: true,
  },
};

const RELATED = [
  { _id: '5', title: 'SSC CHSL English Grammar & Vocab', slug: 'ssc-chsl-english', examCategory: 'SSC', subject: 'English', format: 'Both' as const, price: 24900, originalPrice: 39900, coverImage: '', inStock: true },
  { _id: '8', title: 'SSC MTS Complete Guide', slug: 'ssc-mts-guide', examCategory: 'SSC', subject: 'Complete Guide', format: 'Both' as const, price: 39900, originalPrice: 59900, coverImage: '', inStock: true },
  { _id: '4', title: 'Banking Reasoning Master Notes', slug: 'banking-reasoning', examCategory: 'Banking', subject: 'Reasoning', format: 'PDF' as const, price: 14900, originalPrice: 24900, coverImage: '', inStock: true },
];

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  // For demo, use first product
  const product = Object.values(DEMO_PRODUCTS)[0];
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      coverImage: product.coverImage,
      format: product.format,
      price: product.price,
      quantity,
    });
    toast.success('Added to cart!');
  };

  const formatBadge = {
    PDF: { label: '📥 PDF — Instant Download', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
    Printed: { label: '📦 Printed — Delivered to your door', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
    Both: { label: '📥📦 PDF + Printed Available', color: 'bg-saffron/10 text-saffron border-saffron/20' },
  };

  return (
    <section className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-chalk-muted mb-6">
          <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-saffron transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-chalk">{product.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Cover Image */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative">
            <div className="aspect-[3/4] rounded-2xl bg-ink-light border border-white/5 overflow-hidden">
              {product.coverImage ? (
                <img src={product.coverImage} alt={product.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-ink-light to-ink">
                  <span className="text-8xl mb-4">📚</span>
                  <span className="text-sm text-chalk-muted font-mono">{product.examCategory} — {product.subject}</span>
                </div>
              )}
            </div>

            {/* Preview Images */}
            {product.previewImages.length > 0 && (
              <div className="mt-4">
                <h3 className="text-sm font-semibold text-chalk mb-2">Preview Pages</h3>
                <div className="grid grid-cols-3 gap-2">
                  {product.previewImages.map((img, i) => (
                    <div key={i} className={`aspect-[3/4] rounded-lg bg-ink-light border border-white/5 overflow-hidden relative ${i > 0 ? 'blur-sm' : ''}`}>
                      <img src={img} alt={`Preview ${i + 1}`} className="w-full h-full object-cover" />
                      {i > 0 && <div className="absolute inset-0 flex items-center justify-center bg-black/50"><span className="text-xs text-chalk font-semibold">🔒 Buy to unlock</span></div>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-saffron/10 text-saffron">{product.examCategory}</span>
              <span className="px-2.5 py-1 text-xs rounded-full bg-white/5 text-chalk-dim">{product.subject}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-display)] text-chalk mb-4">{product.title}</h1>

            {/* Format badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm ${formatBadge[product.format].color} mb-6`}>
              {formatBadge[product.format].label}
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-saffron font-[family-name:var(--font-mono)]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-chalk-muted line-through font-[family-name:var(--font-mono)]">{formatPrice(product.originalPrice)}</span>
                  <span className="px-2 py-0.5 text-xs font-bold bg-error/20 text-error rounded">-{discount}% OFF</span>
                </>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className="space-y-4 mb-8">
              {product.format !== 'PDF' && (
                <div>
                  <label className="text-xs text-chalk-dim uppercase tracking-wider mb-2 block">Quantity</label>
                  <div className="inline-flex items-center border border-white/10 rounded-lg">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 text-chalk-dim hover:text-saffron transition-colors">−</button>
                    <span className="px-4 py-2 text-chalk font-mono border-x border-white/10">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-2 text-chalk-dim hover:text-saffron transition-colors">+</button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3">
                <button onClick={handleAddToCart} disabled={!product.inStock} className="btn-saffron flex-1 text-center py-3 disabled:opacity-50">
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
                <Link href="/checkout" className="btn-ghost flex-1 text-center py-3">Buy Now →</Link>
              </div>
            </div>

            {/* Description */}
            <div className="border-t border-white/5 pt-6">
              <h3 className="text-sm font-semibold text-chalk uppercase tracking-wider mb-3">Description</h3>
              <div className="prose prose-sm prose-invert max-w-none text-chalk-dim text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: product.description }} />
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-16 pt-10 border-t border-white/5">
          <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] text-chalk mb-6">Related <span className="text-gradient">Notes</span></h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RELATED.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
