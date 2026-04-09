import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, ArrowRight, ArrowLeft, Tag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const [coupon, setCoupon] = useState("");
  const subtotal = getSubtotal();
  const shipping = subtotal > 5000 ? 0 : 100;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <div className="w-24 h-24 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="h-10 w-10 text-[var(--text-tertiary)]" />
        </div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Your Cart is Empty</h1>
        <p className="text-[var(--text-secondary)] mb-8 max-w-sm mx-auto">
          Looks like you haven't added anything to your cart yet. Start exploring our products!
        </p>
        <Link to="/shop">
          <Button variant="primary" size="lg">
            <ArrowLeft className="h-4 w-4" /> Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-8">
        Shopping Cart <span className="text-[var(--text-secondary)] font-normal text-lg">({items.length} items)</span>
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="flex gap-4 sm:gap-6 p-4 sm:p-6 rounded-xl border border-[var(--border)] bg-[var(--bg)]"
            >
              <Link to={`/shop/${item.product.slug}`} className="w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0">
                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <Link to={`/shop/${item.product.slug}`} className="text-sm sm:text-base font-medium text-[var(--text-primary)] hover:text-primary-600 transition-colors line-clamp-1">
                      {item.product.name}
                    </Link>
                    {Object.entries(item.selectedVariants).length > 0 && (
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                        {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(" · ")}
                      </p>
                    )}
                    <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-secondary)] text-[var(--text-tertiary)] hover:text-error transition-colors shrink-0"
                    aria-label={`Remove ${item.product.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-[var(--border)] rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} className="p-2 hover:bg-[var(--bg-secondary)] rounded-l-lg disabled:opacity-40" aria-label="Decrease">
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-4 text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-[var(--bg-secondary)] rounded-r-lg" aria-label="Increase">
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-base font-bold text-[var(--text-primary)]">
                    {formatPrice(item.totalPrice)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="flex items-center justify-between pt-4">
            <Link to="/shop" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center gap-1 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Continue Shopping
            </Link>
            <button onClick={() => { clearCart(); toast.success("Cart cleared"); }} className="text-sm text-[var(--text-tertiary)] hover:text-error transition-colors">
              Clear Cart
            </button>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
            <h2 className="text-lg font-semibold text-[var(--text-primary)]">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span className="font-medium">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span className="font-medium">{shipping === 0 ? <span className="text-success">Free</span> : formatPrice(shipping)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Estimated Tax</span><span className="font-medium">{formatPrice(tax)}</span></div>
            </div>

            {/* Coupon */}
            <div className="pt-2">
              <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); toast.success("Coupon applied!"); }}>
                <Input placeholder="Coupon code" value={coupon} onChange={(e) => setCoupon(e.target.value)} icon={<Tag className="h-4 w-4" />} className="flex-1" />
                <Button variant="outline" size="md" type="submit">Apply</Button>
              </form>
            </div>

            <div className="border-t border-[var(--border)] pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <Link to="/checkout" className="block">
              <Button variant="primary" size="lg" fullWidth>
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>

            {shipping > 0 && (
              <p className="text-xs text-center text-[var(--text-tertiary)]">
                Add {formatPrice(5000 - subtotal)} more for free shipping
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
