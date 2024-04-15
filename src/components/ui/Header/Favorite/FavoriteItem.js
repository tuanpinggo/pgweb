import { LoadingButton } from "@mui/lab";
import { Chip, Divider, Stack, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PinggoImage from "../../PinggoImage";
import { NumericFormat } from "react-number-format";
import { useWishList } from "@/hooks/useWishList";
import Swal from "sweetalert2";
import useCart from "@/hooks/useCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const FavoriteItem = ({ item }) => {
  const { addProduct, isAddProductMutating } = useCart();

  const { deleteWishlist, isDeleteWishListsMutating } = useWishList();

  const handleDeleteItem = async (productId) => {
    Swal.fire({
      showCancelButton: true,
      text: "Bạn có muốn xoá sản phẩm này khỏi danh sách yêu thích không ?",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Huỷ",
    }).then(async ({ isConfirmed }) => {
      if (!isConfirmed) return;
      await deleteWishlist(productId);
    });
  };
  return (
    <Stack bgcolor={"#FFF"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={{ xs: 1, sm: 2 }}
        py={{ xs: 1, sm: 1.5 }}
      >
        <Stack direction={"row"} spacing={1}>
          <Chip
            label={item.brand.name}
            color="success"
            sx={{ width: "fit-content" }}
          />
        </Stack>
        <Stack direction={"row"} alignItems={"center"} spacing={1}>
          <LoadingButton
            variant="contained"
            loading={isAddProductMutating}
            startIcon={<AddShoppingCartIcon sx={{ cursor: "pointer" }} />}
            loadingPosition="start"
            sx={{
              textTransform: "none",
              width: "fit-content",
              ...(item?.product?.price === 0 ? { display: "none" } : {}),
            }}
            size="small"
            onClick={async () => {
              await addProduct({ id: item.id, qty: 1 });
            }}
            disabled={item?.price === 0}
          >
            Thêm
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={async () => {
              await handleDeleteItem(item.id);
            }}
            loading={isDeleteWishListsMutating}
            startIcon={<ClearOutlinedIcon sx={{ cursor: "pointer" }} />}
            loadingPosition="start"
            sx={{
              textTransform: "none",
              width: "fit-content",
            }}
            size="small"
          >
            Xoá
          </LoadingButton>
        </Stack>
      </Stack>
      <Divider flexItem />
      <Stack
        direction={"row"}
        alignItems={"center"}
        textOverflow={"ellipsis"}
        spacing={1}
        px={{ xs: 1, sm: 2 }}
        py={{ xs: 1, sm: 1.5 }}
      >
        <PinggoImage
          style={{ margin: "0 10px" }}
          width={65}
          height={65}
          src={item.image?.[0]?.large_image_url}
          alt="test"
        />
        <Stack flexGrow={1} minWidth={0}>
          <Typography
            variant="pSmall"
            sx={{
              display: "-webkit-box",
              overflow: "hidden",
              WebkitLineClamp: "3",
              WebkitBoxOrient: "vertical",
            }}
          >
            {item.name}
          </Typography>
        </Stack>
      </Stack>
      <Divider flexItem />

      <Stack px={{ xs: 1, sm: 2 }} py={{ xs: 1, sm: 1.5 }} spacing={1}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Giá
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            {item?.price > 0 ? (
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                value={item?.price}
                displayType="text"
                suffix={" đ"}
              />
            ) : (
              <Typography
                fontSize={14}
                fontWeight={500}
                lineHeight={"20px"}
                color={"primary"}
              >
                Liên hệ
              </Typography>
            )}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Tình trạng
          </Typography>
          <Typography
            fontSize={14}
            fontWeight={500}
            lineHeight={"20px"}
            color={"#2e7d32"}
          >
            {item.stock_label}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default FavoriteItem;
