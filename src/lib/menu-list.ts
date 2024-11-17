import {
  Tag,
  Users,
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
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
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
          href: "/users",
          label: "Users",
          icon: Users,
        },
        {
          href: "/account",
          label: "Account",
          icon: Settings,
        },
      ],
    },
  ];
}
