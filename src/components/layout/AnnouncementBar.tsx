'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  text?: string;
}

export default function AnnouncementBar({ text }: AnnouncementBarProps) {
  const [visible, setVisible] = useState(true);
  const [announcementText, setAnnouncementText] = useState(
    text || '🚀 New SSC CGL 2026 Notes Available — Download Now!'
  );

  useEffect(() => {
    if (text !== undefined) setAnnouncementText(text);
  }, [text]);

  if (!announcementText || !visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          className="fixed top-0 left-0 right-0 z-[60] bg-[#FFB300] text-slate-900 text-center shadow-sm border-b border-[#FFB300]/10"
        >
          <div className="px-6 py-2 flex items-center justify-center relative max-w-7xl mx-auto">
            <div className="text-xs sm:text-sm font-bold tracking-wide text-center flex items-center justify-center gap-1.5 w-full">
              {announcementText}
            </div>
            <button onClick={() => setVisible(false)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-900/60 hover:text-slate-900 transition-colors p-1 rounded-full hover:bg-slate-900/10" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
