import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import { LoadingButton } from "@mui/lab";
import { useNotifications } from "@/hooks/useNotifications";
import { Tooltip } from "@mui/material";

const ReadButton = ({ notification }) => {
  const {
    mutate,
    readNotification,
    isReadNotificationMutating,
    mutateNotificationsInDrawer,
  } = useNotifications();

  if (!notification?.read_at)
    return (
      <Tooltip title="Đánh dấu là đã đọc">
        <LoadingButton
          onClick={async () => {
            await readNotification(
              {
                notificationId: notification?.id,
                topicId: notification?.topic,
              },
              {
                onSuccess: async () => {
                  await mutate();
                  await mutateNotificationsInDrawer();
                },
              }
            );
          }}
          loading={isReadNotificationMutating}
          startIcon={
            <DoneOutlinedIcon color="success" sx={{ cursor: "pointer" }} />
          }
          loadingPosition="start"
          sx={{
            width: "20px",
            height: "20px",
            minWidth: "20px",
            maxWidth: "20px",
            ".MuiButton-startIcon": {
              margin: 0,
            },
            ".MuiLoadingButton-loadingIndicator": {
              left: 0,
            },
          }}
        />
      </Tooltip>
    );
  return null;
};

export default ReadButton;
