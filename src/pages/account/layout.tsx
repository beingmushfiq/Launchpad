import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Package, MapPin, Heart, Settings, LogOut, ChevronRight } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { label: "Dashboard", href: "/account", icon: User, exact: true },
  { label: "My Orders", href: "/account/orders", icon: Package },
  { label: "Addresses", href: "/account/addresses", icon: MapPin },
  { label: "Wishlist", href: "/account/wishlist", icon: Heart },
  { label: "Settings", href: "/account/profile", icon: Settings },
];

export default function AccountLayout() {
  const location = useLocation();
  const { user, logout } = useAuthStore();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
        <Link to="/" className="text-[var(--text-tertiary)] hover:text-[var(--text-primary)]">Home</Link>
        <ChevronRight className="h-3.5 w-3.5 text-[var(--text-tertiary)]" />
        <span className="text-[var(--text-primary)] font-medium">Account</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            {/* User Info */}
            <div className="flex items-center gap-3 mb-6 p-4 rounded-xl bg-[var(--bg-secondary)]">
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 font-bold">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{user?.name || "Guest User"}</p>
                <p className="text-xs text-[var(--text-secondary)] truncate">{user?.email || "guest@example.com"}</p>
              </div>
            </div>

            <nav className="space-y-1" aria-label="Account navigation">
              {sidebarLinks.map((link) => {
                const isActive = link.exact
                  ? location.pathname === link.href
                  : location.pathname.startsWith(link.href);
                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary-50 text-primary-600 dark:bg-primary-900/20"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    )}
                  >
                    <link.icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-[var(--text-secondary)] hover:text-error hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors w-full"
              >
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </nav>
          </div>
        </aside>

        {/* Content */}
        <main className="flex-1 min-w-0">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
