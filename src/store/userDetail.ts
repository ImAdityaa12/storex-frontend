import { Address } from "@/components/profile-page";
import { getCookie } from "@/lib/utils";
import { toast } from "sonner";
import { create } from "zustand";

type UserDetails = {
  name: string;
  email: string;
  image?: string;
  role: string;
  phoneNumber: string;
  userName: string;
};

type UserStore = {
  userDetails: UserDetails;
  setUserDetails: (details: UserDetails) => void;
  updateUserField: <K extends keyof UserDetails>(
    key: K,
    value: UserDetails[K]
  ) => void;
  addresses: Address[];
  setAddresses: (addresses: Address[]) => void;
  getUserAddress: () => Promise<void>;
};

const userDetailsStore = create<UserStore>((set) => ({
  userDetails: {
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    userName: "",
  },
  addresses: [],
  setAddresses: (addresses) => set({ addresses }),
  setUserDetails: (details) => set({ userDetails: details }),
  updateUserField: (key, value) =>
    set((state) => ({
      userDetails: {
        ...state.userDetails,
        [key]: value,
      },
    })),
  getUserAddress: async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}users/address/all`,
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
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (response.status === 200) {
        set({ addresses: data });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error getting user address");
    }
  },
}));

export default userDetailsStore;
