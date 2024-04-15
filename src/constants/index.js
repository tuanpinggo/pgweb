// export const API_URL =
//   process.env.NEXT_PUBLIC_API_URL ||
//   (process.env.NODE_ENV === "development"
//     ? "https://dev-api-retailer.pinggo.vn"
//     : "https://api-retailer.pinggo.vn");

export const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api-retailer.pinggo.vn";

export const LandingBrands = [
  398, 14, 80, 465, 471, 4, 434, 192, 43, 312, 514, 61, 312, 43,
];
export const PageRoutes = {
  Home: "/",
  Pingger: "/static/loi-ich-ma-pingger-nhan-duoc",
  Retailer: "/static/loi-ich-khi-tro-thanh-retailer",
};

export const Sexes = [
  {
    label: "Nam",
    id: "Male",
  },
  {
    label: "Nữ",
    id: "Female",
  },
  {
    label: "Khác",
    id: "Other",
  },
];

export const SalaryRanges = [
  {
    label: "< 10 triệu",
    id: "small",
  },
  {
    label: "10-15 triệu",
    id: "medium",
  },
  {
    label: "> 15 triệu",
    id: "large",
  },
];

export const Businesses = [
  {
    label: "Có",
    id: "yes",
  },
  {
    label: "Chưa",
    id: "no",
  },
];

export const Social = [
  {
    label: "Facebook",
    id: "facebook",
  },
  {
    label: "Instagram",
    id: "instagram",
  },
  {
    label: "Tiktok",
    id: "tiktok",
  },
  {
    label: "Khác",
    id: "other",
  },
];
