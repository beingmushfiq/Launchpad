import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Globe,
  MessageCircle,
  Camera,
  Play,
  Mail,
  MapPin,
  Phone,
  CreditCard,
  Shield,
  Truck,
  RotateCcw,
} from "lucide-react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/shop" },
    { label: "New Arrivals", href: "/shop?new=true" },
    { label: "Best Sellers", href: "/shop?bestseller=true" },
    { label: "Deals & Offers", href: "/shop?deals=true" },
    { label: "Gift Cards", href: "/shop/gift-cards" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Exchanges", href: "/returns" },
    { label: "Track My Order", href: "/track-order" },
    { label: "Contact Us", href: "/contact" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Affiliate Program", href: "/affiliates" },
    { label: "Press", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Accessibility", href: "/accessibility" },
  ],
};

const trustBadges = [
  { icon: Truck, label: "Free Shipping", desc: "On orders ৳5,000+" },
  { icon: RotateCcw, label: "Easy Returns", desc: "30-day policy" },
  { icon: Shield, label: "Secure Payment", desc: "SSL encrypted" },
  { icon: CreditCard, label: "Flexible Pay", desc: "Multiple options" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)] pb-16 lg:pb-0" role="contentinfo">
      {/* Trust Badges */}
      <div className="border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {trustBadges.map((badge) => (
              <div key={badge.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center shrink-0">
                  <badge.icon className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{badge.label}</p>
                  <p className="text-xs text-[var(--text-secondary)]">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand + Newsletter */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="Launchpad Logo" className="w-full h-full object-cover" />
              </div>
              <span className="text-xl font-bold">
                Launch<span className="text-primary-600">pad</span>
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-sm">
              Your one-stop destination for premium products across fashion, electronics, home, beauty, and more. Quality guaranteed.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">
                Subscribe to our newsletter
              </h3>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1"
                  aria-label="Email for newsletter"
                  icon={<Mail className="h-4 w-4" />}
                />
                <Button variant="primary" size="md">
                  Subscribe
                </Button>
              </form>
              <p className="text-xs text-[var(--text-tertiary)] mt-2">
                Get 10% off your first order. Unsubscribe anytime.
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              {[Globe, MessageCircle, Camera, Play].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center text-[var(--text-secondary)] hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  aria-label={Icon.displayName || "Social media"}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
                  {title}
                </h3>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link
                        to={link.href}
                        className="text-sm text-[var(--text-secondary)] hover:text-primary-600 transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--text-tertiary)]">
              © {new Date().getFullYear()} Launchpad. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[var(--text-tertiary)]">
              <div className="flex items-center gap-1 text-xs">
                <MapPin className="h-3 w-3" /> Worldwide Shipping
              </div>
              <div className="flex items-center gap-1 text-xs">
                <Phone className="h-3 w-3" /> 1-800-LAUNCH
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
