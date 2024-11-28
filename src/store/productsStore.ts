import { Option } from "@/components/ui/multiple-selector";
import { getCookie } from "@/lib/utils";
import { product } from "@/product";
import { toast } from "sonner";
import { create } from "zustand";

interface ProductState {
  products: {
    product: product;
    isLiked: boolean;
  }[];
  setProducts: (products: { product: product; isLiked: boolean }[]) => void;
  toggleLike: (productId: string) => void;
  getProducts: () => void;
  getTags: () => void;
  modelOptions: Option[];
  setModelOptions: (options: Option[]) => void;
  categoryOption: Option[];
  setCategoryOption: (options: Option[]) => void;
  brands: string[];
  setBrands: (options: string[]) => void;
}

const useProductStore = create<ProductState>((set) => ({
  products: [],
  modelOptions: [],
  categoryOption: [],
  brands: [],
  setModelOptions: (options) => set({ modelOptions: options }),
  setCategoryOption: (options) => set({ categoryOption: options }),
  setBrands: (options) => set({ brands: options }),
  getTags: async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}admin/products/productTags`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      const data = await res.json();
      set(() => ({
        categoryOption: data.categories.map((category: string) => ({
          label: category,
          value: category,
        })),
      }));
      set(() => ({
        modelOptions: data.models.map((model: string) => ({
          label: model,
          value: model,
        })),
      }));
      set({ brands: data.brands });
    } catch (error) {
      console.log(error);
    }
  },
  setProducts: (products) => set({ products }),
  toggleLike: (productId) =>
    set((state) => ({
      products: state.products.map((item) =>
        item.product._id === productId
          ? { ...item, isLiked: !item.isLiked }
          : item
      ),
    })),
  getProducts: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}products/shop`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      set({ products: data });
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Failed to fetch products: ${error.message}`);
      }
    }
  },
}));
export default useProductStore;
