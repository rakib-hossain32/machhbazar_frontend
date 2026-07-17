"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function OrderLookup() {
  const router = useRouter();
  const [orderNo, setOrderNo] = useState("MB-260716-1842");
  return <form onSubmit={(event) => { event.preventDefault(); if (orderNo.trim()) router.push(`/account/orders/${encodeURIComponent(orderNo.trim())}`); }} className="mx-auto max-w-xl rounded-lg border border-border bg-surface p-5 sm:p-7"><label htmlFor="order-number" className="text-xs font-bold text-ink">Order number</label><div className="mt-3 flex gap-2"><Input id="order-number" value={orderNo} onChange={(event) => setOrderNo(event.target.value)} placeholder="MB-260716-1842" className="h-11 rounded-md font-mono" /><Button type="submit" className="h-11 shrink-0 rounded-md"><Search className="size-4" /> Track</Button></div><p className="mt-3 text-[10px] text-muted-foreground">Use the order number from your confirmation email or account order list.</p></form>;
}
