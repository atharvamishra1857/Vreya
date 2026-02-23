import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#5D1224] text-[#FDFBF7] pt-16 pb-8 border-t border-[#D4AF37]/10 z-10 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* --- MAIN FOOTER GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="flex flex-col gap-6 lg:pr-8">
            <Link
              href="/"
              className="text-3xl font-serif font-bold tracking-[0.2em] hover:text-[#D4AF37] transition-colors w-fit"
            >
              VREYA
            </Link>
            <p className="text-sm font-light text-[#FDFBF7]/70 leading-relaxed">
              Preserving the sacred art of Indian handloom. Every thread tells a
              story of royalty, patience, and timeless devotion.
            </p>
            <div className="flex items-center gap-5 mt-2">
              <a
                href="#"
                className="text-[#FDFBF7]/70 hover:text-[#D4AF37] transition-colors"
              >
                <Instagram size={20} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-[#FDFBF7]/70 hover:text-[#D4AF37] transition-colors"
              >
                <Facebook size={20} strokeWidth={1.5} />
              </a>
              <a
                href="#"
                className="text-[#FDFBF7]/70 hover:text-[#D4AF37] transition-colors"
              >
                <Twitter size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Column 2: The Collection */}
          <div>
            <h4 className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6">
              The Collection
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-light text-[#FDFBF7]/80">
              <li>
                <Link
                  href="/collection/banarasi"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Banarasi Silk
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/kanjivaram"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Kanjivaram
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/cotton"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Cotton Handloom
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/bridal"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Bridal Edit
                </Link>
              </li>
              <li>
                <Link
                  href="/collection/new"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Client Services (Smart Routing!) */}
          <div>
            <h4 className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6">
              Client Services
            </h4>
            <ul className="flex flex-col gap-4 text-sm font-light text-[#FDFBF7]/80">
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  Care Instructions
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="hover:text-[#D4AF37] transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h4 className="text-[#D4AF37] text-sm font-bold tracking-widest uppercase mb-6">
              Contact
            </h4>
            <ul className="flex flex-col gap-6 text-sm font-light text-[#FDFBF7]/80">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <span>
                  124 Heritage Weavers Lane,
                  <br />
                  Varanasi, UP 221001, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#D4AF37] shrink-0" />
                <span>concierge@vreya.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* --- BOTTOM COPYRIGHT BAR --- */}
        <div className="border-t border-[#FDFBF7]/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-light text-[#FDFBF7]/50">
          <p>
            © {new Date().getFullYear()} VREYA Handlooms. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/support"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/support"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
