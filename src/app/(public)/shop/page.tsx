'use client';

import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/product/ProductCard';
import { EXAM_CATEGORIES, PRODUCT_FORMATS } from '@/lib/utils';

// Demo data — will be replaced with API call
const ALL_PRODUCTS = [
  { _id: '1', title: 'SSC CGL Complete Maths Notes', slug: 'ssc-cgl-maths', examCategory: 'SSC', subject: 'Mathematics', format: 'Both' as const, price: 29900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '2', title: 'UPSC Prelims Indian Polity', slug: 'upsc-polity', examCategory: 'UPSC', subject: 'Polity', format: 'PDF' as const, price: 19900, originalPrice: 29900, coverImage: '', inStock: true },
  { _id: '3', title: 'Railway Group D GK + GS', slug: 'railway-gk-gs', examCategory: 'Railway', subject: 'General Knowledge', format: 'Printed' as const, price: 34900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '4', title: 'Banking Reasoning Master Notes', slug: 'banking-reasoning', examCategory: 'Banking', subject: 'Reasoning', format: 'PDF' as const, price: 14900, originalPrice: 24900, coverImage: '', inStock: true },
  { _id: '5', title: 'SSC CHSL English Grammar & Vocab', slug: 'ssc-chsl-english', examCategory: 'SSC', subject: 'English', format: 'Both' as const, price: 24900, originalPrice: 39900, coverImage: '', inStock: true },
  { _id: '6', title: 'UPSC Mains History Optional', slug: 'upsc-history', examCategory: 'UPSC', subject: 'History', format: 'Printed' as const, price: 44900, originalPrice: 69900, coverImage: '', inStock: true },
  { _id: '7', title: 'State PSC General Studies Paper 1', slug: 'state-psc-gs1', examCategory: 'State PSC', subject: 'General Studies', format: 'PDF' as const, price: 19900, originalPrice: 34900, coverImage: '', inStock: true },
  { _id: '8', title: 'SSC MTS Complete Guide', slug: 'ssc-mts-guide', examCategory: 'SSC', subject: 'Complete Guide', format: 'Both' as const, price: 39900, originalPrice: 59900, coverImage: '', inStock: true },
  { _id: '9', title: 'Banking Quantitative Aptitude', slug: 'banking-quant', examCategory: 'Banking', subject: 'Quantitative Aptitude', format: 'Printed' as const, price: 27900, originalPrice: 44900, coverImage: '', inStock: true },
];

export default function ShopPage() {
  const [categories, setCategories] = useState<string[]>(['SSC', 'UPSC', 'Railway', 'Banking', 'State PSC', 'General']);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedFormat, setSelectedFormat] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('parikshanotes_categories');
      if (saved) {
        setCategories(saved.split(',').map(s => s.trim()).filter(Boolean));
      }
    }
  }, []);

  const filtered = useMemo(() => {
    let result = ALL_PRODUCTS;
    if (search) result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()) || p.subject.toLowerCase().includes(search.toLowerCase()));
    if (selectedCategory) result = result.filter((p) => p.examCategory === selectedCategory);
    if (selectedFormat) result = result.filter((p) => p.format === selectedFormat);
    result = result.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    return result;
  }, [search, selectedCategory, selectedFormat, sortBy, priceRange]);

  const clearFilters = () => {
    setSearch('');
    setSelectedCategory('');
    setSelectedFormat('');
    setPriceRange([0, 100000]);
    setSortBy('newest');
  };

  return (
    <section className="py-8 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-display)] text-chalk mb-2">All <span className="text-gradient">Notes</span></h1>
          <p className="text-chalk-muted text-sm">Browse our complete collection of exam-focused study material</p>
        </div>

        {/* Search + Sort + Filter toggle */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-chalk-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" /></svg>
            <input type="text" placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-white border border-slate-200 text-chalk text-sm placeholder:text-chalk-muted focus:outline-none focus:border-brand-blue/50 transition-colors shadow-sm" />
          </div>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-chalk text-sm focus:outline-none focus:border-brand-blue/50 cursor-pointer shadow-sm">
            <option value="newest">Newest</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
          </select>
          <button onClick={() => setShowFilters(!showFilters)} className="lg:hidden px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-chalk text-sm shadow-sm">
            Filters {showFilters ? '✕' : '☰'}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-60 flex-shrink-0`}>
            <div className="sticky top-24 space-y-6 p-4 rounded-xl bg-white border border-slate-100 shadow-md">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-semibold text-chalk">Filters</h3>
                <button onClick={clearFilters} className="text-xs text-brand-blue font-bold hover:underline">Clear all</button>
              </div>

              {/* Exam Category */}
              <div>
                <h4 className="text-xs font-semibold text-chalk-dim uppercase tracking-wider mb-2">Exam Type</h4>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="category" checked={selectedCategory === cat} onChange={() => setSelectedCategory(selectedCategory === cat ? '' : cat)} className="accent-[var(--color-brand-blue)]" />
                      <span className="text-sm text-chalk-muted group-hover:text-chalk transition-colors">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Format */}
              <div>
                <h4 className="text-xs font-semibold text-chalk-dim uppercase tracking-wider mb-2">Format</h4>
                <div className="space-y-1.5">
                  {PRODUCT_FORMATS.map((fmt) => (
                    <label key={fmt} className="flex items-center gap-2 cursor-pointer group">
                      <input type="radio" name="format" checked={selectedFormat === fmt} onChange={() => setSelectedFormat(selectedFormat === fmt ? '' : fmt)} className="accent-[var(--color-brand-blue)]" />
                      <span className="text-sm text-chalk-muted group-hover:text-chalk transition-colors">{fmt}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-xs font-semibold text-chalk-dim uppercase tracking-wider mb-2">Max Price</h4>
                <input type="range" min={0} max={100000} step={5000} value={priceRange[1]} onChange={(e) => setPriceRange([0, parseInt(e.target.value)])} className="w-full accent-[var(--color-brand-blue)]" />
                <p className="text-xs text-chalk-muted mt-1">Up to ₹{(priceRange[1] / 100).toFixed(0)}</p>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-chalk mb-2">No notes found</h3>
                <p className="text-sm text-chalk-muted mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearFilters} className="btn-ghost text-sm">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((product, i) => (
                  <motion.div key={product._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.4 }}>
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>
            )}
            <p className="text-xs text-chalk-muted mt-6 text-center">{filtered.length} notes found</p>
          </div>
        </div>
      </div>
    </section>
  );
}
