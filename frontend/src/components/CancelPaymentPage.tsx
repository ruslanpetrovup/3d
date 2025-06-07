"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CancelPaymentPage() {
  return (
    <main className="relative min-h-screen bg-[#0D1B2A] text-white flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 w-full max-w-[800px] aspect-square bg-gradient-radial from-blue-900/30 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-[#1B263B] p-5 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-gray-400 to-blue-600">
          Oh no, we're heartbroken...
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mb-5">
          It looks like something went wrong with your payment, or maybe you changed your mind. We're truly sad to see your 3D model dream slip away. <br />
          Please, let us try to make it right—your masterpiece is waiting!
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-[#415A77] hover:bg-[#324b6b] text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
        >
          Back to homepage
        </Link>
      </motion.div>
    </main>
  );
} 