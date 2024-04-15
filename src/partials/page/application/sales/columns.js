import { Button, Typography } from "@mui/material";
import { NumericFormat } from "react-number-format";

export const SalesColumns = [
  {
    field: "code",
    headerName: "Mã đơn",
    width: 150,
    renderCell: (params) => (
      <Typography variant="body2" fontWeight={600} color="#333">
        {params.value}
      </Typography>
    ),
  },

  {
    field: "address",
    headerName: "Địa chỉ giao hàng",
    width: 250,
    renderCell: (params) => (
      <Typography
        variant="body2"
        fontSize={13}
        fontWeight={400}
        whiteSpace={"normal"}
      >
        {params.value}
      </Typography>
    ),
  },
  {
    field: "total_item",
    headerName: "Số sản phẩm",
    width: 150,
    type: "number",
    valueGetter: (params) =>
      params?.row?.items.reduce(
        (sum, current) => sum + Number(current?.qty || 0),
        0
      ),
    renderCell: (params) => (
      <Typography variant="h6" fontSize={15} fontWeight={700}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "grand_total",
    headerName: "Giá trị đơn hàng",
    width: 150,
    type: "number",
    renderCell: (params) => (
      <NumericFormat
        thousandSeparator=","
        decimalSeparator="."
        value={params?.value}
        displayType="text"
        suffix={"đ"}
        style={{
          fontSize: 15,
          fontWeight: 700,
        }}
      />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 100,
    type: "number",
    renderCell: () => (
      <Button size="small" variant="contained">
        Chi tiết
      </Button>
    ),
  },
];
