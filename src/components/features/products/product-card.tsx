import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, getDiscountPercentage, cn } from "@/lib/utils";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  onQuickView?: (product: Product) => void;
}

export function ProductCard({ product, onQuickView }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const addItem = useCartStore((s) => s.addItem);
  const { toggleItem, isInWishlist } = useWishlistStore();
  const wishlisted = isInWishlist(product.id);

  const discount = product.originalPrice
    ? getDiscountPercentage(product.originalPrice, product.price)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultVariants: Record<string, string> = {};
    if (product.variants.length > 0) {
      defaultVariants[product.variants[0].type] = product.variants[0].value;
    }
    addItem(product, 1, defaultVariants);
    toast.success(`${product.name} added to cart`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product.id);
    toast(wishlisted ? "Removed from wishlist" : "Added to wishlist", {
      icon: wishlisted ? "💔" : "❤️",
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onQuickView?.(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4 }}
    >
      <Link
        to={`/shop/${product.slug}`}
        className="group block rounded-xl overflow-hidden border border-[var(--border)] bg-[var(--bg)] hover:shadow-lg hover:border-[var(--border-hover)] transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[var(--bg-secondary)]">
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}
          <img
            src={product.images[isHovered && product.images[1] ? 1 : 0]}
            alt={product.name}
            className={cn(
              "w-full h-full object-cover transition-all duration-500",
              isHovered ? "scale-105" : "scale-100",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.isNew && <Badge variant="info">New</Badge>}
            {discount > 0 && <Badge variant="error">-{discount}%</Badge>}
            {product.isBestseller && <Badge variant="warning">Bestseller</Badge>}
          </div>

          {/* Action Buttons */}
          <div
            className={cn(
              "absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
            )}
          >
            <button
              onClick={handleWishlist}
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 shadow-md",
                wishlisted
                  ? "bg-error text-white"
                  : "bg-white/90 text-surface-700 hover:bg-white hover:text-error"
              )}
              aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={cn("h-4 w-4", wishlisted && "fill-current")} />
            </button>
            {onQuickView && (
              <button
                onClick={handleQuickView}
                className="w-9 h-9 rounded-full bg-white/90 text-surface-700 hover:bg-white hover:text-primary-600 flex items-center justify-center transition-all duration-200 shadow-md"
                aria-label="Quick view"
              >
                <Eye className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Add to Cart */}
          <div
            className={cn(
              "absolute bottom-0 inset-x-0 p-3 transition-all duration-300",
              isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            )}
          >
            <button
              onClick={handleAddToCart}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 hover:bg-primary-700 text-white py-2.5 rounded-lg text-sm font-medium transition-colors shadow-lg"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-xs text-[var(--text-tertiary)] mb-1 uppercase tracking-wider">
            {product.brand}
          </p>
          <h3 className="text-sm font-medium text-[var(--text-primary)] group-hover:text-primary-600 transition-colors line-clamp-1 mb-1.5">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2">
            <div className="flex items-center">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-3.5 w-3.5",
                    i < Math.floor(product.rating) ? "text-amber-400 fill-current" : "text-surface-300"
                  )}
                />
              ))}
            </div>
            <span className="text-xs text-[var(--text-tertiary)]">
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-[var(--text-primary)]">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-[var(--text-tertiary)] line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {/* Color Variants */}
          {product.variants.filter((v) => v.type === "color").length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.variants
                .filter((v) => v.type === "color")
                .slice(0, 4)
                .map((variant) => (
                  <span
                    key={variant.id}
                    className="w-4 h-4 rounded-full border-2 border-white shadow-sm ring-1 ring-surface-200"
                    style={{ backgroundColor: variant.colorHex }}
                    title={variant.name}
                  />
                ))}
              {product.variants.filter((v) => v.type === "color").length > 4 && (
                <span className="text-xs text-[var(--text-tertiary)]">
                  +{product.variants.filter((v) => v.type === "color").length - 4}
                </span>
              )}
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
