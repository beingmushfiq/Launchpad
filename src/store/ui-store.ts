import { create } from "zustand";

interface UIState {
  cartOpen: boolean;
  searchOpen: boolean;
  mobileNavOpen: boolean;
  theme: "light" | "dark";
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: "light" | "dark") => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  cartOpen: false,
  searchOpen: false,
  mobileNavOpen: false,
  theme: (typeof window !== "undefined" && (localStorage.getItem("launchpad-theme") as "light" | "dark")) || "light",

  setCartOpen: (open) => set({ cartOpen: open }),
  setSearchOpen: (open) => set({ searchOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),

  toggleTheme: () => {
    const newTheme = get().theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("launchpad-theme", newTheme);
    set({ theme: newTheme });
  },

  setTheme: (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("launchpad-theme", theme);
    set({ theme });
  },
}));
