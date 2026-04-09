import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useEffect } from "react";

// Layout
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BottomNavbar } from "@/components/layout/bottom-navbar";
import { CartSidebar } from "@/components/features/cart/cart-sidebar";
import { SearchCommand } from "@/components/features/search/search-command";

// Pages
import HomePage from "@/pages/home";
import ShopPage from "@/pages/shop";
import ProductDetailPage from "@/pages/product-detail";
import CartPage from "@/pages/cart";
import CheckoutPage from "@/pages/checkout";
import CheckoutSuccessPage from "@/pages/checkout-success";
import LoginPage from "@/pages/auth/login";
import RegisterPage from "@/pages/auth/register";
import AccountLayout from "@/pages/account/layout";
import AccountDashboard from "@/pages/account/dashboard";
import OrdersPage from "@/pages/account/orders";
import WishlistPage from "@/pages/account/wishlist";

// Store
import { useUIStore } from "@/store/ui-store";

function ScrollToTop() {
  const { pathname } = window.location;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <BottomNavbar /> 
      <CartSidebar />
      <SearchCommand />
    </div>
  );
}

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {children}
    </div>
  );
}

export default function App() {
  // Initialize theme on mount
  useEffect(() => {
    const saved = localStorage.getItem("launchpad-theme") as "light" | "dark" | null;
    const initialTheme = saved || "light";
    document.documentElement.setAttribute("data-theme", initialTheme);
    if (!saved) {
      useUIStore.getState().setTheme(initialTheme);
    }
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "var(--bg-elevated)",
            color: "var(--text-primary)",
            border: "1px solid var(--border)",
          },
        }}
        richColors
      />
      <Routes>
        {/* Auth routes (no header/footer) */}
        <Route path="/auth/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/auth/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />

        {/* Main routes */}
        <Route path="/" element={<AppLayout><HomePage /></AppLayout>} />
        <Route path="/shop" element={<AppLayout><ShopPage /></AppLayout>} />
        <Route path="/shop/:slug" element={<AppLayout><ProductDetailPage /></AppLayout>} />
        <Route path="/cart" element={<AppLayout><CartPage /></AppLayout>} />
        <Route path="/checkout" element={<AppLayout><CheckoutPage /></AppLayout>} />
        <Route path="/checkout/success" element={<AppLayout><CheckoutSuccessPage /></AppLayout>} />

        {/* Account routes */}
        <Route path="/account" element={<AppLayout><AccountLayout /></AppLayout>}>
          <Route index element={<AccountDashboard />} />
          <Route path="orders" element={<OrdersPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={
          <AppLayout>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20 text-center">
              <h1 className="text-6xl font-bold text-[var(--text-primary)] mb-4">404</h1>
              <p className="text-lg text-[var(--text-secondary)] mb-6">Page not found</p>
              <a href="/" className="text-primary-600 font-medium hover:underline">Back to Home</a>
            </div>
          </AppLayout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
