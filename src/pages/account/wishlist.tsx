import { useWishlistStore } from "@/store/wishlist-store";
import { products } from "@/lib/mock-data";
import { ProductCard } from "@/components/features/products/product-card";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { items } = useWishlistStore();
  const wishlistProducts = products.filter((p) => items.includes(p.id));

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
        My Wishlist <span className="text-[var(--text-secondary)] font-normal text-lg">({items.length})</span>
      </h1>

      {wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {wishlistProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
            <Heart className="h-8 w-8 text-[var(--text-tertiary)]" />
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">Your wishlist is empty</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-6">Save items you love by clicking the heart icon</p>
          <Link to="/shop"><Button variant="primary">Explore Products</Button></Link>
        </div>
      )}
    </div>
  );
}
