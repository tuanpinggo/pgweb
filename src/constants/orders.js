export const OrderStatus = {
  All: null,
  Pending: "pending",
  Confirm: "confirm",
  Shipping: "shipping",
  Completed: "completed",
  Canceled: "canceled",
  ShippingFailed: "shipping_failed",
};

export const OrderStatusTranslation = {
  [OrderStatus.All]: "Tất cả",
  [OrderStatus.Pending]: "Chờ xác nhận",
  [OrderStatus.Confirm]: "Đã xác nhận",
  [OrderStatus.Shipping]: "Đang vận chuyển",
  [OrderStatus.Completed]: "Đã hoàn thành",
  [OrderStatus.Canceled]: "Đã huỷ",
  [OrderStatus.ShippingFailed]: "Hoàn lại",
};

export const OrderLogistic = {
  selfShip: {
    label: "Tôi tự đi ship cho khách",
    value: 1,
  },
  shippingUnit: {
    label: "Đơn giao cho đơn vị vận chuyển",
    value: 2,
  },
};

export const CartLogistic = {
  shippingUnit: {
    label: "Đơn giao cho đơn vị vận chuyển",
    description: "Giao hàng nhanh (GHN)",
    id: 1,
  },
  selfShip: {
    label: "Đơn giao cho xe khách",
    description: "Khách tự thanh toán phí vận chuyển",
    id: 2,
  },
};

export const UrbanShippingCode = [
  37, 32, 25, 35, 38, 52, 39, 42, 27, 48, 28, 34,
];

export const OrdersPerPageLimit = 20;
