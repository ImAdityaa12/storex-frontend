import { create } from "zustand";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";

interface CartItem {
  productId: string;
  title: string;
  price: number;
  image: string;
  salePrice: number;
  quantity: number;
  originalPrice: number;
}

interface CartStore {
  // State
  cartId: string;
  cartItems: CartItem[];
  setCartItems: (cartItems: CartItem[]) => void;
  isLoading: boolean;
  error: string | null;
  total: number;
  // Actions
  getCartItems: () => Promise<void>;
  updateQuantity: (productId: string, quantity: string) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
}

const useCartStore = create<CartStore>((set, get) => ({
  // Initial state
  cartItems: [],
  isLoading: false,
  error: null,
  cartId: "",
  total: 0,
  // Setters
  setCartItems: (cartItems) => set({ cartItems }),
  // Actions
  getCartItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch cart items");
      }

      const data = await response.json();
      set({
        cartId: data._id,
        cartItems: data.items,
        isLoading: false,
        total: data.total,
      });
    } catch (error) {
      console.error(error);
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  updateQuantity: async (productId: string, quantity: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart/updateCartItemQuantity`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ productId, quantity }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update quantity");
      }

      await get().getCartItems();
      toast.success("Item quantity updated");
    } catch (error) {
      console.error(error);
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },

  removeItem: async (productId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}user/cart/deleteCartItem`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getCookie("token")}`,
          },
          body: JSON.stringify({ productId }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item");
      }

      await get().getCartItems();
      toast.error("Item removed from cart");
    } catch (error) {
      console.error(error);
      set({
        error: error instanceof Error ? error.message : "An error occurred",
        isLoading: false,
      });
    }
  },
}));

export default useCartStore;
