import format from "date-fns/format";

export default function FormatTime(value) {
  const date = new Date(value);
  return format(date, "dd/MM/yyyy");
}
