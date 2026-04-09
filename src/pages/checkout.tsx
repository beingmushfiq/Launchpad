import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, CreditCard, MapPin, Truck, ChevronRight, Lock, ShieldCheck } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatPrice, cn } from "@/lib/utils";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "Shipping", icon: MapPin },
  { id: 2, label: "Delivery", icon: Truck },
  { id: 3, label: "Payment", icon: CreditCard },
  { id: 4, label: "Review", icon: Check },
];

const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 100, days: "5-7 business days", icon: "📦" },
  { id: "express", name: "Express Shipping", price: 200, days: "2-3 business days", icon: "🚀" },
  { id: "overnight", name: "Overnight Shipping", price: 500, days: "Next business day", icon: "⚡" },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const shippingCost = shippingMethods.find((m) => m.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-[var(--text-secondary)] mb-6">Add some items before checking out.</p>
        <Link to="/shop"><Button variant="primary">Shop Now</Button></Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    clearCart();
    setLoading(false);
    toast.success("Order placed successfully!");
    navigate("/checkout/success");
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      {/* Stepper */}
      <div className="flex items-center justify-center mb-10">
        {steps.map((step, i) => (
          <div key={step.id} className="flex items-center">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentStep === step.id ? "bg-primary-600 text-white" :
              currentStep > step.id ? "bg-success/10 text-success" :
              "bg-[var(--bg-secondary)] text-[var(--text-tertiary)]"
            )}>
              {currentStep > step.id ? <Check className="h-4 w-4" /> : <step.icon className="h-4 w-4" />}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {i < steps.length - 1 && (
              <div className={cn("w-8 sm:w-16 h-0.5 mx-1", currentStep > step.id ? "bg-success" : "bg-[var(--border)]")} />
            )}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Form Area */}
        <div className="lg:col-span-3">
          <motion.div key={currentStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Shipping Address</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Input label="First Name" placeholder="Abir" required />
                  <Input label="Last Name" placeholder="Hossain" required />
                </div>
                <Input label="Email" type="email" placeholder="abir@example.com" required />
                <Input label="Phone" type="tel" placeholder="+880 1700-000000" />
                <Input label="Street Address" placeholder="House 12, Road 5, Dhanmondi" required />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" placeholder="Dhaka" required />
                  <Input label="State" placeholder="Dhaka" required />
                  <Input label="ZIP Code" placeholder="1209" required />
                </div>
                <Button variant="primary" size="lg" fullWidth onClick={() => setCurrentStep(2)}>
                  Continue to Delivery <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Delivery Method</h2>
                <div className="space-y-3">
                  {shippingMethods.map((method) => (
                    <label
                      key={method.id}
                      className={cn(
                        "flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all",
                        selectedShipping === method.id
                          ? "border-primary-600 bg-primary-50/50 dark:bg-primary-900/10"
                          : "border-[var(--border)] hover:border-[var(--border-hover)]"
                      )}
                    >
                      <input type="radio" name="shipping" value={method.id} checked={selectedShipping === method.id} onChange={(e) => setSelectedShipping(e.target.value)} className="sr-only" />
                      <span className="text-2xl">{method.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{method.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">{method.days}</p>
                      </div>
                      <span className="text-sm font-bold text-[var(--text-primary)]">{formatPrice(method.price)}</span>
                      {selectedShipping === method.id && <Check className="h-5 w-5 text-primary-600" />}
                    </label>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setCurrentStep(1)}>Back</Button>
                  <Button variant="primary" size="lg" fullWidth onClick={() => setCurrentStep(3)}>Continue to Payment <ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Payment Information</h2>
                <div className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-secondary)]">
                  <div className="flex items-center gap-2 mb-4">
                    <CreditCard className="h-5 w-5 text-primary-600" />
                    <span className="text-sm font-medium">Credit / Debit Card</span>
                  </div>
                  <div className="space-y-4">
                    <Input label="Card Number" placeholder="4242 4242 4242 4242" />
                    <div className="grid grid-cols-2 gap-4">
                      <Input label="Expiry Date" placeholder="MM/YY" />
                      <Input label="CVC" placeholder="123" />
                    </div>
                    <Input label="Cardholder Name" placeholder="Abir Hossain" />
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                  <Lock className="h-3.5 w-3.5" />
                  Your payment information is encrypted and secure
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setCurrentStep(2)}>Back</Button>
                  <Button variant="primary" size="lg" fullWidth onClick={() => setCurrentStep(4)}>Review Order <ChevronRight className="h-4 w-4" /></Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-[var(--text-primary)]">Review Your Order</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 p-3 rounded-xl border border-[var(--border)]">
                      <img src={item.product.images[0]} alt="" className="w-14 h-14 rounded-lg object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{item.product.name}</p>
                        <p className="text-xs text-[var(--text-secondary)]">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold">{formatPrice(item.totalPrice)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <Button variant="ghost" onClick={() => setCurrentStep(3)}>Back</Button>
                  <Button variant="primary" size="lg" fullWidth loading={loading} onClick={handlePlaceOrder}>
                    <ShieldCheck className="h-4 w-4" /> Place Order · {formatPrice(total)}
                  </Button>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-2">
          <div className="sticky top-24 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 space-y-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
            <div className="space-y-2 text-sm max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img src={item.product.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                  <div className="flex-1 min-w-0"><p className="text-sm truncate">{item.product.name}</p><p className="text-xs text-[var(--text-tertiary)]">×{item.quantity}</p></div>
                  <span className="text-sm font-medium">{formatPrice(item.totalPrice)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-[var(--border)] pt-3 space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Subtotal</span><span>{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Shipping</span><span>{formatPrice(shippingCost)}</span></div>
              <div className="flex justify-between"><span className="text-[var(--text-secondary)]">Tax</span><span>{formatPrice(tax)}</span></div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-[var(--border)]"><span>Total</span><span>{formatPrice(total)}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
