import userDetailsStore from "@/store/userDetail";
import {
  Tag,
  Settings,
  Bookmark,
  LayoutGrid,
  LucideIcon,
  Crown,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

//@eslint-disable-next-line
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function getMenuList(pathname: string): Group[] {
  const { userDetails } = userDetailsStore();
  return userDetails.role === "admin"
    ? [
        {
          groupLabel: "",
          menus: [
            {
              href: "/shop",
              label: "Shop",
              icon: LayoutGrid,
              submenus: [],
            },
          ],
        },
        {
          groupLabel: "Contents",
          menus: [
            {
              href: "",
              label: "Admin",
              icon: Crown,
              submenus: [
                {
                  href: "/add-product",
                  label: "Add Product",
                },
                {
                  href: "/manage-product",
                  label: "Manage Product",
                },
                {
                  href: "/orders",
                  label: "Orders",
                },
                {
                  href: "/users",
                  label: "Users",
                },
              ],
            },
            {
              href: "/categories",
              label: "Categories",
              icon: Bookmark,
            },
            {
              href: "/favorites",
              label: "Saved",
              icon: Tag,
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/account",
              label: "Account",
              icon: Settings,
            },
          ],
        },
      ]
    : [
        {
          groupLabel: "",
          menus: [
            {
              href: "/shop",
              label: "Shop",
              icon: LayoutGrid,
              submenus: [],
            },
            {
              href: "/categories",
              label: "Categories",
              icon: Bookmark,
            },
            {
              href: "/favorites",
              label: "Saved",
              icon: Tag,
            },
          ],
        },
        {
          groupLabel: "Settings",
          menus: [
            {
              href: "/account",
              label: "Account",
              icon: Settings,
            },
          ],
        },
      ];
}
