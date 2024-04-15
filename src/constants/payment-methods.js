export const PaymentMethod = {
  COD: "cash_on_delivery",
  BankTransfer: "bank_transfer",
};

export const PaymentMethodTranslation = {
  [PaymentMethod.COD]: "Thanh toán khi nhận hàng",
  [PaymentMethod.BankTransfer]: "Chuyển khoản ngân hàng",
};
