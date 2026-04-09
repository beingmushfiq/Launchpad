import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingBag, Search, User, LayoutGrid } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUIStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function BottomNavbar() {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { setSearchOpen } = useUIStore();

  const navItems = [
    { label: "Home", icon: Home, href: "/" },
    { label: "Shop", icon: LayoutGrid, href: "/shop" },
    { label: "Search", icon: Search, onClick: () => setSearchOpen(true) },
    { label: "Cart", icon: ShoppingBag, href: "/cart", badge: itemCount },
    { label: "Account", icon: User, href: "/account" },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--bg)]/90 backdrop-blur-xl border-t border-[var(--border)] px-4 py-3 pb-safe shadow-[0_-4px_16px_rgba(0,0,0,0.05)]">
      <div className="flex items-center justify-between max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = item.href ? location.pathname === item.href : false;
          const Icon = item.icon;

          const content = (
            <div className="flex flex-col items-center gap-1 group">
              <div className="relative">
                <Icon
                  className={cn(
                    "h-5 w-5 transition-transform duration-200 group-hover:scale-110",
                    isActive ? "text-primary-600" : "text-[var(--text-tertiary)]"
                  )}
                />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-primary-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-[var(--bg)]">
                    {item.badge > 9 ? "9+" : item.badge}
                  </span>
                )}
              </div>
              <span
                className={cn(
                  "text-[10px] font-medium transition-colors",
                  isActive ? "text-primary-600" : "text-[var(--text-tertiary)]"
                )}
              >
                {item.label}
              </span>
            </div>
          );

          if (item.onClick) {
            return (
              <button
                key={item.label}
                onClick={item.onClick}
                className="flex-1 py-1"
                aria-label={item.label}
              >
                {content}
              </button>
            );
          }

          return (
            <Link key={item.label} to={item.href!} className="flex-1 py-1" aria-label={item.label}>
              {content}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
