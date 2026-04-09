<div align="center">

# 🚀 Launchpad
### Premium eCommerce System for Modern Startups

<img src="public/logo.png" width="128" height="128" alt="Launchpad Logo" style="border-radius: 24px; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);" />

**Production-grade · Highly Accessible · Pixel-Perfect · Performance-First**

Launchpad is a high-performance eCommerce frontend built with **React 18**, **Vite**, and **Tailwind CSS v4**. It delivers a premium shopping experience with smooth animations, dynamic states, and comprehensive responsiveness.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2F%5Byour-github-username%5D%2Flaunchpad-ecommerce)

---

[**Live Demo**](#) • [**Documentation**](#-tech-stack) • [**Report Bug**](#)

</div>

## 💎 Design Philosophy & UX
This project was built with a **User-First** approach, ensuring that every interaction feels premium and intentional.
- **8px Grid System**: Balanced spacing across all components for a professional look.
- **Micro-Animations**: Enhanced engagement via **Framer Motion** transitions.
- **Glassmorphism**: Elegant translucent UI elements for a modern aesthetic.
- **Command Palette**: Rapid site navigation using `Cmd+K` or `Ctrl+K`.

## 🇧🇩 Bangladeshi Market Localization
Fully optimized for the local market with specialized features:
- **Currency**: Automated BDT (৳) formatting via `formatPrice` utility.
- **Pricing**: Realistic BDT price points (Market-accurate for tech & fashion).
- **Shipping**: Localized tiers (৳100 flat, ৳5,000 threshold for free delivery).
- **Context**: Address forms pre-filled with local districts like Dhaka, Chittagong.

## 📱 Mobile-First Excellence
We prioritize the mobile experience with a dedicated **Bottom Navigation Bar** for high thumb-reachability:
- Quick access to **Home**, **Shop**, **Search**, **Cart**, and **Account**.
- Persistent notification badges for the cart and wishlist.
- Safe-area awareness ensuring UI doesn't overlap with system bars.

## 🛠️ Tech Stack
| Category | Technology |
| :--- | :--- |
| **Frontend** | [React 18](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/) |
| **Bundler** | [Vite 8](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first) |
| **State Management** | [Zustand](https://zustand-demo.pmnd.rs/) |
| **Routing** | [React Router v7](https://reactrouter.com/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) |

## 🚦 Getting Started

### Local Setup
1. **Clone & Install**:
   ```bash
   git clone https://github.com/your-username/launchpad-ecommerce.git
   cd launchpad-ecommerce
   npm install
   ```
2. **Start Development**:
   ```bash
   npm run dev
   ```

### ☁️ Vercel Deployment Guide
To deploy Launchpad to **Vercel** with optimized configurations:

1. **GitHub Import**: Push your code to a GitHub repository.
2. **Import Project**: Go to [Vercel Dashboard](https://vercel.com/new) and import the repo.
3. **Environment Settings**: 
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**: Click **Deploy** and you're live!

> [!IMPORTANT]
> This project includes a `vercel.json` file that handles SPA (Single Page Application) routing. This ensures that sub-pages like `/shop` or `/cart` work perfectly when refreshed or accessed directly.

## 🗺️ Roadmap
- [ ] **Phase 5**: Real API integration (Laravel/FastAPI).
- [ ] **Phase 6**: PWA support (Offline mode).
- [ ] **Phase 7**: Analytics & Event tracking.

---

<div align="center">
  <p>Created by <b>Antigravity</b> for the next generation of eCommerce.</p>
  <p>MIT License © 2026</p>
</div>
