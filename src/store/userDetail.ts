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
};

const userDetailsStore = create<UserStore>((set) => ({
  userDetails: {
    name: "",
    email: "",
    role: "",
    phoneNumber: "",
    userName: "",
  },
  setUserDetails: (details) => set({ userDetails: details }),
  updateUserField: (key, value) =>
    set((state) => ({
      userDetails: {
        ...state.userDetails,
        [key]: value,
      },
    })),
}));

export default userDetailsStore;
