import { Stack, Typography } from "@mui/material";
import { format } from "date-fns";

const NotificationItem = ({ notification, handleClickItem }) => {
  return (
    <Stack
      p={2}
      bgcolor={!!notification?.read_at ? "#FFFFFF" : "rgba(248, 7, 89, 0.10)"}
      spacing={"4px"}
      sx={{
        cursor: "pointer",
      }}
      onClick={handleClickItem}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Typography
          color={"#999999"}
          fontSize={14}
          fontWeight={400}
          lineHeight={"20px"}
        >
          {format(new Date(notification?.created_at), "dd/MM/yyyy - hh:mm")}
        </Typography>
      </Stack>

      <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
        {notification?.data?.notification?.title}
      </Typography>
      <Typography
        component={"span"}
        fontSize={14}
        fontWeight={400}
        lineHeight={"20px"}
        whiteSpace={"break-spaces"}
        dangerouslySetInnerHTML={{
          __html: notification?.data?.notification?.body,
        }}
      />
    </Stack>
  );
};

export default NotificationItem;
