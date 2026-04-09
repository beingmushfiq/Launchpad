import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

export function CartSidebar() {
  const { cartOpen, setCartOpen } = useUIStore();
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const subtotal = getSubtotal();
  const itemCount = getItemCount();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setCartOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--bg)] z-50 shadow-2xl flex flex-col"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[var(--border)]">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary-600" />
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                  Your Cart
                </h2>
                <span className="text-sm text-[var(--text-secondary)]">
                  ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full px-6 text-center">
                  <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mb-4">
                    <ShoppingBag className="h-8 w-8 text-[var(--text-tertiary)]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-[var(--text-secondary)] mb-6">
                    Looks like you haven't added anything yet.
                  </p>
                  <Button variant="primary" onClick={() => setCartOpen(false)}>
                    <Link to="/shop">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                <div className="divide-y divide-[var(--border)]">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-4 sm:p-6"
                    >
                      {/* Image */}
                      <Link
                        to={`/shop/${item.product.slug}`}
                        onClick={() => setCartOpen(false)}
                        className="w-20 h-20 rounded-lg overflow-hidden bg-[var(--bg-secondary)] shrink-0"
                      >
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/shop/${item.product.slug}`}
                          onClick={() => setCartOpen(false)}
                          className="text-sm font-medium text-[var(--text-primary)] hover:text-primary-600 transition-colors line-clamp-1"
                        >
                          {item.product.name}
                        </Link>
                        {Object.entries(item.selectedVariants).length > 0 && (
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                            {Object.values(item.selectedVariants).join(" / ")}
                          </p>
                        )}
                        <p className="text-sm font-semibold text-[var(--text-primary)] mt-1">
                          {formatPrice(item.product.price)}
                        </p>

                        <div className="flex items-center gap-3 mt-2">
                          {/* Quantity */}
                          <div className="flex items-center border border-[var(--border)] rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-l-lg transition-colors disabled:opacity-40"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-3 text-sm font-medium min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1.5 hover:bg-[var(--bg-secondary)] rounded-r-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>

                          {/* Remove */}
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-[var(--text-tertiary)] hover:text-error transition-colors"
                            aria-label={`Remove ${item.product.name}`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Line total */}
                      <p className="text-sm font-semibold text-[var(--text-primary)] shrink-0">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[var(--border)] px-6 py-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
                  <span className="text-lg font-bold text-[var(--text-primary)]">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-tertiary)]">
                  Shipping and taxes calculated at checkout
                </p>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    fullWidth
                    onClick={() => setCartOpen(false)}
                  >
                    <Link to="/cart" className="flex items-center gap-1">
                      View Cart
                    </Link>
                  </Button>
                  <Button variant="primary" fullWidth onClick={() => setCartOpen(false)}>
                    <Link to="/checkout" className="flex items-center gap-1">
                      Checkout <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
