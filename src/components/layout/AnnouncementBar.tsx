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
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-gradient-to-r from-saffron via-saffron-dark to-saffron text-ink text-center relative overflow-hidden"
        >
          <div className="px-4 py-2 flex items-center justify-center gap-2">
            <p className="text-xs sm:text-sm font-semibold tracking-wide">{announcementText}</p>
            <button onClick={() => setVisible(false)} className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/60 hover:text-ink" aria-label="Close">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
