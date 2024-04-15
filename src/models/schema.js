import * as yup from "yup";

const phoneRegExp = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/;
const emailRegExp =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g;

const loginSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không đúng định dạng VD: 0986868686")
    .required("Vui lòng nhập số điện thoại"),
  password: yup
    .string()
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự")
    .required("Mật khẩu không được bỏ trống"),
});

const checkPhoneSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại không đúng định dạng VD: 0986868686")
    .required("Vui lòng nhập số điện thoại"),
});

const registerSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  password: yup
    .string()
    .required("Mật khẩu mới không được bỏ trống")
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự"),
  password_confirmation: yup
    .string()
    .required("Xác nhận mật khẩu không được bỏ trống")
    .oneOf([yup.ref("password"), null], "Xác nhận mật khẩu không khớp"),
  admin_id: yup.string().nullable().required("Vui lòng chọn người phụ trách"),
});

const forgotPasswordSchema = yup.object({
  password: yup
    .string()
    .min(6, "Mật khẩu phải có tối thiểu 6 ký tự")
    .required("Mật khẩu không được bỏ trống"),
  password_confirmation: yup
    .string()
    .required("Nhập lại mật khẩu không được bỏ trống")
    .oneOf([yup.ref("password"), null], "Mật khẩu không khớp"),
});

const addressSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại định dạng")
    .required("Bạn chưa nhập số điện thoại"),
  address: yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
});

const newAddress = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại định dạng")
    .required("Bạn chưa nhập số điện thoại"),
  citys: yup.object().required("Vui lòng nhập địa chỉ cụ thể"),
  districts: yup.object().required("Vui lòng nhập địa chỉ cụ thể"),
  wards: yup.object().required("Vui lòng nhập địa chỉ cụ thể"),
  notes: yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
});

const checkoutSchema = yup.object({
  address_id: yup.string().required("Vui lòng chọn địa chỉ của đơn hàng"),
});

const updateAccountInfoSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  region_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
  district_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
  ward_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
});

const changePasswordSchema = yup.object({
  old_password: yup.string().required("Mật khẩu hiện tại không được bỏ trống"),
  // .min(8, "Mật khẩu phải có tối thiểu 8 ký tự"),
  password: yup
    .string()
    .required("Mật khẩu mới không được bỏ trống")
    .min(8, "Mật khẩu phải có tối thiểu 8 ký tự"),
  password_confirmation: yup
    .string()
    .required("Xác nhận mật khẩu không được bỏ trống")
    .oneOf([yup.ref("password"), null], "Xác nhận mật khẩu không khớp"),
});

const addressesSchema = yup.object({
  phone: yup
    .string()
    .matches(phoneRegExp, "Số điện thoại định dạng")
    .required("Bạn chưa nhập số điện thoại"),
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  region_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
  district_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
  ward_id: yup.string().nullable().required("Vui lòng chọn địa chỉ cụ thể"),
  address: yup.string().required("Vui lòng nhập địa chỉ cụ thể"),
});

const PinggerCampaignSchema = yup.object({
  name: yup.string().required("Vui lòng nhập họ tên bạn"),
  phone: yup
    .string()
    .matches(phoneRegExp, "Vui lòng nhập đúng định dạng Số điện thoại")
    .required("Bạn chưa nhập số điện thoại"),
  email: yup
    .string()
    .matches(emailRegExp, "Vui lòng nhập đúng định dạng Email")
    .required("Bạn chưa nhập email"),
  sex: yup.string().required("Vui lòng chọn giới tính"),
  birthday: yup.string().required("Vui lòng chọn ngày tháng năm sinh"),
  region_id: yup.string().nullable().required("Vui lòng chọn địa chỉ"),
  district_id: yup.string().nullable().required("Vui lòng chọn địa chỉ"),
  ward_id: yup.string().nullable().required("Vui lòng chọn địa chỉ"),
  salary: yup.string().required("Vui lòng lựa chọn mức thu nhập"),
  job: yup.string().required("Vui lòng nhập nghề nghiệp"),
  business: yup
    .string()
    .required("Vui lòng lựa chọn bạn đã bán hàng bao giờ chưa"),
  social_choose: yup.string().required("Vui lòng chọn mạng xã hội"),
  social_link: yup
    .string()
    .required("Vui lòng nhập link trang cá nhân mạng xã hội của bạn"),
});

export {
  loginSchema,
  registerSchema,
  checkPhoneSchema,
  forgotPasswordSchema,
  addressSchema,
  newAddress,
  checkoutSchema,
  updateAccountInfoSchema,
  changePasswordSchema,
  addressesSchema,
  PinggerCampaignSchema,
};
