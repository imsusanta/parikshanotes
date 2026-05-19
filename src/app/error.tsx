'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B0C10] px-4 text-center">
      <div className="max-w-md space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-8xl"
        >
          ⚠️
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-2"
        >
          <h1 className="text-4xl font-bold font-[family-name:var(--font-display)] text-red-500">
            500 — Server Error
          </h1>
          <p className="text-sm text-gray-400">
            An unexpected error occurred. Let&apos;s retry preparing this page.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <button
            onClick={() => reset()}
            className="btn-saffron text-sm px-6 py-2.5 shadow-lg shadow-[#FF9933]/15"
          >
            Retry Loading
          </button>
          <Link
            href="/"
            className="btn-ghost text-sm px-6 py-2.5"
          >
            Go Back Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
