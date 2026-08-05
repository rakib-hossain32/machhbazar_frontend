import { AccountLogoutButton } from "@/features/auth/components/account-logout-button";
import ProfileForm from "@/features/auth/components/profile-form";
import { CustomerAccountShortcuts } from "@/components/account/customer-account-shortcuts";
import type { IUserResponse } from "@/features/auth/types/auth.type";
import type {
  CustomerOrder,
  CustomerOrderStatus,
  CustomerOrderSummary,
} from "@/features/account/types/customer-order";
import {
  MarketPageHeader,
  MarketSection,
  SectionTitle,
} from "@/components/marketplace/page-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Separator } from "@/components/ui/separator";
import {
  BadgeCheck,
  Clock3,
  MapPin,
  PackageSearch,
  ShoppingBag,
} from "lucide-react";
import Link from "next/link";

type CustomerAccountPageProps = {
  orderSummary: CustomerOrderSummary;
  ordersAvailable: boolean;
  user: IUserResponse;
};

const orderStatusLabels: Record<CustomerOrderStatus, string> = {
  pending_payment: "Payment pending",
  placed: "Placed",
  in_progress: "In progress",
  partially_completed: "Partially completed",
  completed: "Completed",
  cancelled: "Cancelled",
  refund_in_progress: "Refund in progress",
  refunded: "Refunded",
};

function formatOrderDate(order: CustomerOrder) {
  const value = order.placedAt ?? order.createdAt;
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return "Date unavailable";

  return new Intl.DateTimeFormat("en-BD", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

function formatOrderTotal(order: CustomerOrder) {
  const amount = order.totalFinalPaisa ?? order.totalEstimatedPaisa;

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: order.currency || "BDT",
    maximumFractionDigits: 0,
  }).format(amount / 100);
}

function getStatusVariant(status: CustomerOrderStatus) {
  if (status === "completed") return "default" as const;
  if (["cancelled", "refunded"].includes(status)) return "outline" as const;
  return "secondary" as const;
}

export function CustomerAccountPage({
  orderSummary,
  ordersAvailable,
  user,
}: CustomerAccountPageProps) {
  const firstName = user.name?.trim().split(/\s+/)[0] || "there";
  const initials = user.name
    ? user.name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "MB";
  const latestOrder = orderSummary.orders[0];
  const memberSince = user.createdAt
    ? new Intl.DateTimeFormat("en-BD", {
        month: "short",
        year: "numeric",
      }).format(new Date(user.createdAt))
    : "Recently";

  return (
    <>
      <MarketPageHeader
        eyebrow="Customer account"
        title={`Hello, ${firstName}`}
        description="Track orders, review your account activity, and update your delivery profile without leaving the marketplace."
        breadcrumbs={[{ label: "My profile" }]}
        action={
          <Badge variant="secondary">
            <BadgeCheck data-icon="inline-start" />
            {user.emailVerified ? "Verified account" : "Verification pending"}
          </Badge>
        }
      />

      <MarketSection className="py-8 sm:py-10 lg:py-12">
        <CustomerAccountShortcuts />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_19rem]">
          <main className="flex min-w-0 flex-col gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Account at a glance</CardTitle>
                <CardDescription>
                  The information you need most often.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-muted p-4">
                  <ShoppingBag className="size-4 text-primary" aria-hidden="true" />
                  <p className="mt-4 font-heading text-3xl font-semibold">
                    {ordersAvailable ? orderSummary.total : "—"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Total orders
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <Clock3 className="size-4 text-primary" aria-hidden="true" />
                  <p className="mt-4 truncate text-sm font-semibold">
                    {latestOrder
                      ? orderStatusLabels[latestOrder.status]
                      : "No order yet"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Latest order status
                  </p>
                </div>
                <div className="rounded-xl bg-muted p-4">
                  <BadgeCheck className="size-4 text-primary" aria-hidden="true" />
                  <p className="mt-4 text-sm font-semibold">
                    {user.emailVerified ? "Verified" : "Pending"}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Email verification
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card id="orders" className="scroll-mt-24">
              <CardHeader>
                <CardTitle>Recent orders</CardTitle>
                <CardDescription>
                  {ordersAvailable
                    ? `Showing the latest ${orderSummary.orders.length} of ${orderSummary.total} orders.`
                    : "Order history is temporarily unavailable."}
                </CardDescription>
                <CardAction>
                  <Button
                    render={<Link href="/order/tracking" />}
                    nativeButton={false}
                    variant="outline"
                    size="sm"
                  >
                    <PackageSearch data-icon="inline-start" />
                    Track
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent className="px-0">
                {ordersAvailable && orderSummary.orders.length ? (
                  <div className="flex flex-col">
                    {orderSummary.orders.map((order, index) => (
                      <div key={order._id}>
                        {index ? <Separator /> : null}
                        <article className="grid gap-3 px-4 py-4 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center">
                          <div className="min-w-0">
                            <p className="truncate font-mono text-xs font-bold">
                              {order.orderNo}
                            </p>
                            <p className="mt-1 text-[10px] text-muted-foreground">
                              {formatOrderDate(order)} · {formatOrderTotal(order)}
                            </p>
                          </div>
                          <Badge variant={getStatusVariant(order.status)}>
                            {orderStatusLabels[order.status]}
                          </Badge>
                          <Button
                            render={
                              <Link
                                href={`/order/tracking?orderNo=${encodeURIComponent(order.orderNo)}`}
                              />
                            }
                            nativeButton={false}
                            variant="ghost"
                            size="sm"
                            className="justify-self-start sm:justify-self-auto"
                          >
                            Track order
                          </Button>
                        </article>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Empty className="min-h-56">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <ShoppingBag />
                      </EmptyMedia>
                      <EmptyTitle>
                        {ordersAvailable
                          ? "Your first order starts here"
                          : "Order history is unavailable"}
                      </EmptyTitle>
                      <EmptyDescription>
                        {ordersAvailable
                          ? "Browse verified catches and place an order when you are ready."
                          : "Please try again shortly. Your existing orders are safe."}
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button
                        render={<Link href="/shop" />}
                        nativeButton={false}
                      >
                        Browse fresh catch
                      </Button>
                    </EmptyContent>
                  </Empty>
                )}
              </CardContent>
            </Card>
          </main>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card>
              <CardHeader className="items-center text-center">
                <Avatar className="size-16">
                  <AvatarImage
                    src={user.image || ""}
                    alt={user.name || "Customer profile"}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback className="text-lg font-semibold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="mt-2">{user.name}</CardTitle>
                <CardDescription className="max-w-full truncate">
                  {user.email}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="flex flex-col gap-3 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Account</dt>
                    <dd className="font-semibold">Customer</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="text-muted-foreground">Member since</dt>
                    <dd className="font-semibold">{memberSince}</dd>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <dt className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="size-3" aria-hidden="true" />
                      Delivery
                    </dt>
                    <dd className="font-semibold">Profile managed</dd>
                  </div>
                </dl>
              </CardContent>
              <CardFooter className="justify-end">
                <AccountLogoutButton />
              </CardFooter>
            </Card>
          </aside>
        </div>

        <section id="profile-settings" className="scroll-mt-24 pt-12">
          <SectionTitle
            eyebrow="Profile settings"
            title="Keep your details current"
            description="Update your profile photo, display name, and account password."
          />
          <div className="mt-7 max-w-4xl">
            <ProfileForm user={user} />
          </div>
        </section>
      </MarketSection>
    </>
  );
}
