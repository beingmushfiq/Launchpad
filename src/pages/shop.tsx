import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Star,
  ChevronRight,
} from "lucide-react";
import { products, categories } from "@/lib/mock-data";
import { ProductCard } from "@/components/features/products/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";


const sortOptions = [
  { label: "Relevance", value: "relevance" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest", value: "newest" },
  { label: "Top Rated", value: "rating" },
];

export default function ShopPage() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("category") ? [searchParams.get("category")!] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [sortOpen, setSortOpen] = useState(false);

  const searchQuery = searchParams.get("search") || "";
  const isNew = searchParams.get("new") === "true";
  const isDeals = searchParams.get("deals") === "true";

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      result = result.filter((p) =>
        selectedCategories.includes(p.category.slug)
      );
    }

    // New arrivals
    if (isNew) {
      result = result.filter((p) => p.isNew);
    }

    // Deals
    if (isDeals) {
      result = result.filter((p) => p.originalPrice);
    }

    // Price range
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Rating
    if (selectedRating) {
      result = result.filter((p) => p.rating >= selectedRating);
    }

    // Sort
    switch (sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
    }

    return result;
  }, [searchQuery, selectedCategories, priceRange, selectedRating, sortBy, isNew, isDeals]);

  const activeFilterCount =
    selectedCategories.length +
    (selectedRating ? 1 : 0) +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 50000]);
    setSelectedRating(null);
  };

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Breadcrumbs */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
            <span className="text-[var(--text-primary)] font-medium">Shop</span>
            {searchQuery && (
              <>
                <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
                <span className="text-[var(--text-secondary)]">"{searchQuery}"</span>
              </>
            )}
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar Filters */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Filters</h2>
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                  >
                    Clear all ({activeFilterCount})
                  </button>
                )}
              </div>

              {/* Categories */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Categories</h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat.slug)}
                        onChange={() => toggleCategory(cat.slug)}
                        className="w-4 h-4 rounded border-[var(--border)] text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors flex-1">
                        {cat.name}
                      </span>
                      <span className="text-xs text-[var(--text-tertiary)]">{cat.productCount}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Price Range</h3>
                <div className="space-y-3">
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-primary-600"
                    aria-label="Maximum price"
                  />
                  <div className="flex items-center gap-2">
                    <div className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-center">
                      ৳{priceRange[0]}
                    </div>
                    <span className="text-[var(--text-tertiary)]">—</span>
                    <div className="flex-1 px-3 py-1.5 rounded-lg border border-[var(--border)] text-sm text-center">
                      ৳{priceRange[1]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div>
                <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Rating</h3>
                <div className="space-y-1.5">
                  {[4, 3, 2, 1].map((r) => (
                    <label
                      key={r}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="rating"
                        checked={selectedRating === r}
                        onChange={() => setSelectedRating(r)}
                        className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                      />
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              "h-3.5 w-3.5",
                              i < r ? "text-amber-400 fill-current" : "text-surface-300"
                            )}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-[var(--text-secondary)]">& up</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="flex items-center gap-3">
                {/* Mobile filter button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <SlidersHorizontal className="h-4 w-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-primary-600 text-white text-xs flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-sm text-[var(--text-secondary)]">
                  <span className="font-medium text-[var(--text-primary)]">{filteredProducts.length}</span>{" "}
                  {filteredProducts.length === 1 ? "product" : "products"}
                  {searchQuery && ` for "${searchQuery}"`}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort */}
                <div className="relative">
                  <button
                    onClick={() => setSortOpen(!sortOpen)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                  >
                    Sort <ChevronDown className="h-3.5 w-3.5" />
                  </button>
                  <AnimatePresence>
                    {sortOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        className="absolute right-0 top-full mt-1 w-48 bg-[var(--bg-elevated)] rounded-xl shadow-xl border border-[var(--border)] overflow-hidden z-20"
                      >
                        {sortOptions.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                            className={cn(
                              "w-full text-left px-4 py-2.5 text-sm transition-colors",
                              sortBy === opt.value
                                ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20 font-medium"
                                : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* View toggle */}
                <div className="hidden sm:flex items-center border border-[var(--border)] rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "grid" ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20" : "text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)]"
                    )}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={cn(
                      "p-2 transition-colors",
                      viewMode === "list" ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20" : "text-[var(--text-tertiary)] hover:bg-[var(--bg-secondary)]"
                    )}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filter Pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedCategories.map((slug) => {
                  const cat = categories.find((c) => c.slug === slug);
                  return (
                    <button
                      key={slug}
                      onClick={() => toggleCategory(slug)}
                      className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-200 transition-colors"
                    >
                      {cat?.name} <X className="h-3 w-3" />
                    </button>
                  );
                })}
                {selectedRating && (
                  <button
                    onClick={() => setSelectedRating(null)}
                    className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300 hover:bg-primary-200 transition-colors"
                  >
                    {selectedRating}+ Stars <X className="h-3 w-3" />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="px-3 py-1 rounded-full text-xs font-medium text-[var(--text-tertiary)] hover:text-error transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div
                className={cn(
                  "grid gap-4 md:gap-6",
                  viewMode === "grid"
                    ? "grid-cols-2 md:grid-cols-3"
                    : "grid-cols-1"
                )}
              >
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
                  <SlidersHorizontal className="h-8 w-8 text-[var(--text-tertiary)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  No products found
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mb-4">
                  Try adjusting your filters or search terms
                </p>
                <Button variant="outline" onClick={clearFilters}>
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-50 lg:hidden"
              onClick={() => setShowFilters(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-80 max-w-[85vw] bg-[var(--bg)] z-50 overflow-y-auto shadow-2xl lg:hidden p-6"
              role="dialog"
              aria-label="Filters"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button onClick={() => setShowFilters(false)} className="p-2 rounded-lg hover:bg-[var(--bg-secondary)]" aria-label="Close filters">
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Repeat filter UI for mobile */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((cat) => (
                      <label key={cat.id} className="flex items-center gap-2.5 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleCategory(cat.slug)}
                          className="w-4 h-4 rounded border-[var(--border)] text-primary-600"
                        />
                        <span className="text-sm">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-semibold mb-3">Price Range</h3>
                  <input
                    type="range"
                    min={0}
                    max={50000}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full accent-primary-600"
                    aria-label="Maximum price"
                  />
                  <p className="text-sm text-[var(--text-secondary)] mt-2">Up to ৳{priceRange[1]}</p>
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                <Button variant="outline" fullWidth onClick={clearFilters}>Clear</Button>
                <Button variant="primary" fullWidth onClick={() => setShowFilters(false)}>Apply</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
