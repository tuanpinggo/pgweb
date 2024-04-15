export default function FormatCurrency(data) {
  const formatter = new Intl.NumberFormat("vi-VN");
  return formatter.format(data);
}
