import "server-only";

import type {
  CustomerOrder,
  CustomerOrderSummary,
} from "@/features/account/types/customer-order";
import { api } from "@/lib/axios/http";

export async function getCustomerOrderSummary(): Promise<CustomerOrderSummary> {
  const response = await api.get<CustomerOrder[]>("/v1/orders", {
    params: { page: 1, limit: 5 },
  });

  return {
    orders: response.data ?? [],
    total: response.meta?.total ?? response.data?.length ?? 0,
  };
}
