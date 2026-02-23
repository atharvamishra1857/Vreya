"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#5D1224] flex flex-col pt-24">
      <Navbar />

      <main className="flex-grow flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Header Toggle */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              {isLogin ? "Sign In" : "Create Account"}
            </h1>
            <div className="flex justify-center gap-6 text-sm tracking-widest uppercase font-medium">
              <button
                onClick={() => setIsLogin(true)}
                className={`transition-colors duration-300 pb-1 border-b-2 ${isLogin ? "border-[#D4AF37] text-[#5D1224]" : "border-transparent text-[#5D1224]/50 hover:text-[#5D1224]"}`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`transition-colors duration-300 pb-1 border-b-2 ${!isLogin ? "border-[#D4AF37] text-[#5D1224]" : "border-transparent text-[#5D1224]/50 hover:text-[#5D1224]"}`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Form Area */}
          <div className="bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-black/5 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {isLogin ? (
                /* --- LOGIN FORM --- */
                <motion.form
                  key="login"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <div className="flex flex-col gap-2">
                    <input
                      type="password"
                      placeholder="Password"
                      className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <Link
                      href="#"
                      className="text-xs text-[#D4AF37] hover:underline self-end mt-1"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <button className="w-full bg-[#5D1224] text-[#FDFBF7] py-4 mt-4 tracking-widest uppercase text-sm font-medium hover:bg-[#D4AF37] transition-colors">
                    Sign In
                  </button>
                </motion.form>
              ) : (
                /* --- REGISTER FORM --- */
                <motion.form
                  key="register"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-6"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full bg-transparent border-b border-[#5D1224]/20 py-3 text-[#5D1224] placeholder:text-[#5D1224]/40 focus:outline-none focus:border-[#D4AF37] transition-colors"
                  />

                  <button className="w-full bg-[#5D1224] text-[#FDFBF7] py-4 mt-4 tracking-widest uppercase text-sm font-medium hover:bg-[#D4AF37] transition-colors">
                    Create Account
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
