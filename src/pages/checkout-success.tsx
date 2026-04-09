import { Link } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CheckoutSuccessPage() {
  // We use lazy initializers for stable mock data that doesn't change on re-render
  const [orderId] = useState(() => Math.random().toString(36).substring(2, 8).toUpperCase());
  const [deliveryDate] = useState(() => {
    return new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { 
      weekday: "long", 
      month: "long", 
      day: "numeric" 
    });
  });

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-20 text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 15, stiffness: 200 }}
        className="w-20 h-20 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-success" />
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">Order Confirmed! 🎉</h1>
        <p className="text-[var(--text-secondary)] mb-2">Thank you for shopping with Launchpad.</p>
        <p className="text-sm text-[var(--text-tertiary)] mb-8">
          Order #LP-{orderId} · You'll receive a confirmation email shortly.
        </p>

        <div className="rounded-xl border border-[var(--border)] p-6 mb-8 bg-[var(--bg-secondary)]">
          <div className="flex items-center gap-3 justify-center mb-4">
            <Package className="h-5 w-5 text-primary-600" />
            <span className="text-sm font-medium text-[var(--text-primary)]">Estimated Delivery</span>
          </div>
          <p className="text-lg font-bold text-[var(--text-primary)]">
            {deliveryDate}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/account/orders">
            <Button variant="primary" size="lg">Track Your Order</Button>
          </Link>
          <Link to="/shop">
            <Button variant="outline" size="lg">Continue Shopping <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
