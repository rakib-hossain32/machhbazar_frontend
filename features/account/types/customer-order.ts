export type CustomerOrderStatus =
  | "pending_payment"
  | "placed"
  | "in_progress"
  | "partially_completed"
  | "completed"
  | "cancelled"
  | "refund_in_progress"
  | "refunded";

export type CustomerOrder = {
  _id: string;
  createdAt: string;
  currency: "BDT";
  orderNo: string;
  paymentStatus: string;
  placedAt?: string;
  status: CustomerOrderStatus;
  totalEstimatedPaisa: number;
  totalFinalPaisa?: number;
};

export type CustomerOrderSummary = {
  orders: CustomerOrder[];
  total: number;
};

