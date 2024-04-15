import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import ImportContactsOutlinedIcon from "@mui/icons-material/ImportContactsOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import StorefrontOutlinedIcon from "@mui/icons-material/StorefrontOutlined";
import ShoppingCartCheckoutOutlinedIcon from "@mui/icons-material/ShoppingCartCheckoutOutlined";
export const PublicRoutes = {
  title: "",
  subRoutes: [
    {
      icon: <Inventory2OutlinedIcon fontSize="16px" />,
      title: "Nhập hàng",
      isPublic: true,
      url: "/products",
    },
  ],
};

export const HomeRoutes = {
  title: "",
  subRoutes: [
    {
      icon: <HomeOutlinedIcon fontSize="16px" />,
      title: "Trang chủ",
      url: "/home",
    },
  ],
};

export const OrdersRoutes = {
  title: "Quản lý đơn hàng",
  subRoutes: [
    {
      icon: <LocalMallOutlinedIcon fontSize="16px" />,
      title: "Nhập hàng",
      url: "/orders",
    },
    {
      icon: <StorefrontOutlinedIcon fontSize="16px" />,
      title: "Nhận đơn",
      url: "/sales",
    },
    // {
    //   icon: <ShoppingCartCheckoutOutlinedIcon fontSize="16px" />,
    //   title: "Giỏ hàng",
    //   url: "/checkout",
    // },
  ],
};

export const AccountRoutes = {
  title: "Quản lý tài khoản",
  subRoutes: [
    {
      icon: <ManageAccountsOutlinedIcon fontSize="16px" />,
      title: "Thông tin tài khoản",
      url: "/account",
    },
    {
      icon: <VerifiedUserOutlinedIcon fontSize="16px" />,
      title: "Đổi mật khẩu",
      url: "/account/change-password",
    },
    {
      icon: <ImportContactsOutlinedIcon fontSize="16px" />,
      title: "Danh sách địa chỉ",
      url: "/account/addresses",
    },
    {
      icon: <NotificationsOutlinedIcon fontSize="16px" />,
      title: "Thông báo",
      url: "/account/notifications",
    },
    {
      icon: <ChecklistOutlinedIcon fontSize="16px" />,
      title: "Đối soát",
      url: "/account/reconciliation",
    },
  ],
};
