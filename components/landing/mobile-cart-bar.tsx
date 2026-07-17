import { ChevronRight, ShoppingBag } from "lucide-react";
import Link from "next/link";

export function MobileCartBar() {
  return (
    <div className="fixed right-3 bottom-3 left-3 z-40 lg:hidden">
      <Link
        href="/cart"
        className="flex h-14 items-center rounded-lg border border-market-rail-ink/12 bg-market-rail px-4 text-market-rail-ink shadow-[0_18px_50px_rgba(19,42,45,0.28)]"
      >
        <span className="flex size-9 items-center justify-center rounded-md bg-primary">
          <ShoppingBag className="size-4" aria-hidden="true" />
        </span>
        <span className="ml-3 min-w-0">
          <span className="block text-[10px] font-bold tracking-[0.08em] text-market-rail-ink/52 uppercase">Your cart</span>
          <span className="block truncate text-sm font-bold">Review saved items</span>
        </span>
        <span className="ml-auto inline-flex items-center gap-1 text-xs font-bold">View <ChevronRight className="size-4" /></span>
      </Link>
    </div>
  );
}
