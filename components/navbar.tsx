"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import UserProfile from "@/features/auth/components/user-profile-menu";
import { Fish, Heart, Menu, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Today’s Catch", href: "/shop?sort=newest", activePath: "/shop" },
  { name: "Recipes", href: "/recipes" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0  z-50 w-full border-b border-market-ink/15 bg-market-bg text-market-ink transition-colors duration-500">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10 xl:px-0">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="Machh Bazar home"
        >
          <span className="flex size-9 items-center justify-center bg-market-rail text-market-rail-ink transition-all group-hover:-rotate-3">
            <Fish className="size-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-2xl leading-none font-semibold tracking-[-0.02em]">
            Machh Bazar
          </span>
        </Link>

        <nav className="flex items-center" aria-label="Main navigation">
          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 text-sm font-medium transition-colors after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:bg-market-accent after:transition-transform ${
                  isActive(link.activePath ?? link.href)
                    ? "text-market-ink after:scale-x-100"
                    : "text-market-ink/55 after:scale-x-0 hover:text-market-ink after:hover:scale-x-100"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="ml-8 hidden items-center gap-1 border-l border-market-ink/15 pl-6 lg:flex">
            <UserProfile showSignInLabel />
            <ModeToggle />
            <Button
              render={<Link href="/account/wishlist" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              className="rounded-none text-current hover:bg-market-ink/8"
              aria-label="Wishlist"
              title="Wishlist"
            >
              <Heart className="size-4" aria-hidden="true" />
            </Button>
            <Button
              render={<Link href="/cart" />}
              nativeButton={false}
              variant="ghost"
              size="icon"
              className="rounded-none text-current hover:bg-market-ink/8"
              aria-label="Cart"
              title="Cart"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
            </Button>
            <Button
              render={<Link href="/shop" />}
              nativeButton={false}
              className="ml-2 h-10 rounded-none bg-market-rail px-4 text-market-rail-ink hover:opacity-88"
            >
              <ShoppingBag className="size-4" aria-hidden="true" />
              Shop now
            </Button>
          </div>

          <div className="flex items-center gap-1 lg:hidden">
            <UserProfile showSignInLabel />
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" aria-label="Open menu" />
                }
              >
                <Menu className="size-5" aria-hidden="true" />
              </SheetTrigger>

              <SheetContent side="right" showCloseButton className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle className="flex items-center gap-2 font-heading text-2xl">
                    <Fish className="size-5 text-market-accent" /> Machh Bazar
                  </SheetTitle>
                  <SheetDescription>Navigate the marketplace</SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-1 px-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`border-b px-1 py-3 text-sm font-semibold transition-colors hover:text-primary ${
                        isActive(link.activePath ?? link.href)
                          ? "text-primary"
                          : "text-foreground"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <Link
                      href="/account/wishlist"
                      className="inline-flex h-11 items-center justify-center gap-2 border border-border px-3 text-sm font-semibold text-foreground"
                    >
                      <Heart className="size-4" aria-hidden="true" /> Wishlist
                    </Link>
                    <Link
                      href="/cart"
                      className="inline-flex h-11 items-center justify-center gap-2 border border-border px-3 text-sm font-semibold text-foreground"
                    >
                      <ShoppingBag className="size-4" aria-hidden="true" /> Cart
                    </Link>
                  </div>
                  <Link
                    href="/shop"
                    className="mt-5 inline-flex h-11 items-center justify-center gap-2 bg-market-accent px-4 text-sm font-bold text-market-accent-ink"
                  >
                    <ShoppingBag className="size-4" /> Shop now
                  </Link>
                  <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
                    Change theme
                    <ModeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
