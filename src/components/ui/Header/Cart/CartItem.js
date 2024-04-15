import { LoadingButton } from "@mui/lab";
import { Box, Divider, Stack, Typography } from "@mui/material";
import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import PinggoImage from "../../PinggoImage";
import useCart from "@/hooks/useCart";
import { NumericFormat } from "react-number-format";
import { useMemo, useState } from "react";
import { first, last, sortBy } from "lodash";
import Image from "next/image";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useForm } from "react-hook-form";
import NumericInput from "../../Controlled/NumericInput";
import { toast } from "@/components/toast";
import { PackageSvg } from "public/icons";
import Link from "next/link";

const CartItem = ({ item, editable = true, onClose, handleRefetchCart }) => {
  const {
    deleteProduct,
    isDeleteProductMutating,
    updateItem,
    isUpdateItemMutating,
    refetchCart,
  } = useCart();

  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      qty: item?.qty,
    },
  });

  const [isEditing, setIsEditing] = useState(false);

  const price_list = useMemo(
    () => sortBy(item?.product?.price_list, (item) => item?.qty),
    [item?.product?.price_list]
  );

  const onSubmit = async (values) => {
    await updateItem(
      {
        id: item?.id,
        qty: values?.qty,
      },
      {
        onSuccess: async () => {
          reset(values);
          toast({
            type: "success",
            message: <Box>Cập nhật giỏ hàng thành công</Box>,
          });
          await refetchCart();
          await handleRefetchCart();
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <Stack bgcolor={"#FFF"}>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={2}
        py={1.5}
      >
        <Stack direction={"row"} spacing={1}>
          <Image src={PackageSvg} width={20} height={20} alt="Package Icons" />
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            {item?.product?.SKU}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={1}
          {...(!editable ? { display: "none" } : {})}
        >
          <LoadingButton
            variant="outlined"
            loading={isUpdateItemMutating}
            startIcon={<EditOutlinedIcon sx={{ cursor: "pointer" }} />}
            loadingPosition="start"
            sx={{
              textTransform: "none",
              width: "fit-content",
              ...(item?.product?.price === 0 ? { display: "none" } : {}),
            }}
            size="small"
            color="info"
            {...(isEditing
              ? { type: "submit", onClick: handleSubmit(onSubmit) }
              : { onClick: () => setIsEditing(true) })}
          >
            {isEditing ? "Lưu" : "Sửa"}
          </LoadingButton>
          <LoadingButton
            variant="outlined"
            onClick={async () => {
              await deleteProduct(item.id);
              await handleRefetchCart(item.id);
            }}
            loading={isDeleteProductMutating}
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
        sx={{
          textOverflow: "ellipsis",
        }}
        spacing={1}
        px={2}
        py={1.5}
      >
        <PinggoImage
          width={65}
          height={65}
          src={item?.image?.large_image_url}
          alt="test"
        />
        <Stack flexGrow={1} minWidth={0}>
          <Link
            href={{
              pathname: "/products/[slug]",
              query: {
                slug: `${item?.product?.url_key}-i.${item?.product?.id}`,
              },
            }}
            onClick={onClose}
          >
            <Typography
              variant="pSmall"
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
              }}
            >
              {item?.name}
            </Typography>
          </Link>

          {price_list.length > 0 ? (
            <Typography variant="pSmall" color={"primary"}>
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                value={last(price_list)?.price}
                displayType="text"
                suffix={" đ"}
              />{" "}
              -{" "}
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                value={first(price_list)?.price}
                displayType="text"
                suffix={" đ"}
              />
            </Typography>
          ) : (
            <Typography variant="pSmall" color={"primary"}>
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                value={item?.price}
                displayType="text"
                suffix={" đ"}
              />
            </Typography>
          )}
        </Stack>
      </Stack>
      <Divider flexItem />

      <Stack px={2} py={1.5} spacing={"5px"}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Số lượng
          </Typography>
          {isEditing ? (
            <NumericInput
              name={"qty"}
              type="number"
              control={control}
              size={"small"}
              min={
                !!item?.product?.price_list
                  ? first(
                      sortBy(item?.product?.price_list, (entity) =>
                        Number(entity?.qty || 0)
                      )
                    )?.qty
                  : 1
              }
            />
          ) : (
            <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
              <NumericFormat
                thousandSeparator=","
                decimalSeparator="."
                value={item?.qty}
                displayType="text"
              />
            </Typography>
          )}
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography fontSize={14} fontWeight={400} lineHeight={"20px"}>
            Giá nhập
          </Typography>
          <Typography fontSize={14} fontWeight={500} lineHeight={"20px"}>
            <NumericFormat
              thousandSeparator=","
              decimalSeparator="."
              value={item?.price}
              displayType="text"
              suffix={" đ"}
            />
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CartItem;
