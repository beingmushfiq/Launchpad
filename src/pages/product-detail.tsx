import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ShieldCheck,
  Minus,
  Plus,
  ShoppingBag,
  Zap,
  Check,
} from "lucide-react";
import { getProductBySlug, products } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductCard } from "@/components/features/products/product-card";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import { toast } from "sonner";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || "");
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Product Not Found</h1>
        <p className="text-[var(--text-secondary)] mb-6">The product you're looking for doesn't exist.</p>
        <Link to="/shop">
          <Button variant="primary">Back to Shop</Button>
        </Link>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);
  const discount = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const variantTypes = [...new Set(product.variants.map((v) => v.type))];
  const relatedProducts = products
    .filter((p) => p.category.id === product.category.id && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    toast.success(`${product.name} added to cart`, {
      description: `Quantity: ${quantity}`,
    });
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Breadcrumbs */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <nav className="flex items-center gap-2 text-sm" aria-label="Breadcrumb">
            <Link to="/" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
            <Link to="/shop" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">Shop</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
            <Link to={`/shop?category=${product.category.slug}`} className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors">{product.category.name}</Link>
            <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
            <span className="text-[var(--text-primary)] font-medium truncate max-w-[200px]">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-[var(--bg-secondary)]">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.isNew && <Badge variant="info" size="md">New</Badge>}
                  {discount > 0 && <Badge variant="error" size="md">-{discount}%</Badge>}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-3 overflow-x-auto no-scrollbar">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={cn(
                      "w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all",
                      selectedImage === i
                        ? "border-primary-600 ring-2 ring-primary-200"
                        : "border-transparent hover:border-[var(--border)]"
                    )}
                    aria-label={`View image ${i + 1}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Brand & Title */}
            <div>
              <p className="text-sm text-primary-600 font-medium mb-1">{product.brand}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-surface-300"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">{product.rating}</span>
                <span className="text-sm text-[var(--text-secondary)]">
                  ({product.reviewCount} reviews)
                </span>
                <span className="text-sm text-success font-medium">· In Stock</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[var(--text-primary)]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-lg text-[var(--text-tertiary)] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <Badge variant="error">Save {discount}%</Badge>
                </>
              )}
            </div>

            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              {product.shortDescription}
            </p>

            {/* Variants */}
            {variantTypes.map((type) => {
              const typeVariants = product.variants.filter((v) => v.type === type);
              return (
                <div key={type}>
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2.5 capitalize">
                    {type}: <span className="font-normal text-[var(--text-secondary)]">{selectedVariants[type] || "Select"}</span>
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {typeVariants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariants((prev) => ({ ...prev, [type]: variant.value }))}
                        className={cn(
                          "relative transition-all",
                          type === "color" ? (
                            cn(
                              "w-9 h-9 rounded-full border-2",
                              selectedVariants[type] === variant.value
                                ? "border-primary-600 ring-2 ring-primary-200"
                                : "border-[var(--border)] hover:border-[var(--border-hover)]"
                            )
                          ) : (
                            cn(
                              "px-4 py-2 rounded-lg border text-sm font-medium",
                              selectedVariants[type] === variant.value
                                ? "border-primary-600 bg-primary-50 text-primary-700 dark:bg-primary-900/20 dark:text-primary-300"
                                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]",
                              variant.stock === 0 && "opacity-40 cursor-not-allowed line-through"
                            )
                          )
                        )}
                        style={type === "color" ? { backgroundColor: variant.colorHex } : undefined}
                        disabled={variant.stock === 0}
                        title={variant.name}
                        aria-label={`Select ${type}: ${variant.name}`}
                      >
                        {type === "color" && selectedVariants[type] === variant.value && (
                          <Check className="h-4 w-4 text-white absolute inset-0 m-auto drop-shadow" />
                        )}
                        {type !== "color" && variant.name}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Quantity + Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center border border-[var(--border)] rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-[var(--bg-secondary)] rounded-l-lg transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-6 text-sm font-medium min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-[var(--bg-secondary)] rounded-r-lg transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
                <ShoppingBag className="h-4 w-4" /> Add to Cart
              </Button>

              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  toggleItem(product.id);
                  toast(wishlisted ? "Removed from wishlist" : "Added to wishlist");
                }}
                className={cn(wishlisted && "border-error text-error hover:bg-red-50")}
              >
                <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
              </Button>
            </div>

            {/* Buy Now */}
            <Link to="/checkout">
              <Button variant="accent" size="lg" fullWidth onClick={handleAddToCart}>
                <Zap className="h-4 w-4" /> Buy Now
              </Button>
            </Link>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-[var(--border)]">
              {[
                { icon: Truck, label: "Free Shipping", desc: "Over ৳5,000" },
                { icon: RotateCcw, label: "Easy Returns", desc: "30 days" },
                { icon: ShieldCheck, label: "Warranty", desc: "2 years" },
              ].map((badge) => (
                <div key={badge.label} className="text-center">
                  <badge.icon className="h-5 w-5 mx-auto text-primary-600 mb-1" />
                  <p className="text-xs font-medium text-[var(--text-primary)]">{badge.label}</p>
                  <p className="text-[10px] text-[var(--text-tertiary)]">{badge.desc}</p>
                </div>
              ))}
            </div>

            {/* Share */}
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <Share2 className="h-4 w-4" />
              <span>SKU: {product.sku}</span>
              <span>·</span>
              <span>Category: {product.category.name}</span>
            </div>
          </motion.div>
        </div>

        {/* Tabs: Description, Specs, Reviews */}
        <div className="mt-16">
          <div className="flex gap-0 border-b border-[var(--border)]">
            {(["description", "specs", "reviews"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-6 py-3 text-sm font-medium border-b-2 transition-colors capitalize",
                  activeTab === tab
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                )}
              >
                {tab === "specs" ? "Specifications" : tab}
              </button>
            ))}
          </div>
          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose prose-sm max-w-none text-[var(--text-secondary)]">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === "specs" && (
              <div className="max-w-lg">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-3 border-b border-[var(--border)] last:border-0">
                    <span className="text-sm text-[var(--text-secondary)]">{key}</span>
                    <span className="text-sm font-medium text-[var(--text-primary)]">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === "reviews" && (
              <div className="text-center py-10">
                <Star className="h-10 w-10 text-amber-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                  {product.rating} out of 5
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Based on {product.reviewCount} reviews
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 inset-x-0 bg-[var(--bg)]/95 backdrop-blur-xl border-t border-[var(--border)] p-4 lg:hidden z-30">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-lg font-bold text-[var(--text-primary)]">{formatPrice(product.price)}</p>
            {product.originalPrice && (
              <p className="text-xs text-[var(--text-tertiary)] line-through">{formatPrice(product.originalPrice)}</p>
            )}
          </div>
          <Button variant="primary" size="lg" fullWidth onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
