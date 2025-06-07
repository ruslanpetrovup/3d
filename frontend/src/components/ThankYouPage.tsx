"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <main className="relative min-h-screen bg-[#0D1B2A] text-white flex flex-col items-center justify-center px-4 py-16 text-center">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 w-full max-w-[800px] aspect-square bg-gradient-radial from-green-500/20 to-transparent rounded-full blur-[80px] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-md bg-[#1B263B] p-5 sm:p-8 rounded-2xl shadow-lg border border-white/10"
      >
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-blue-400">
          Thank you for your order!
        </h1>
        <p className="text-sm sm:text-base text-gray-300 mb-5">
          We have received your payment and started preparing your 3D model and packaging. <br />
          Expect an email with the tracking number.
        </p>

        <Link
          href="/"
          className="inline-block w-full bg-[#F97316] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-xl transition shadow-md"
        >
          Return to homepage
        </Link>
      </motion.div>
    </main>
  );
} 