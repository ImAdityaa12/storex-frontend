import { product } from "@/product";
import { create } from "zustand";

interface ProductState {
  products: {
    product: product;
    isLiked: boolean;
  }[];
  setProducts: (products: { product: product; isLiked: boolean }[]) => void;
  toggleLike: (productId: string) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  toggleLike: (productId) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.product._id === productId
          ? { ...item, isLiked: !item.isLiked }
          : item
      ),
    })),
}));

export default useProductStore;
