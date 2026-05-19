'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/utils';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

interface Product {
  _id: string;
  title: string;
  slug: string;
  examCategory: string;
  subject: string;
  format: 'PDF' | 'Printed' | 'Both';
  price: number;
  originalPrice?: number;
  coverImage: string;
  inStock: boolean;
}

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product._id,
      title: product.title,
      slug: product.slug,
      coverImage: product.coverImage,
      format: product.format,
      price: product.price,
      quantity: 1,
    });
    toast.success('Added to cart!');
  };

  const formatBadgeColor = {
    PDF: 'bg-sky-500/10 text-sky-600 border-sky-500/20',
    Printed: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    Both: 'bg-saffron/10 text-amber-600 border-saffron/20',
  };

  return (
    <Link href={`/product/${product.slug}`} className="block group relative">
      <motion.div
        whileHover={{ y: -6, scale: 1.01 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative overflow-hidden rounded-2xl bg-white border border-slate-100 group-hover:border-brand-blue/30 transition-all duration-300 shadow-xl group-hover:shadow-brand-blue/5"
      >
        {/* Decorative blur element on hover */}
        <div className="absolute -inset-px bg-gradient-to-r from-brand-blue/0 via-brand-blue/10 to-saffron/0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

        {/* Cover Image container */}
        <div className="relative aspect-[3.2/4] bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden border-b border-slate-100">
          {product.coverImage ? (
            <img
              src={product.coverImage}
              alt={product.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center relative">
              {/* Radial gradient glow behind book */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(17,156,255,0.06)_0%,transparent_70%)] pointer-events-none" />
              <span className="text-6xl mb-3 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">📚</span>
              <span className="text-[10px] text-chalk-muted font-mono tracking-widest uppercase">{product.examCategory}</span>
            </div>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <span className="absolute top-3.5 left-3.5 px-2 py-0.5 text-[10px] font-bold bg-error text-white rounded-md shadow-lg shadow-error/20">
              {discount}% OFF
            </span>
          )}

          {/* Format badge */}
          <span className={`absolute top-3.5 right-3.5 px-2.5 py-0.5 text-[9px] font-bold rounded-full border tracking-wide uppercase ${formatBadgeColor[product.format]}`}>
            {product.format === 'PDF' ? '📥 PDF' : product.format === 'Printed' ? '📦 Printed' : '📥📦 Both'}
          </span>

          {/* Hover Action Overlay */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 shadow-lg shadow-brand-blue/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {product.inStock ? '⚡ Add to Cart' : 'Out of Stock'}
            </button>
          </div>
        </div>

        {/* Details Area */}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[9px] px-2 py-0.5 rounded-md bg-brand-blue/10 text-brand-blue font-bold uppercase tracking-wider">
              {product.examCategory}
            </span>
            <span className="w-1 h-1 rounded-full bg-slate-300" />
            <span className="text-[10px] text-chalk-muted font-medium">{product.subject}</span>
          </div>

          <h3 className="text-sm font-semibold text-chalk leading-snug mb-3 line-clamp-2 group-hover:text-brand-blue transition-colors duration-200">
            {product.title}
          </h3>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg font-bold text-brand-blue font-[family-name:var(--font-mono)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-chalk-muted line-through font-[family-name:var(--font-mono)] opacity-70">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
