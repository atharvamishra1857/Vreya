"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, User, Search, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/cartcontext";

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
  // --- STATES ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // NEW: Mobile Menu State

  // --- CART CONTEXT ---
  const { openCart, cartCount } = useCart();

  // --- SCROLL LISTENER ---
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setIsPastHero(window.scrollY > window.innerHeight - 80);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // --- DISABLE BODY SCROLL WHEN OVERLAYS ARE OPEN ---
  useEffect(() => {
    if (isSearchOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchOpen, isMobileMenuOpen]);

  // --- COLOR ENGINE ---
  const textColorClass =
    isHome && !isPastHero ? "text-[#FDFBF7]" : "text-[#5D1224]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-[100] px-6 md:px-12 flex items-center justify-between transition-all duration-500 bg-transparent ${
          isScrolled ? "py-4" : "py-8"
        }`}
      >
        {/* --- LEFT: LOGO --- */}
        <div className="flex items-center gap-2 z-[110]">
          <a href="/" className="group relative block drop-shadow-sm">
            <span
              className={`text-2xl font-brand font-bold tracking-[0.2em] block transition-colors duration-500 group-hover:!text-[#D4AF37] ${
                isMobileMenuOpen ? "text-[#FDFBF7]" : textColorClass
              }`}
              style={{ WebkitTextStroke: "0px" }}
            >
              VREYA
            </span>
            <span className="absolute -bottom-2 left-0 h-0.5 w-0 bg-[#D4AF37] transition-all duration-500 ease-out group-hover:w-full"></span>
          </a>
        </div>

        {/* --- CENTER: LINKS (Desktop) --- */}
        <div className="hidden md:flex items-center gap-12 drop-shadow-sm">
          {["Home", "Collection", "Our Story", "Support"].map((item) => (
            <Link
              key={item}
              href={
                item === "Home"
                  ? "/"
                  : item === "Our Story"
                    ? "/our-story"
                    : item === "Collection"
                      ? "/collection"
                      : item === "Support"
                        ? "/support"
                        : "#"
              }
              className="group relative"
            >
              <span
                className={`text-sm font-medium tracking-widest uppercase transition-colors duration-500 group-hover:!text-[#D4AF37] ${textColorClass}`}
                style={{ WebkitTextStroke: "0px" }}
              >
                {item}
              </span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#D4AF37] -translate-x-1/2 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>

        {/* --- RIGHT: ICONS --- */}
        <div className="flex items-center gap-6 md:gap-8 drop-shadow-sm z-[110]">
          {/* Search Icon */}
          <button
            onClick={() => setIsSearchOpen(true)}
            suppressHydrationWarning
            className={`hidden sm:block transition-colors duration-500 hover:!text-[#D4AF37] ${textColorClass}`}
          >
            <Search size={20} strokeWidth={1.5} />
          </button>

          {/* User Profile Icon */}
          <Link
            href="/account"
            suppressHydrationWarning
            className={`hidden sm:block transition-colors duration-500 hover:!text-[#D4AF37] ${textColorClass}`}
          >
            <User size={20} strokeWidth={1.5} />
          </Link>

          {/* Cart Icon with Dynamic Badge */}
          <button
            suppressHydrationWarning
            className={`relative transition-colors duration-500 hover:!text-[#D4AF37] ${
              isMobileMenuOpen ? "text-[#FDFBF7]" : textColorClass
            }`}
            onClick={openCart}
          >
            <ShoppingBag size={20} strokeWidth={1.5} />

            {/* --- THE CART BADGE --- */}
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#5D1224] text-[10px] font-bold h-[18px] w-[18px] rounded-full flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Menu Hamburger Toggle */}
          <button
            suppressHydrationWarning
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden transition-colors duration-500 hover:!text-[#D4AF37] ${
              isMobileMenuOpen ? "text-[#FDFBF7]" : textColorClass
            }`}
          >
            {isMobileMenuOpen ? (
              <X size={28} strokeWidth={1.5} />
            ) : (
              <Menu size={28} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </nav>

      {/* --- NEW: MOBILE MENU OVERLAY --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[90] bg-[#5D1224] flex flex-col pt-32 px-8"
          >
            <div className="flex flex-col gap-8">
              {["Home", "Collection", "Our Story", "Support"].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                >
                  <Link
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Our Story"
                          ? "/our-story"
                          : item === "Collection"
                            ? "/collection"
                            : item === "Support"
                              ? "/support"
                              : "#"
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-3xl font-brand tracking-widest text-[#FDFBF7] hover:text-[#D4AF37] transition-colors border-b border-[#FDFBF7]/10 pb-4 block"
                  >
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Mobile Search/Account Links */}
            <div className="mt-auto pb-12 flex gap-8">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="flex items-center gap-2 text-[#FDFBF7]/80 hover:text-[#D4AF37]"
              >
                <Search size={20} />
                <span className="uppercase tracking-widest text-sm">
                  Search
                </span>
              </button>
              <Link
                href="/account"
                className="flex items-center gap-2 text-[#FDFBF7]/80 hover:text-[#D4AF37]"
              >
                <User size={20} />
                <span className="uppercase tracking-widest text-sm">
                  Account
                </span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- FULL SCREEN SEARCH OVERLAY (UNCHANGED) --- */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[200] bg-[#FDFBF7]/95 flex flex-col items-center justify-center px-6"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-8 right-6 md:top-10 md:right-12 text-[#5D1224] hover:text-[#D4AF37] transition-colors"
            >
              <X size={32} strokeWidth={1} />
            </button>

            {/* Search Input Area */}
            <div className="w-full max-w-3xl flex flex-col gap-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <input
                  type="text"
                  autoFocus
                  placeholder="What are you looking for?"
                  className="w-full bg-transparent border-b-2 border-[#5D1224]/20 py-4 text-3xl md:text-5xl font-serif text-[#5D1224] placeholder:text-[#5D1224]/30 focus:outline-none focus:border-[#D4AF37] transition-colors"
                />
              </motion.div>

              {/* Popular Searches */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="flex flex-col items-center gap-4"
              >
                <span className="text-xs tracking-[0.2em] uppercase font-bold text-[#D4AF37]">
                  Popular Searches
                </span>
                <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                  {[
                    "Banarasi Silk",
                    "Bridal Kanjivaram",
                    "Cotton Handloom",
                    "Red Sarees",
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => setIsSearchOpen(false)}
                      className="text-[#5D1224]/60 hover:text-[#5D1224] transition-colors font-light text-sm md:text-base border-b border-transparent hover:border-[#D4AF37] pb-1"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
