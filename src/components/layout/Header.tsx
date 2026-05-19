'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openDrawer } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/shop', label: 'Shop' },
    { href: '/track-order', label: 'Track Order' },
  ];

  return (
    <header
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl transition-all duration-500 ease-out`}
    >
      <div
        className={`w-full px-6 py-3.5 rounded-2xl border transition-all duration-500 ease-out flex items-center justify-between backdrop-blur-xl ${
          scrolled
            ? 'bg-white/85 border-slate-200/50 shadow-xl shadow-brand-blue/5'
            : 'bg-white/50 border-slate-100 shadow-sm'
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center group select-none">
          <div className="flex items-stretch rounded-xl overflow-hidden border border-slate-200 shadow-sm group-hover:scale-[1.02] transition-transform duration-300">
            {/* Blue Panel with playful font styled text */}
            <div className="bg-[#119CFF] px-4 py-2 flex items-center justify-center">
              <span className="text-xs font-black tracking-wider text-white uppercase font-mono whitespace-nowrap">
                Pariksha Notes
              </span>
            </div>
            {/* Yellow Panel with notebook and pen icon */}
            <div className="bg-[#FFB300] px-3 py-2 flex items-center justify-center border-l border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4.5 h-4.5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
              </svg>
            </div>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-bold uppercase tracking-wider text-chalk-dim hover:text-brand-blue transition-all duration-200 relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-blue scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
            </Link>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Cart Button */}
          <button
            onClick={openDrawer}
            className="relative p-2 rounded-xl hover:bg-slate-100 text-chalk hover:text-brand-blue transition-all duration-200"
            aria-label="Open cart"
            id="cart-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-4.5 h-4.5 bg-brand-blue text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-lg"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {/* Browse Notes CTA — Desktop */}
          <Link
            href="/shop"
            className="hidden md:inline-flex px-5 py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs tracking-wider uppercase shadow-lg shadow-brand-blue/20 transition-all"
          >
            Explore
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-chalk-dim hover:text-brand-blue transition-colors"
            aria-label="Toggle menu"
            id="mobile-menu-toggle"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-2 p-4 rounded-2xl bg-white border border-slate-200 backdrop-blur-xl shadow-2xl"
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-semibold tracking-wider text-chalk-dim hover:text-brand-blue transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/shop"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-dark text-white font-bold text-xs tracking-wider uppercase mt-2 shadow-lg"
              >
                Explore Notes
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
