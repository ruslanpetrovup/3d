"use client";

import UploadImageButton from "@/components/UploadImageButton";
import ModelCarousel from "@/components/ModelCarousel";
import Image from "next/image";
import { motion } from "framer-motion";
import LatestModels from '../components/LatestModels';

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0D1B2A] text-white px-4 py-10 font-sans">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-0 bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-7xl md:text-9xl font-bold leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md mb-[-20px]">
          Create 
          </h1>
          <h1 className="text-4xl md:text-[61px] font-bold font-cursive leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md mb-[-5px]">
           a starter pack 
          </h1>
          <h1 className="text-2xl md:text-[43px] font-medium mb-6 leading-tight bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 bg-clip-text text-transparent drop-shadow-md">
           based on your photo 
          </h1>
          <p className="text-lg md:text-[17px] mb-8 text-gray-300">
            Upload a photo — get your 3D model in a few
            clicks.
          </p>
          <motion.button
            onClick={() => {
              const target = document.getElementById("preview");
              if (target) {
                target.scrollIntoView({ behavior: "smooth" });
              }
            }}
            whileHover={{ scale: 1.08 }}
            className="relative bg-[#F97316] hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-2xl transition shadow-lg"
          >
            <span className="absolute top-0 left-0 w-full h-full rounded-2xl animate-pulse bg-orange-500 opacity-10 z-0" />
            <span className="relative z-10 uppercase">Try it now</span>
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex-1"
        >
          <div className="relative w-fit mx-auto">
            <Image
              src="/model.png"
              alt="3D hero"
              width={450}
              height={450}
              className="rounded-2xl"
            />
          </div>
        </motion.div>
      </section>

      {/* How it Works */}
      <section className="max-w-6xl mx-auto mt-32 relative z-10" id="preview">
        <h2 className="text-3xl font-bold mb-10 text-center text-white">
          How it works
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14 text-center">
          {[1, 2, 3].map((step, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col items-center bg-[#1B263B] p-6 rounded-2xl border border-white/10 hover:border-orange-500 shadow-xl hover:shadow-orange-500/30 transition duration-300"
            >
              <div className="text-white text-3xl w-14 h-14 rounded-full bg-[#415A77] flex items-center justify-center font-bold mb-4 shadow-md">
                {step}
              </div>
              {step === 1 && (
                <>
                  <p className="mb-4 text-gray-200">Upload your photo</p>
                  <UploadImageButton />
                </>
              )}
              {step === 2 && (
                <>
                  <p className="mb-4 text-gray-200">We create the scene</p>
                  <Image
                    src="/man.svg"
                    alt="man"
                    width={50}
                    height={50}
                  />
                </>
              )}
              {step === 3 && (
                <>
                <p className="mb-4 text-gray-200">
                Try the model — love it, buy it!
                </p>
                <Image
                    src="/stars.svg"
                    alt="stars"
                    width={50}
                    height={50}
                  />
                </>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      <LatestModels />
    </main>
  );
} 