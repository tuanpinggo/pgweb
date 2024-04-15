import { toast } from "@/components/toast";
import { useAddresses } from "@/hooks/useAddresses";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { LoadingButton } from "@mui/lab";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
const RemoveAddressDialog = ({ address }) => {
  const { deleteAddress, isDeleteAddressMutating } = useAddresses();
  const onDeleteAddress = async (data) => {
    Swal.fire({
      icon: "warning",
      showCancelButton: true,
      titleText: "Xác nhận xóa địa chỉ",
      html:
        "Bạn có chắc chắn muốn xóa địa chỉ " +
        `<b>${address?.full_address}</b>`,

      confirmButtonText: "Xóa",
      cancelButtonText: "Không",
      confirmButtonColor: "rgb(211, 0, 0)",
    }).then(async ({ isConfirmed }) => {
      if (!isConfirmed) return;
      await deleteAddress(
        {
          id: address?.id,
        },
        {
          onSuccess: () => {
            toast({
              type: "success",
              message: <Box>Địa chỉ đã được xóa khỏi danh sách</Box>,
            });
          },
        }
      );
    });
  };
  return (
    <LoadingButton
      variant="text"
      onClick={onDeleteAddress}
      loading={isDeleteAddressMutating}
      startIcon={<DeleteOutlinedIcon sx={{ cursor: "pointer" }} />}
      loadingPosition="start"
      sx={{
        width: "36px",
        height: "36px",
        minWidth: "36px",
        maxWidth: "36px",
        borderRadius: "100%",
        ".MuiButton-startIcon": {
          margin: 0,
        },
        ".MuiLoadingButton-loadingIndicator": {
          left: 0,
        },
      }}
    />
  );
};
export default RemoveAddressDialog;
