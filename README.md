# 🍕 Balanced Bites

**Balanced Bites** is a modern, responsive food delivery web application built with React and Vite. It allows users to browse restaurants, explore food categories, add items to cart, apply coupons, and track orders — all with a smooth, animated user experience.

## ✨ Features

- **Home Page** — Hero section, category explorer, and popular foods
- **Restaurants** — Browse restaurant listings with details
- **Categories** — Filter foods by All, Burgers, Pizza, Indian, Chinese, Desserts, Beverages, Healthy
- **Cart & Checkout** — Full cart management, coupon offers, and order summary
- **Order Confirmation** — Success page after placing an order
- **Track Order** — Real-time order tracking UI
- **Search** — Global food/restaurant search from the navbar
- **Responsive Design** — Mobile-first layout with collapsible navigation and optimized grid systems.

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| React 19 | UI framework |
| Vite | Build tool & dev server |
| React Router v6 | Client-side routing |
| Framer Motion | Animations & transitions |
| CSS Modules | Scoped component styling |
| Oxlint | Linting & code quality |

## 📁 Project Structure

```
src/
  components/
    layout/        Navbar, Footer, Layout, CartSidebar, Hero
    sections/      Categories, PopularFoods
    ui/            Button, Badge, CouponCard, FoodCard, SearchBar, etc.
    utils/         ScrollToTop
  constants/       Categories, images, navLinks
  context/         CartContext, FoodFilterContext
  data/            Coupons, foods, restaurants
  pages/           Home, Restaurants, Categories, Checkout, TrackOrder, etc.
  routes.jsx       Route definitions
  App.jsx          Root provider tree
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Lint
npx oxlint
```

## 📦 Key Packages

- `react-icons/fi` — Navigation and action icons
- `framer-motion` — Page transitions and micro-interactions
- `react-router-dom` — SPA routing

## 📄 License

This project is private and intended for demonstration purposes only.
