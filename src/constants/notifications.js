export const NotificationType = {
  All: {
    label: "Thông báo",
    value: null,
    tabName: "Tất cả thông báo",
  },
  Import: {
    label: "Đơn hàng nhập",
    value: 1,
    description: "Theo dõi trạng thái các đơn hàng ...",
    tabName: "Đơn hàng nhập",
  },
  Export: {
    label: "PingGO chuyển đơn",
    value: 2,
    description: "Nhận đơn hàng từ PingGO ...",
    tabName: "PingGO chuyển đơn",
  },
};

export const NOTIFICATION_PERPAGE = 20;
