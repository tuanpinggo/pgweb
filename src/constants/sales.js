export const SalesStatus = {
  Confirmed: "confirmed",
  Shipping: "shipping",
  Completed: "completed",
  Rejected: "rejected",
};

export const SalesStatusTranslation = {
  [SalesStatus.Confirmed]: "Chờ giao hàng",
  [SalesStatus.Shipping]: "Đang vận chuyển",
  [SalesStatus.Completed]: "Đã hoàn thành",
  [SalesStatus.Rejected]: "Đã từ chối",
};
export const SalesPerPageLimit = 20;
