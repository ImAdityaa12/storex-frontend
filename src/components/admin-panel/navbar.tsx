import { ModeToggle } from "@/components/mode-toggle";
import { UserNav } from "@/components/admin-panel/user-nav";
import { SheetMenu } from "@/components/admin-panel/sheet-menu";
import CommandSearch from "../command-search";
import Cart from "../shopping-cart";

interface NavbarProps {
  title: string;
}

export function Navbar({ title }: NavbarProps) {
  return (
    <header className="sticky top-0 z-10 w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:shadow-secondary">
      <div className="mx-4 sm:mx-8 flex h-14 items-center gap-5">
        <div className="flex items-center space-x-4 lg:space-x-0">
          <SheetMenu />
          <h1 className="font-bold leading-tight md:whitespace-nowrap">
            {title}
          </h1>
        </div>
        <div className="w-full max-sm:w-fit h-full flex items-center gap-2 ml-auto">
          <CommandSearch />
          <ModeToggle />
          <Cart />
          <UserNav />
        </div>
      </div>
    </header>
  );
}
