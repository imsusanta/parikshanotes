'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/product/ProductCard';
import { EXAM_CATEGORIES } from '@/lib/utils';

// Demo products for initial display
const DEMO_PRODUCTS = [
  { _id: '1', title: 'SSC CGL Complete Maths Notes', slug: 'ssc-cgl-maths', examCategory: 'SSC', subject: 'Mathematics', format: 'Both' as const, price: 29900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '2', title: 'UPSC Prelims Indian Polity', slug: 'upsc-polity', examCategory: 'UPSC', subject: 'Polity', format: 'PDF' as const, price: 19900, originalPrice: 29900, coverImage: '', inStock: true },
  { _id: '3', title: 'Railway Group D GK + GS', slug: 'railway-gk-gs', examCategory: 'Railway', subject: 'General Knowledge', format: 'Printed' as const, price: 34900, originalPrice: 49900, coverImage: '', inStock: true },
  { _id: '4', title: 'Banking Reasoning Master Notes', slug: 'banking-reasoning', examCategory: 'Banking', subject: 'Reasoning', format: 'PDF' as const, price: 14900, originalPrice: 24900, coverImage: '', inStock: true },
  { _id: '5', title: 'SSC CHSL English Grammar & Vocab', slug: 'ssc-chsl-english', examCategory: 'SSC', subject: 'English', format: 'Both' as const, price: 24900, originalPrice: 39900, coverImage: '', inStock: true },
  { _id: '6', title: 'UPSC Mains History Optional', slug: 'upsc-history', examCategory: 'UPSC', subject: 'History', format: 'Printed' as const, price: 44900, originalPrice: 69900, coverImage: '', inStock: true },
];

const TESTIMONIALS = [
  { name: 'Priya Sharma', exam: 'SSC CGL 2025', quote: 'ParikshaNotes ke notes se meri taiyari complete ho gayi. Best quality notes at affordable price!' },
  { name: 'Rahul Verma', exam: 'UPSC Prelims 2025', quote: 'PDF notes instantly mil gaye. Content bahut concise aur exam-focused hai. Highly recommended!' },
  { name: 'Ankita Singh', exam: 'Railway Group D', quote: 'COD option hone se order karna bahut easy tha. Notes time pe delivery ho gayi. Thank you!' },
];

// Animation variants
const staggerContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={staggerContainer} className={className}>
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [categories, setCategories] = useState<string[]>(['SSC', 'UPSC', 'Railway', 'Banking', 'State PSC', 'General']);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const taglineWords = ['Padhlo.', 'Paaso.', 'Prove', 'Karo.'];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('parikshanotes_categories');
      if (saved) {
        setCategories(saved.split(',').map(s => s.trim()).filter(Boolean));
      }
    }
  }, []);

  const filteredProducts = activeCategory === 'All'
    ? DEMO_PRODUCTS
    : DEMO_PRODUCTS.filter((p) => p.examCategory === activeCategory);

  return (
    <>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[92vh] flex items-center bg-ink overflow-hidden">
        {/* Modern glowing background blobs */}
        <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-blue/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-saffron/5 blur-[180px] pointer-events-none" />
        
        {/* Halftone dot pattern overlay */}
        <div className="absolute inset-0 bg-halftone opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink pointer-events-none" />

        {/* Floating geometric lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute top-[30%] right-[15%] w-[350px] h-[350px] rounded-full border border-brand-blue/10" />
          <div className="absolute top-[25%] right-[10%] w-[450px] h-[450px] rounded-full border border-brand-blue/10" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column (Text content) */}
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="lg:col-span-7 space-y-6">
              {/* Tagline word-by-word animation */}
              <div className="flex flex-wrap gap-2.5">
                {taglineWords.map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.9, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ delay: i * 0.15, type: 'spring', stiffness: 100 }}
                    className="text-xs sm:text-sm font-bold font-mono px-3 py-1 rounded bg-brand-blue/5 border border-brand-blue/10 text-brand-blue tracking-wider uppercase select-none"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-bold font-[family-name:var(--font-display)] text-chalk leading-[1.1] tracking-tight">
                India's #1 Premium{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-saffron drop-shadow-sm">
                  Exam Notes Store
                </span>
              </motion.h1>

              <motion.p variants={fadeUp} className="text-base sm:text-lg text-chalk-dim leading-relaxed max-w-xl">
                Crack SSC, UPSC, Railways, Banking & State PSC with hand-written, topper-verified study guides.
                Get instant PDF downloads or premium printed notes delivered straight to your door!
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 pt-4">
                <Link href="/shop" className="btn-saffron text-sm px-8 py-4 shadow-lg shadow-brand-blue/20 rounded-xl font-bold">
                  ⚡ Explore All Notes
                </Link>
                <Link href="/track-order" className="btn-ghost text-sm px-6 py-4 rounded-xl font-semibold border border-brand-blue/20 hover:border-brand-blue/30 transition-all">
                  📦 Track Order
                </Link>
              </motion.div>

              {/* Trust Badge strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-6 border-t border-slate-200"
              >
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-sky-400 border-2 border-ink flex items-center justify-center text-[10px] font-bold text-white shadow-md">
                      👤
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-bold text-chalk">Join 15,000+ Aspirants</p>
                  <p className="text-[10px] text-chalk-muted font-medium">Preparing with ParikshaNotes every single day</p>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column (Featured interactive card showcase) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:col-span-5 hidden lg:flex justify-center items-center relative"
            >
              {/* Radial gradient backing for showcase */}
              <div className="absolute w-[350px] h-[350px] rounded-full bg-brand-blue/15 blur-[80px]" />
              
              <div className="w-full max-w-[320px] aspect-[3.2/4.2] rounded-3xl p-6 bg-gradient-to-b from-brand-blue/5 to-saffron/5 border border-brand-blue/20 shadow-2xl relative backdrop-blur-xl">
                <div className="w-full h-full rounded-2xl bg-white/85 p-5 flex flex-col justify-between border border-slate-100">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[9px] px-2.5 py-0.5 rounded-full bg-brand-blue/10 text-brand-blue font-bold uppercase tracking-wider">UPSC Special</span>
                      <span className="text-xs text-chalk font-semibold">⭐️ 4.9</span>
                    </div>
                    <div className="w-full aspect-[4/3] rounded-xl bg-gradient-to-tr from-brand-blue/10 to-saffron/10 flex items-center justify-center">
                      <span className="text-5xl">📖</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-chalk">Indian Polity Core Notes</h3>
                      <p className="text-xs text-chalk-muted mt-1">Instant high-yield revision pages</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-lg font-bold text-brand-blue font-mono">₹199.00</span>
                    <Link href="/shop" className="text-xs text-brand-blue font-bold hover:underline">Get Notes →</Link>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ===== EXAM CATEGORY STRIP ===== */}
      <section className="py-6 bg-white border-y border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-xs font-bold text-chalk-muted uppercase tracking-wider whitespace-nowrap mr-2">Filters:</span>
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex-shrink-0 px-6 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-brand-blue text-white font-bold shadow-lg shadow-brand-blue/20'
                    : 'bg-slate-100 text-chalk-dim hover:bg-slate-200 hover:text-chalk'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="py-24 bg-ink">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16 space-y-3">
              <h2 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-chalk">
                Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-saffron">Study Guides</span>
              </h2>
              <p className="text-chalk-muted text-sm max-w-md mx-auto leading-relaxed">
                Hand-picked revision and practice notes trusted by premium rankers.
              </p>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.slice(0, 6).map((product, i) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link href="/shop" className="inline-flex items-center gap-2 btn-ghost text-xs tracking-wider uppercase font-bold border border-brand-blue/20 px-6 py-3.5 rounded-xl hover:bg-brand-blue/5 transition-all">
              Browse All Preparation Notes <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== TRUST STRIP ===== */}
      <AnimatedSection className="py-16 bg-white border-y border-slate-100 relative overflow-hidden shadow-sm">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[150px] bg-brand-blue/5 blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: '🎓', value: '15k+', label: 'Happy Aspirants' },
              { icon: '📝', value: '250+', label: 'Topic Bulletins' },
              { icon: '⚡', value: 'Instant', label: 'PDF Delivery' },
              { icon: '🚚', value: 'COD', label: 'Doorstep Courier' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUp} className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-brand-blue/20 transition-all duration-300 shadow-sm">
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl font-extrabold text-brand-blue font-mono tracking-tight">{stat.value}</div>
                <div className="text-xs text-chalk-muted mt-1.5 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ===== HOW IT WORKS ===== */}
      <section className="py-24 bg-ink relative">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-chalk">
                Simple <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-saffron">Preparation Flow</span>
              </h2>
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-transparent via-brand-blue/15 to-transparent" />

            {[
              { step: '01', icon: '🔍', title: 'Choose Guides', desc: 'Browse curated collections categorized clearly by target exams and core subjects.' },
              { step: '02', icon: '💳', title: 'Secure Payment', desc: 'Verify cart and execute fast online checkout or pick cash-on-delivery options.' },
              { step: '03', icon: '📖', title: 'Ready to Read', desc: 'Download standard PDF copies instantly or receive high-quality printed guides.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-white border border-slate-100 group-hover:border-brand-blue/30 group-hover:bg-brand-blue/5 flex items-center justify-center text-3xl transition-all duration-300 shadow-sm">
                  {item.icon}
                </div>
                <span className="text-[10px] font-bold font-mono text-brand-blue tracking-widest uppercase">{item.step}</span>
                <h3 className="text-lg font-bold text-chalk mt-2 mb-2">{item.title}</h3>
                <p className="text-xs text-chalk-muted leading-relaxed max-w-xs mx-auto">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white border-t border-slate-100 shadow-inner">
        <div className="max-w-7xl mx-auto px-6 sm:px-8">
          <AnimatedSection>
            <motion.div variants={fadeUp} className="text-center mb-16">
              <h2 className="text-3xl sm:text-5xl font-bold font-[family-name:var(--font-display)] text-chalk">
                Aspirant <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-saffron">Success Stories</span>
              </h2>
            </motion.div>
          </AnimatedSection>

          <div className="max-w-3xl mx-auto relative">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="text-center p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-100 shadow-xl relative overflow-hidden"
            >
              <span className="text-5xl text-brand-blue/10 absolute top-4 left-6 pointer-events-none font-serif">“</span>
              <p className="text-base sm:text-lg text-chalk leading-relaxed mb-6 italic relative z-10">
                {TESTIMONIALS[currentTestimonial].quote}
              </p>
              <div>
                <p className="font-bold text-brand-blue text-sm">{TESTIMONIALS[currentTestimonial].name}</p>
                <p className="text-[10px] text-chalk-muted tracking-wider uppercase font-semibold mt-1">{TESTIMONIALS[currentTestimonial].exam}</p>
              </div>
            </motion.div>

            <div className="flex justify-center gap-2 mt-8">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${i === currentTestimonial ? 'bg-brand-blue w-6' : 'bg-slate-200 hover:bg-slate-300'}`}
                  aria-label={`Success Story ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
