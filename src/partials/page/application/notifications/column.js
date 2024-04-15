import { Typography } from "@mui/material";
import { format } from "date-fns";
import ReadButton from "@/components/ui/Header/Notifications/ReadButton";

export const NotificationsColumn = [
  {
    field: "created_at",
    headerName: "Thời gian",
    width: 200,
    renderCell: (params) => (
      <Typography variant="body2" fontWeight={600} color="#333">
        {format(new Date(params.value), "dd/MM/yyyy - hh:mm")}
      </Typography>
    ),
  },

  {
    field: "message",
    headerName: "Tiêu đề",
    width: 200,
    valueGetter: (params) => params?.row?.data?.notification?.title,
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
    field: "description",
    headerName: "Mô tả",
    width: 300,
    valueGetter: (params) => params?.row?.data?.notification?.body,
    renderCell: (params) => (
      <Typography
        component={"span"}
        fontSize={14}
        fontWeight={400}
        lineHeight={"20px"}
        py={1}
        whiteSpace={"break-spaces"}
        dangerouslySetInnerHTML={{
          __html: params.value,
        }}
      />
    ),
  },
  {
    field: "action",
    headerName: "Action",
    width: 90,
    renderCell: (params) => <ReadButton notification={params?.row} />,
  },
];
