import { Badge } from "@/components/ui/badge";
import { Package, Eye, RotateCcw, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";


const orders = [
  {
    id: "LP-8A3F2K", date: "Apr 5, 2026", status: "delivered" as const, total: 32900,
    items: [
      { name: "Premium Wireless Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80", qty: 1, price: 32900 },
    ],
  },
  {
    id: "LP-7B1C9D", date: "Mar 28, 2026", status: "shipped" as const, total: 20500,
    items: [
      { name: "Classic Leather Watch", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=100&q=80", qty: 1, price: 20500 },
    ],
  },
  {
    id: "LP-6F4E8H", date: "Mar 15, 2026", status: "processing" as const, total: 14000,
    items: [
      { name: "Luxury Skincare Set", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&q=80", qty: 1, price: 14000 },
    ],
  },
];

const statusConfig = {
  pending: { label: "Pending", variant: "outline" as const },
  processing: { label: "Processing", variant: "warning" as const },
  shipped: { label: "Shipped", variant: "info" as const },
  delivered: { label: "Delivered", variant: "success" as const },
  cancelled: { label: "Cancelled", variant: "error" as const },
};

export default function OrdersPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">My Orders</h1>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg)]">
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-[var(--bg-secondary)] border-b border-[var(--border)]">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{order.id}</p>
                    <p className="text-xs text-[var(--text-secondary)]">{order.date}</p>
                  </div>
                  <Badge variant={statusConfig[order.status].variant}>
                    {statusConfig[order.status].label}
                  </Badge>
                </div>
                <p className="text-sm font-bold text-[var(--text-primary)]">{formatPrice(order.total)}</p>
              </div>

              {/* Items */}
              <div className="p-4 sm:p-6">
                {order.items.map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <img src={item.image} alt="" className="w-14 h-14 rounded-lg object-cover bg-[var(--bg-secondary)]" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[var(--text-primary)] truncate">{item.name}</p>
                      <p className="text-xs text-[var(--text-secondary)]">Qty: {item.qty} · {formatPrice(item.price)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 px-4 sm:px-6 py-3 border-t border-[var(--border)]">
                <Button variant="ghost" size="sm"><Eye className="h-3.5 w-3.5" /> View Details</Button>
                {order.status === "shipped" && <Button variant="ghost" size="sm"><Truck className="h-3.5 w-3.5" /> Track</Button>}
                {order.status === "delivered" && <Button variant="ghost" size="sm"><RotateCcw className="h-3.5 w-3.5" /> Reorder</Button>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <div className="w-20 h-20 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center mx-auto mb-4">
            <Package className="h-8 w-8 text-[var(--text-tertiary)]" />
          </div>
          <h3 className="text-lg font-semibold mb-1">No orders yet</h3>
          <p className="text-sm text-[var(--text-secondary)]">Your order history will appear here</p>
        </div>
      )}
    </div>
  );
}
