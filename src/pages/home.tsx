import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Timer,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Truck,
  RotateCcw,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/features/products/product-card";
import { Badge } from "@/components/ui/badge";
import {
  categories,
  products,
  getFeaturedProducts,
  getNewArrivals,
  testimonials,
  brands,
} from "@/lib/mock-data";
import { formatPrice } from "@/lib/utils";
import { useState, useEffect } from "react";

// ---- Animation Variants ----
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustBar />
      <CategoriesSection />
      <FeaturedProducts />
      <DealsBanner />
      <NewArrivalsSection />
      <BrandsMarquee />
      <TestimonialsSection />
      <NewsletterSection />
    </div>
  );
}

// ========== HERO ==========
function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-hero" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgyVjRoMzR6TTIgMjBoMzR2LTJIMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center lg:text-left"
          >
            <motion.div variants={fadeInUp}>
              <Badge variant="warning" size="md" className="mb-4 inline-flex">
                <Sparkles className="h-3.5 w-3.5 mr-1" /> Spring Collection 2026
              </Badge>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] mb-6"
            >
              Discover
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-300">
                Premium
              </span>{" "}
              Products
              <br />
              For Every Lifestyle
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-white/70 max-w-lg mx-auto lg:mx-0 mb-8"
            >
              From fashion to electronics, home essentials to beauty — explore curated collections from world-class brands. Free shipping on orders over ৳5,000.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 justify-center lg:justify-start">
              <Link to="/shop">
                <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 shadow-xl">
                  Shop Now <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/shop?new=true">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-white/50"
                >
                  New Arrivals
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-8 mt-10 justify-center lg:justify-start"
            >
              {[
                { value: "50K+", label: "Products" },
                { value: "4.8★", label: "Rating" },
                { value: "100K+", label: "Happy Customers" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/50">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — Featured Product Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/20 to-purple-400/20 rounded-3xl blur-3xl" />
              <div className="relative grid grid-cols-2 gap-4">
                {products.slice(0, 4).map((product) => (
                  <Link
                    key={product.id}
                    to={`/shop/${product.slug}`}
                    className="group rounded-2xl overflow-hidden bg-white/10 backdrop-blur-md border border-white/20 p-3 hover:bg-white/20 transition-all"
                  >
                    <div className="aspect-square rounded-xl overflow-hidden mb-2">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <p className="text-sm font-medium text-white truncate">{product.name}</p>
                    <p className="text-sm font-bold text-amber-300">{formatPrice(product.price)}</p>
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ========== TRUST BAR ==========
function TrustBar() {
  const features = [
    { icon: Truck, text: "Free Shipping Over ৳5,000" },
    { icon: RotateCcw, text: "30-Day Returns" },
    { icon: ShieldCheck, text: "Secure Checkout" },
    { icon: Zap, text: "Fast Delivery" },
  ];

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-6">
          {features.map((f) => (
            <div key={f.text} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] whitespace-nowrap shrink-0">
              <f.icon className="h-4 w-4 text-primary-600" />
              <span className="font-medium">{f.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ========== CATEGORIES ==========
function CategoriesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Shop by Category
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              Browse our curated collections
            </p>
          </div>
          <Link
            to="/shop"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={fadeInUp}>
              <Link
                to={`/shop?category=${cat.slug}`}
                className="group block rounded-2xl overflow-hidden relative aspect-[4/5] bg-[var(--bg-secondary)]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                  <p className="text-xs text-white/60 mt-0.5">
                    {cat.productCount} products
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ========== FEATURED PRODUCTS ==========
function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
        >
          <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-5 w-5 text-primary-600" />
                <span className="text-sm font-medium text-primary-600">Trending Now</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
                Featured Products
              </h2>
            </div>
            <Link
              to="/shop?featured=true"
              className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              View All <ChevronRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {featured.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ========== DEALS BANNER ==========
function DealsBanner() {
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 12 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) { seconds = 59; minutes--; }
        if (minutes < 0) { minutes = 59; hours--; }
        if (hours < 0) { hours = 23; minutes = 59; seconds = 59; }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-700 via-purple-600 to-primary-800" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6bTAtMzBWMkgyVjRoMzR6TTIgMjBoMzR2LTJIMnYyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />

        <div className="relative px-8 py-12 sm:px-12 sm:py-16 text-center">
          <Badge variant="warning" size="md" className="mb-4 inline-flex">
            <Timer className="h-3.5 w-3.5 mr-1" /> Limited Time
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Flash Sale — Up to 50% Off
          </h2>
          <p className="text-white/70 mb-6 max-w-md mx-auto">
            Don't miss out on our biggest sale of the season. Premium products at unbeatable prices.
          </p>

          {/* Timer */}
          <div className="flex items-center justify-center gap-3 mb-8">
            {Object.entries(timeLeft).map(([label, value]) => (
              <div key={label} className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl font-bold text-white font-mono">
                    {String(value).padStart(2, "0")}
                  </span>
                </div>
                <span className="text-xs text-white/50 mt-1 block capitalize">{label}</span>
              </div>
            ))}
          </div>

          <Link to="/shop?deals=true">
            <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 shadow-xl">
              Shop the Sale <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

// ========== NEW ARRIVALS ==========
function NewArrivalsSection() {
  const newProducts = getNewArrivals();

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-5 w-5 text-accent-500" />
              <span className="text-sm font-medium text-accent-600">Just Dropped</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?new=true"
            className="hidden sm:flex items-center gap-1 text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors"
          >
            View All <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ========== BRANDS MARQUEE ==========
function BrandsMarquee() {
  return (
    <section className="bg-[var(--bg-secondary)] border-y border-[var(--border)] py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 text-center">
        <p className="text-sm font-medium text-[var(--text-tertiary)] uppercase tracking-widest">
          Trusted by world-class brands
        </p>
      </div>
      <div className="relative">
        <div className="flex gap-12 animate-marquee whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-xl font-bold text-[var(--text-tertiary)]/40 hover:text-[var(--text-secondary)] transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </section>
  );
}

// ========== TESTIMONIALS ==========
function TestimonialsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
            What Our Customers Say
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Real reviews from real people
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              variants={fadeInUp}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg)] p-6 hover:shadow-lg transition-shadow"
            >
              <Quote className="h-6 w-6 text-primary-200 dark:text-primary-800 mb-3" />
              <p className="text-sm text-[var(--text-secondary)] mb-4 line-clamp-4">
                {t.comment}
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${i < t.rating ? "text-amber-400 fill-current" : "text-surface-300"}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-9 h-9 rounded-full object-cover"
                  loading="lazy"
                />
                <div>
                  <p className="text-sm font-medium text-[var(--text-primary)]">{t.name}</p>
                  <p className="text-xs text-[var(--text-tertiary)]">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ========== NEWSLETTER ==========
function NewsletterSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-3xl gradient-hero p-8 sm:p-12 text-center"
      >
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Join the Launchpad Community
        </h2>
        <p className="text-white/70 mb-6 max-w-md mx-auto">
          Be the first to know about new arrivals, exclusive deals, and style tips. Get 10% off your first order.
        </p>
        <form
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 rounded-xl bg-white/15 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 text-sm backdrop-blur-sm"
            aria-label="Email for newsletter"
          />
          <Button size="lg" className="bg-white text-primary-700 hover:bg-white/90 shrink-0">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </section>
  );
}
