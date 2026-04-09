import { Link } from "react-router-dom";
import { Package, Heart, MapPin, TrendingUp, ArrowRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { useWishlistStore } from "@/store/wishlist-store";

export default function AccountDashboard() {
  const user = useAuthStore((s) => s.user);
  const wishlistCount = useWishlistStore((s) => s.items.length);

  const stats = [
    { label: "Total Orders", value: "12", icon: Package, href: "/account/orders", color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30" },
    { label: "Wishlist Items", value: String(wishlistCount), icon: Heart, href: "/account/wishlist", color: "bg-red-100 text-red-600 dark:bg-red-900/30" },
    { label: "Saved Addresses", value: "3", icon: MapPin, href: "/account/addresses", color: "bg-green-100 text-green-600 dark:bg-green-900/30" },
    { label: "Reward Points", value: "2,450", icon: TrendingUp, href: "/account/profile", color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30" },
  ];

  const recentOrders = [
    { id: "LP-8A3F2K", date: "Apr 5, 2026", status: "Delivered", total: "৳32,900", statusColor: "text-success" },
    { id: "LP-7B1C9D", date: "Mar 28, 2026", status: "Shipped", total: "৳20,500", statusColor: "text-blue-600" },
    { id: "LP-6F4E8H", date: "Mar 15, 2026", status: "Processing", total: "৳14,000", statusColor: "text-amber-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
          Welcome back, {user?.name?.split(" ")[0] || "there"}! 👋
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Here's an overview of your account activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            to={stat.href}
            className="rounded-xl border border-[var(--border)] p-4 hover:shadow-md transition-shadow bg-[var(--bg)]"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
              <stat.icon className="h-5 w-5" />
            </div>
            <p className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</p>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">Recent Orders</h2>
          <Link to="/account/orders" className="text-sm text-primary-600 hover:text-primary-700 flex items-center gap-1 font-medium">
            View All <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="rounded-xl border border-[var(--border)] overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-[var(--bg-secondary)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium text-[var(--text-secondary)]">Order ID</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--text-secondary)] hidden sm:table-cell">Date</th>
                <th className="text-left px-4 py-3 font-medium text-[var(--text-secondary)]">Status</th>
                <th className="text-right px-4 py-3 font-medium text-[var(--text-secondary)]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-[var(--bg-secondary)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--text-primary)]">{order.id}</td>
                  <td className="px-4 py-3 text-[var(--text-secondary)] hidden sm:table-cell">{order.date}</td>
                  <td className="px-4 py-3"><span className={`font-medium ${order.statusColor}`}>{order.status}</span></td>
                  <td className="px-4 py-3 text-right font-medium">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
