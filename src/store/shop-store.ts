import { create } from 'zustand';
import { PRODUCTS, Product, ProductCategory } from '@/lib/mock-data';
interface ShopState {
  searchQuery: string;
  selectedCategories: ProductCategory[];
  priceRange: [number, number];
  cartItems: { productId: string; quantity: number }[];
  isFilterOpen: boolean;
  quickViewProductId: string | null;
  setSearchQuery: (query: string) => void;
  toggleCategory: (category: ProductCategory) => void;
  setPriceRange: (range: [number, number]) => void;
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  setIsFilterOpen: (isOpen: boolean) => void;
  setQuickViewProduct: (productId: string | null) => void;
  clearFilters: () => void;
}
export const useShopStore = create<ShopState>((set) => ({
  searchQuery: '',
  selectedCategories: [],
  priceRange: [0, 50],
  cartItems: [],
  isFilterOpen: false,
  quickViewProductId: null,
  setSearchQuery: (query) => set({ searchQuery: query }),
  toggleCategory: (category) => set((state) => ({
    selectedCategories: state.selectedCategories.includes(category)
      ? state.selectedCategories.filter((c) => c !== category)
      : [...state.selectedCategories, category]
  })),
  setPriceRange: (range) => set({ priceRange: range }),
  addToCart: (productId) => set((state) => {
    const existing = state.cartItems.find((item) => item.productId === productId);
    if (existing) {
      return {
        cartItems: state.cartItems.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    }
    return { cartItems: [...state.cartItems, { productId, quantity: 1 }] };
  }),
  removeFromCart: (productId) => set((state) => ({
    cartItems: state.cartItems.filter((item) => item.productId !== productId)
  })),
  setIsFilterOpen: (isOpen) => set({ isFilterOpen: isOpen }),
  setQuickViewProduct: (productId) => set({ quickViewProductId: productId }),
  clearFilters: () => set({ selectedCategories: [], searchQuery: '', priceRange: [0, 50] }),
}));
export const getFilteredProducts = (state: ShopState): Product[] => {
  return PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    const matchesCategory = state.selectedCategories.length === 0 || state.selectedCategories.includes(product.category);
    const matchesPrice = product.price >= state.priceRange[0] && product.price <= state.priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });
};