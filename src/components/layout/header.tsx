import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  ChevronDown,
} from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";
import { categories } from "@/lib/mock-data";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Shop",
    href: "/shop",
    children: categories.slice(0, 5).map((c) => ({
      label: c.name,
      href: `/shop?category=${c.slug}`,
      count: c.productCount,
    })),
  },
  { label: "Deals", href: "/shop?deals=true" },
  { label: "New Arrivals", href: "/shop?new=true" },
];

export function Header() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.items.length);
  const { setCartOpen, setSearchOpen, setMobileNavOpen, mobileNavOpen, theme, toggleTheme } = useUIStore();
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, setMobileNavOpen]);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary-600 text-white text-center text-xs sm:text-sm py-2 px-4 font-medium">
        🚀 Free shipping on orders over ৳5,000 · Use code <span className="font-bold">LAUNCH20</span> for 20% off
      </div>

      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[var(--bg)]/95 backdrop-blur-xl shadow-md border-b border-[var(--border)]"
            : "bg-[var(--bg)] border-b border-transparent"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 lg:h-[72px]">
            {/* Left: Logo + Nav */}
            <div className="flex items-center gap-8">
              {/* Mobile menu button */}
              <button
                className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                onClick={() => setMobileNavOpen(!mobileNavOpen)}
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
              >
                {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="Launchpad Home">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                  <img src="/logo.png" alt="Launchpad Logo" className="w-full h-full object-cover" />
                </div>
                <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                  Launch<span className="text-primary-600">pad</span>
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
                {navLinks.map((link) => (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      to={link.href}
                      className={cn(
                        "flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        location.pathname === link.href
                          ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                      )}
                    >
                      {link.label}
                      {link.children && <ChevronDown className="h-3.5 w-3.5" />}
                    </Link>

                    {/* Dropdown */}
                    <AnimatePresence>
                      {link.children && activeDropdown === link.label && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.15 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-[var(--bg-elevated)] rounded-xl shadow-xl border border-[var(--border)] overflow-hidden z-50"
                        >
                          <div className="p-2">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                to={child.href}
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                              >
                                <span>{child.label}</span>
                                {"count" in child && (
                                  <span className="text-xs text-[var(--text-tertiary)]">
                                    {child.count}
                                  </span>
                                )}
                              </Link>
                            ))}
                          </div>
                          <div className="border-t border-[var(--border)] p-2">
                            <Link
                              to="/shop"
                              className="flex items-center px-3 py-2 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                            >
                              View All Products →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </nav>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Search products"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              </button>

              {/* Wishlist */}
              <Link
                to="/account/wishlist"
                className="hidden sm:flex relative p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-error text-white text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account */}
              <Link
                to="/account"
                className="hidden sm:flex p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label="Account"
              >
                <User className="h-5 w-5" />
              </Link>

              {/* Cart */}
              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                aria-label={`Shopping cart, ${itemCount} items`}
              >
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && (
                  <motion.span
                    key={itemCount}
                    initial={{ scale: 0.5 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1 right-1 w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center"
                  >
                    {itemCount > 9 ? "9+" : itemCount}
                  </motion.span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 lg:hidden"
              onClick={() => setMobileNavOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg)] z-50 overflow-y-auto shadow-2xl lg:hidden"
              aria-label="Mobile navigation"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <Link to="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center">
                      <img src="/logo.png" alt="Launchpad Logo" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-lg font-bold">
                      Launch<span className="text-primary-600">pad</span>
                    </span>
                  </Link>
                  <button
                    onClick={() => setMobileNavOpen(false)}
                    className="p-2 rounded-lg hover:bg-[var(--bg-secondary)]"
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <div key={link.label}>
                      <Link
                        to={link.href}
                        className={cn(
                          "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                          location.pathname === link.href
                            ? "text-primary-600 bg-primary-50 dark:bg-primary-900/20"
                            : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                        )}
                      >
                        {link.label}
                      </Link>
                      {link.children && (
                        <div className="ml-4 mt-1 space-y-0.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.label}
                              to={child.href}
                              className="block px-4 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="border-t border-[var(--border)] mt-6 pt-6 space-y-1">
                  <Link
                    to="/account"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <User className="h-5 w-5" /> My Account
                  </Link>
                  <Link
                    to="/account/wishlist"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    <Heart className="h-5 w-5" /> Wishlist
                    {wishlistCount > 0 && (
                      <span className="ml-auto text-xs bg-primary-100 text-primary-700 px-2 py-0.5 rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </div>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
