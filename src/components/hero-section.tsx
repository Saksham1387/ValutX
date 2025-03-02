"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Wallet, RefreshCw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function VaultXHero() {
  const [mounted, setMounted] = useState(false);
    const router = useRouter()
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative w-full overflow-hidden bg-black text-white">
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-10 w-64 h-64 rounded-full border border-white/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.1, 0.05],
          }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 rounded-full border border-white/10"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.1, 0.05],
          }}
          transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white/5"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1.2, 1],
            opacity: [0, 0.1, 0.05],
          }}
          transition={{ duration: 2.5, delay: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Hero content */}
      <div className="container relative z-10 mx-auto px-4 py-24 md:py-32 lg:py-40">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                <span className="block">Your Digital Assets.</span>
                <span className="block mt-2">Secured & Simplified.</span>
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg md:text-xl text-white/80 max-w-md">
                VaultX provides wallet-as-a-service infrastructure with seamless
                asset swapping capabilities.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button
              onClick={()=>{
                router.push("/dashboard")
              }}
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Animated wallet illustration */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="relative w-64 h-64 border-2 border-white rounded-3xl flex items-center justify-center"
                  initial={{ rotateY: 0 }}
                  animate={{ rotateY: 360 }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "loop",
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="absolute inset-2 border border-white/30 rounded-2xl"
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    }}
                  />
                  <Wallet className="w-20 h-20 text-white" />
                </motion.div>
              </div>

              {/* Orbiting elements */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute top-0 left-1/2 -translate-x-1/2 bg-white rounded-full p-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <RefreshCw className="w-6 h-6 text-black" />
                </motion.div>
              </motion.div>

              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full"
                animate={{ rotate: -360 }}
                transition={{
                  duration: 25,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-white rounded-full p-3"
                  whileHover={{ scale: 1.1 }}
                >
                  <Shield className="w-6 h-6 text-black" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Feature highlights */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 border-t border-white/10 pt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center p-6 border border-white/10 rounded-xl backdrop-blur-sm bg-white/5">
            <motion.div
              className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Wallet className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Secure Wallet</h3>
            <p className="text-white/70">
              Enterprise-grade security for your digital assets
            </p>
          </div>

          <div className="text-center p-6 border border-white/10 rounded-xl backdrop-blur-sm bg-white/5">
            <motion.div
              className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <RefreshCw className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Seamless Swaps</h3>
            <p className="text-white/70">
              Exchange assets with minimal fees and slippage
            </p>
          </div>

          <div className="text-center p-6 border border-white/10 rounded-xl backdrop-blur-sm bg-white/5">
            <motion.div
              className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-4"
              whileHover={{
                scale: 1.1,
                backgroundColor: "rgba(255,255,255,0.2)",
              }}
            >
              <Shield className="w-6 h-6" />
            </motion.div>
            <h3 className="text-xl font-bold mb-2">Full Control</h3>
            <p className="text-white/70">
              You always maintain ownership of your assets
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
