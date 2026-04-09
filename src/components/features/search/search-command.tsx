import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ArrowRight, Clock, TrendingUp } from "lucide-react";
import { useUIStore } from "@/store/ui-store";
import { searchProducts } from "@/lib/mock-data";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/utils";

export function SearchCommand() {
  const { searchOpen, setSearchOpen } = useUIStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const trending = ["Headphones", "Skincare", "Running Shoes", "Backpack", "Watch"];
  const recentSearches = ["wireless headphones", "yoga mat", "leather watch"];

  const handleQueryChange = (val: string) => {
    setQuery(val);
    if (val.length > 1) {
      setResults(searchProducts(val).slice(0, 6));
      setSelectedIndex(0);
    } else {
      setResults([]);
    }
  };

  // Keyboard shortcut
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(!searchOpen);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen, setSearchOpen]);

  const handleSelect = (slug: string) => {
    setSearchOpen(false);
    setQuery("");
    navigate(`/shop/${slug}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchOpen(false);
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex].slug);
    }
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60]"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-[var(--bg-elevated)] rounded-2xl shadow-2xl border border-[var(--border)] overflow-hidden"
              role="dialog"
              aria-label="Search products"
            >
              {/* Search Input */}
              <form onSubmit={handleSearchSubmit} className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text-tertiary)]" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => handleQueryChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search products, brands, categories..."
                  className="w-full pl-14 pr-20 py-4 text-base bg-transparent border-b border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)] focus:outline-none"
                  autoFocus
                  aria-label="Search"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <kbd className="hidden sm:inline-flex px-2 py-0.5 rounded bg-[var(--bg-secondary)] text-[10px] font-medium text-[var(--text-tertiary)] border border-[var(--border)]">
                    ESC
                  </kbd>
                  <button
                    type="button"
                    onClick={() => setSearchOpen(false)}
                    className="sm:hidden p-1 rounded hover:bg-[var(--bg-secondary)]"
                    aria-label="Close search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Results */}
              <div className="max-h-[50vh] overflow-y-auto">
                {query.length > 1 && results.length > 0 ? (
                  <div className="p-2">
                    <p className="px-3 py-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider">
                      Products
                    </p>
                    {results.map((product, i) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelect(product.slug)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                          i === selectedIndex
                            ? "bg-primary-50 dark:bg-primary-900/20"
                            : "hover:bg-[var(--bg-secondary)]"
                        }`}
                      >
                        <img
                          src={product.images[0]}
                          alt=""
                          className="w-10 h-10 rounded-lg object-cover bg-[var(--bg-secondary)]"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                            {product.name}
                          </p>
                          <p className="text-xs text-[var(--text-secondary)]">
                            {product.category.name} · {product.brand}
                          </p>
                        </div>
                        <span className="text-sm font-semibold text-primary-600 shrink-0">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    ))}
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full flex items-center justify-center gap-2 px-3 py-3 mt-1 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                    >
                      View all results for "{query}" <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                ) : query.length > 1 && results.length === 0 ? (
                  <div className="p-8 text-center">
                    <p className="text-sm text-[var(--text-secondary)]">
                      No products found for "{query}"
                    </p>
                  </div>
                ) : (
                  <div className="p-4 space-y-4">
                    {recentSearches.length > 0 && (
                      <div>
                        <p className="px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                          Recent
                        </p>
                        <div className="space-y-0.5">
                          {recentSearches.map((term) => (
                            <button
                              key={term}
                              onClick={() => setQuery(term)}
                              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <Clock className="h-3.5 w-3.5" /> {term}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="px-2 text-xs font-medium text-[var(--text-tertiary)] uppercase tracking-wider mb-1">
                        Trending
                      </p>
                      <div className="flex flex-wrap gap-2 px-2">
                        {trending.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                          >
                            <TrendingUp className="h-3 w-3" /> {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
