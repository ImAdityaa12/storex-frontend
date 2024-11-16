"use client";

import * as React from "react";
import {
  Calculator,
  Calendar,
  CreditCard,
  Search,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Title } from "@radix-ui/react-dialog";
const commands = [
  {
    category: "Suggestions",
    items: [
      {
        icon: Calendar,
        name: "Calendar",
        shortcut: "⌘C",
        action: () => console.log("Calendar opened"),
      },
      {
        icon: Smile,
        name: "Search Emoji",
        shortcut: "⌘E",
        action: () => console.log("Emoji search opened"),
      },
      {
        icon: Calculator,
        name: "Calculator",
        shortcut: "⌘K",
        action: () => console.log("Calculator opened"),
      },
    ],
  },
  {
    category: "Settings",
    items: [
      {
        icon: User,
        name: "Profile",
        shortcut: "⌘P",
        action: () => console.log("Profile opened"),
      },
      {
        icon: CreditCard,
        name: "Billing",
        shortcut: "⌘B",
        action: () => console.log("Billing opened"),
      },
      {
        icon: Settings,
        name: "Settings",
        shortcut: "⌘S",
        action: () => console.log("Settings opened"),
      },
    ],
  },
];

export default function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <div className="w-full ml-auto">
      <Button
        onClick={() => setOpen(true)}
        className="relative max-w-[20rem] lg:min-w-[20rem] justify-start text-sm text-muted-foreground flex items-center text-white ml-auto dark:bg-gray-900 border-2 hover:bg-transparent hover:text-blue-400 border-blue-400 dark:border-gray-900 dark:hover:bg-gray-800 dark:focus:bg-gray-800 group"
      >
        Search
        <span className="w-full">
          <Search className="text-white ml-auto group-hover:text-blue-400" />
        </span>
      </Button>
      {/* <CommandDialog open={open} onOpenChange={setOpen}>
        <VisuallyHidden.Root>x</VisuallyHidden.Root>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commands.map((group) => (
            <React.Fragment key={group.category}>
              <CommandGroup heading={group.category}>
                {group.items.map((item) => (
                  <CommandItem
                    key={item.name}
                    onSelect={() => {
                      setOpen(false);
                      item.action();
                    }}
                  >
                    <item.icon className="mr-2 h-4 w-4" />
                    <span>{item.name}</span>
                    {item.shortcut && (
                      <CommandShortcut>{item.shortcut}</CommandShortcut>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandSeparator />
            </React.Fragment>
          ))}
        </CommandList>
      </CommandDialog> */}
      <CommandDialog open={open} onOpenChange={setOpen}>
        <Title className="hidden">hello</Title>
        <Command className="rounded-lg border shadow-md md:min-w-[450px] duration-500">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {commands.map((group) => (
              <React.Fragment key={group.category}>
                <CommandGroup heading={group.category}>
                  {group.items.map((item) => (
                    <CommandItem
                      key={item.name}
                      onSelect={() => {
                        setOpen(false);
                        item.action();
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      <span>{item.name}</span>
                      {item.shortcut && (
                        <CommandShortcut>{item.shortcut}</CommandShortcut>
                      )}
                    </CommandItem>
                  ))}
                </CommandGroup>
                <CommandSeparator />
              </React.Fragment>
            ))}
          </CommandList>
        </Command>
      </CommandDialog>
    </div>
  );
}
