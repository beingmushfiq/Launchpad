/* ============================================
   LAUNCHPAD E-COMMERCE — TYPE DEFINITIONS
   ============================================ */

// ---- Product Types ----
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  currency: string;
  images: string[];
  category: Category;
  subcategory?: string;
  variants: ProductVariant[];
  tags: string[];
  rating: number;
  reviewCount: number;
  sku: string;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  brand: string;
  specifications: Record<string, string>;
  createdAt: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  type: "color" | "size" | "material" | "storage" | "style" | "weight";
  value: string;
  colorHex?: string;
  priceModifier?: number;
  stock: number;
  sku: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image: string;
  icon?: string;
  parentId?: string;
  productCount: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpful: number;
}

// ---- Cart Types ----
export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
  totalPrice: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  couponCode?: string;
}

export interface Coupon {
  code: string;
  type: "percentage" | "fixed";
  value: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiresAt: string;
}

// ---- Order Types ----
export type OrderStatus =
  | "pending"
  | "confirmed"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: ShippingMethod;
  paymentMethod: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
  selectedVariants: Record<string, string>;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
  icon: string;
}

// ---- User Types ----
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar?: string;
  addresses: Address[];
  defaultAddressId?: string;
  createdAt: string;
}

export interface Address {
  id: string;
  label: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

// ---- API Types ----
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    perPage: number;
  };
}

export interface ApiError {
  message: string;
  code: string;
  status: number;
  errors?: Record<string, string[]>;
}

// ---- UI Types ----
export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  link: string;
  buttonText?: string;
  position: "hero" | "sidebar" | "footer" | "inline";
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  icon?: string;
}

export interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

export interface ProductFilters {
  categories: string[];
  priceRange: [number, number];
  colors: string[];
  sizes: string[];
  brands: string[];
  rating: number | null;
  sortBy: "relevance" | "price-asc" | "price-desc" | "newest" | "rating";
  search: string;
  page: number;
  perPage: number;
}

export interface HomepageSection {
  id: string;
  type: "hero" | "categories" | "featured" | "deals" | "new-arrivals" | "brands" | "testimonials" | "newsletter";
  title?: string;
  subtitle?: string;
  enabled: boolean;
  order: number;
  data?: unknown;
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  role: string;
  rating: number;
  comment: string;
}
