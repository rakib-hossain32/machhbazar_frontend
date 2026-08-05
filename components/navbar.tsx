"use client";

import { ModeToggle } from "@/components/mode-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import UserProfile from "@/features/auth/components/user-profile-menu";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Fish,
  Heart,
  House,
  Info,
  LogIn,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Today’s Catch", href: "/shop?sort=newest", activePath: "/shop" },
  { name: "Recipes", href: "/recipes" },
  { name: "About", href: "/about" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { data: user, isLoading } = useMeQuery();
  const [scrollDirection, setScrollDirection] = useState<
    "idle" | "up" | "down"
  >("idle");
  const isCustomer = user?.role === "CUSTOMER";
  const isTopHidden = scrollDirection === "down";
  const isBottomHidden = scrollDirection === "up";
  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
  const mobileNavIcons = [House, Fish, BookOpen, Info] as const;
  const mobileNavLinks = [
    ...navLinks.map((link, index) => ({
      ...link,
      mobileLabel: index === 1 ? "Catch" : link.name,
      icon: mobileNavIcons[index],
    })),
    {
      name: "Wishlist",
      mobileLabel: "Wishlist",
      href: "/account/wishlist",
      icon: Heart,
    },
    {
      name: "Cart",
      mobileLabel: "Cart",
      href: "/cart",
      icon: ShoppingBag,
    },
    ...(isCustomer
      ? [
          {
            name: "Profile",
            mobileLabel: "Profile",
            href: "/my-profile",
            icon: null,
          },
        ]
      : []),
  ];

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateScrollDirection = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 8) {
        setScrollDirection("idle");
        lastScrollY = currentScrollY;
      } else if (currentScrollY > lastScrollY + 4) {
        setScrollDirection("down");
        lastScrollY = currentScrollY;
      } else if (currentScrollY < lastScrollY - 4) {
        setScrollDirection("up");
        lastScrollY = currentScrollY;
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b border-market-ink/15 bg-market-bg text-market-ink transition-[color,transform] duration-300 ease-out motion-reduce:transition-none",
          isTopHidden
            ? "pointer-events-none"
            : "",
        )}
        style={{ transform: isTopHidden ? "translateY(-100%)" : "translateY(0)" }}
        aria-hidden={isTopHidden}
        inert={isTopHidden}
      >
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
            {!user && !isLoading ? (
              <Button
                render={<Link href="/login" />}
                nativeButton={false}
                className="h-9 rounded-lg bg-market-rail px-3 text-market-rail-ink shadow-sm hover:bg-market-rail/90"
                aria-label="Login"
              >
                <LogIn data-icon="inline-start" aria-hidden="true" />
                Login
              </Button>
            ) : null}
            <ModeToggle />
          </div>
        </nav>
      </div>
      </header>

      <div
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 px-3 transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none sm:px-6 lg:hidden",
          isBottomHidden
            ? "pointer-events-none opacity-0"
            : "opacity-100",
        )}
        style={{
          paddingBottom: "max(0.5rem, env(safe-area-inset-bottom))",
          transform: isBottomHidden ? "translateY(100%)" : "translateY(0)",
        }}
        aria-hidden={isBottomHidden}
        inert={isBottomHidden}
      >
        <nav
          className="mx-auto max-w-2xl overflow-hidden rounded-lg border border-market-ink/20 bg-market-bg/92 text-market-ink shadow-[0_16px_50px_rgb(7_50_44_/_0.22),0_2px_8px_rgb(7_50_44_/_0.12)] ring-1 ring-white/35 backdrop-blur-xl supports-[backdrop-filter]:bg-market-bg/86"
          aria-label="Mobile navigation"
        >
          <div
            className={cn(
              "grid h-14 gap-0.5 p-1",
              isCustomer ? "grid-cols-7" : "grid-cols-6",
            )}
          >
            {mobileNavLinks.map((link) => {
              const Icon = link.icon;
              const isProfileLink = link.name === "Profile";
              const activePath =
                "activePath" in link && link.activePath
                  ? link.activePath
                  : link.href;
              const active = isActive(activePath);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  aria-label={link.name}
                  className={cn(
                    "relative flex min-w-0 flex-col items-center justify-center rounded-md px-0.5 text-[8px] font-bold transition-[color,background-color,transform,box-shadow] duration-200 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-market-accent motion-safe:active:translate-y-px",
                    active
                      ? "bg-market-rail text-market-rail-ink shadow-[0_4px_12px_rgb(7_50_44_/_0.18)]"
                      : "text-market-ink/55 hover:bg-market-ink/7 hover:text-market-ink",
                  )}
                >
                  {isProfileLink ? (
                    <Avatar className="size-6 border border-market-accent/45">
                      <AvatarImage
                        src={user?.image || ""}
                        alt={user?.name || "User profile"}
                        referrerPolicy="no-referrer"
                      />
                      <AvatarFallback className="bg-market-accent text-[8px] font-bold text-market-accent-ink">
                        {user?.name
                          ?.split(" ")
                          .map((part) => part[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  ) : Icon ? (
                    <span
                      className={cn(
                        "flex size-6 shrink-0 items-center justify-center rounded-md transition-colors",
                        active && "text-market-accent",
                      )}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                  ) : null}
                  <span className="max-w-full truncate leading-none">
                    {link.mobileLabel}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </>
  );
}
