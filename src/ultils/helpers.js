export const helpers = {
  formatCurrency(number, separatorFormat = ".", postfix = "đ") {
    if (number) {
      const formattedNumber = number.toString().replace(/\D/g, "");
      const rest = formattedNumber.length % 3;
      let currency = formattedNumber.substr(0, rest);
      const thousand = formattedNumber.substr(rest).match(/\d{3}/g);
      let separator;

      if (thousand) {
        separator = rest ? separatorFormat : "";
        currency += separator + thousand.join(separatorFormat);
      }

      return `${currency} ${postfix}`;
    } else {
      return "-";
    }
  },
};
