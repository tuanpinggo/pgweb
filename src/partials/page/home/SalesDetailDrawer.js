import {
  Box,
  Button,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import PinggoImage from "@/components/ui/PinggoImage";
import { NumericFormat } from "react-number-format";
import Countdown from "react-countdown";
import { LoadingButton } from "@mui/lab";
import { useSales } from "@/hooks/useSales";
import { toast, dismissToast } from "@/components/toast";
import { SalesStatus } from "@/constants/sales";
import { useRouter } from "next/router";

const SalesDetailDrawer = forwardRef(({ salesDetail, selectedSales }, ref) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const { receiveSales, isReceiveSalesMutating } = useSales();

  const openDrawer = () => setShow(true);

  const closeDrawer = () => setShow(false);

  useImperativeHandle(
    ref,
    () => ({
      openDrawer,
      closeDrawer,
    }),
    []
  );
  return (
    <Drawer
      anchor="right"
      open={show}
      onClose={closeDrawer}
      disableScrollLock={true}
    >
      <Stack
        width={{ xs: "100vw", sm: "375px" }}
        height={"100%"}
        position={"relative"}
      >
        <Stack
          direction={"row"}
          sx={{
            background:
              "linear-gradient(114deg, #F80759 -3.18%, #1D96D2 104.37%)",
          }}
          p={2}
          justifyContent={"center"}
          position={"relative"}
        >
          <IconButton
            aria-label="close-drawer"
            size="small"
            sx={{
              position: "absolute",
              left: "8px",
              top: "calc(50% - 14px)",
              color: "white.main",
            }}
            onClick={closeDrawer}
          >
            <ArrowBackOutlinedIcon fontSize="inherit" />
          </IconButton>
          <Typography
            variant="body2"
            fontSize={20}
            fontWeight={500}
            color={"white.main"}
            lineHeight={"28px"}
          >
            Chi tiết đơn hàng
          </Typography>
        </Stack>
        <Stack
          bgcolor={"#EEE"}
          height={`calc(100% - ${!salesDetail?.purchased ? 180 : 130}px)`}
          px={1}
          py={2}
          spacing={2}
          sx={{
            overflowY: "auto",
          }}
        >
          <Stack
            direction={"row"}
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            justifyContent={"space-between"}
          >
            <Typography fontSize={12} fontWeight={500} lineHeight={"17px"}>
              Trạng thái
            </Typography>
            <Typography fontSize={12} fontWeight={500} lineHeight={"17px"}>
              {salesDetail?.status_label}
            </Typography>
          </Stack>
          <Stack
            direction={"row"}
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            justifyContent={"space-between"}
          >
            <Typography fontSize={12} fontWeight={500} lineHeight={"17px"}>
              Khách hàng
            </Typography>
            <Typography
              fontSize={12}
              fontWeight={500}
              lineHeight={"17px"}
              color={"#808089"}
            >
              Chỉ hiển thị sau khi nhận đơn thành công
            </Typography>
          </Stack>
          <Stack
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            spacing={1}
          >
            <Typography fontSize={12} fontWeight={500} lineHeight={"17px"}>
              Sản phẩm
            </Typography>
            {salesDetail?.items?.map((item) => (
              <Stack
                key={item?.id}
                py={"11px"}
                direction={"row"}
                spacing={3}
                borderBottom={"1px solid #EEE"}
              >
                <PinggoImage
                  width={30}
                  height={30}
                  src={item?.image?.small_image_url}
                />
                <Stack flexGrow={1} minWidth={0}>
                  <Typography
                    fontSize={11}
                    fontWeight={500}
                    lineHeight={"14px"}
                    noWrap
                  >
                    {item?.name}
                  </Typography>
                  <Stack direction={"row"} spacing={1}>
                    <Typography
                      fontSize={11}
                      fontWeight={500}
                      lineHeight={"14px"}
                      color={"#808089"}
                    >
                      Giá retailer
                    </Typography>
                    <Typography
                      fontSize={11}
                      fontWeight={500}
                      lineHeight={"14px"}
                      color={"primary.main"}
                    >
                      <NumericFormat
                        thousandSeparator=","
                        decimalSeparator="."
                        value={item?.price}
                        displayType="text"
                        suffix={"đ"}
                      />
                    </Typography>
                    <Typography
                      fontSize={11}
                      fontWeight={500}
                      lineHeight={"14px"}
                      color={"primary.main"}
                    >
                      x {item?.qty}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            ))}
          </Stack>
          <Stack
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            spacing={2}
          >
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontSize={11} fontWeight={500} lineHeight={"14px"}>
                Số tiền COD
              </Typography>
              <Typography
                fontSize={11}
                fontWeight={600}
                lineHeight={"14px"}
                color={"primary.main"}
              >
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  value={salesDetail?.grand_total}
                  displayType="text"
                  suffix={"đ"}
                />
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontSize={11} fontWeight={500} lineHeight={"14px"}>
                Số tiền bạn nhận về
              </Typography>
              <Typography
                fontSize={11}
                fontWeight={600}
                lineHeight={"14px"}
                color={"primary.main"}
              >
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  value={salesDetail?.rev_share_retailer}
                  displayType="text"
                  suffix={"đ"}
                />
              </Typography>
            </Stack>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Typography fontSize={11} fontWeight={500} lineHeight={"14px"}>
                Hoàn lại cho PingGO
              </Typography>
              <Typography
                fontSize={11}
                fontWeight={600}
                lineHeight={"14px"}
                color={"primary.main"}
              >
                <NumericFormat
                  thousandSeparator=","
                  decimalSeparator="."
                  value={salesDetail?.the_rest}
                  displayType="text"
                  suffix={"đ"}
                />
              </Typography>
            </Stack>
          </Stack>
          <Stack
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            spacing={1}
          >
            <Typography fontSize={11} fontWeight={600} lineHeight={"14px"}>
              Thời gian đếm lùi chờ tiếp nhận đơn hàng
            </Typography>
            <Typography
              variant="h4"
              fontSize={18}
              fontWeight={600}
              lineHeight={"24px"}
            >
              <Countdown date={selectedSales?.time_end * 1000} />
            </Typography>
          </Stack>
          <Stack
            bgcolor={"white.main"}
            px={1}
            py={2}
            borderRadius={2}
            spacing={1}
          >
            <Typography fontSize={11} fontWeight={600} lineHeight={"14px"}>
              Lưu ý:
            </Typography>
            <Typography
              variant="body1"
              fontSize={11}
              fontWeight={300}
              lineHeight={"14px"}
            >
              Thông tin người mua chỉ hiển thị sau khi bạn tiếp nhận đơn hàng
            </Typography>
            <Typography
              variant="body1"
              fontSize={11}
              fontWeight={300}
              lineHeight={"14px"}
            >
              Số tiền bạn nhận về bao gồm tiền hàng và phí ship
            </Typography>
          </Stack>
        </Stack>
        <Stack
          position={"absolute"}
          width={"100%"}
          left={0}
          bottom={0}
          p={2}
          bgcolor={"white.main"}
          boxShadow={3}
        >
          {!salesDetail?.purchased && (
            <Typography
              fontSize={12}
              fontWeight={500}
              lineHeight={"17px"}
              variant="h6"
              mb={2}
            >
              Xin lỗi ! Bạn chưa nhập hàng từ PingGO nên không thể nhận đơn bán,
              vui lòng tạo đơn hàng nhập để nhận đơn
            </Typography>
          )}

          <LoadingButton
            variant="contained"
            disabled={!salesDetail?.purchased || isReceived}
            loading={isReceiveSalesMutating}
            loadingPosition="center"
            onClick={async () => {
              await receiveSales(
                {
                  id: salesDetail?.id,
                  retailer_status: SalesStatus.Confirmed,
                },
                {
                  throwOnError: false,
                  onSuccess: async () => {
                    setIsReceived(true);
                    toast({
                      type: "info",
                      closeOnClick: false,
                      message: (
                        <Stack spacing={1} onClick={dismissToast}>
                          <Typography
                            fontSize={14}
                            fontWeight={500}
                            lineHeight={"21px"}
                            textAlign={"center"}
                          >
                            Nhận đơn thành công
                          </Typography>
                          <Typography
                            fontSize={12}
                            fontWeight={400}
                            lineHeight={"16px"}
                            component={"span"}
                          >
                            Bạn đã nhận được đơn hàng
                            <Typography
                              fontSize={12}
                              fontWeight={400}
                              lineHeight={"16px"}
                              textAlign={"center"}
                              color={"#1D96D2"}
                              component={"span"}
                              mx={1}
                            >
                              #{salesDetail?.id}
                            </Typography>
                            thành công
                          </Typography>
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                          >
                            <Button
                              onClick={() => {
                                closeDrawer();
                              }}
                              variant="outlined"
                              color="secondary"
                              sx={{
                                textTransform: "none",
                              }}
                            >
                              Quay lại danh sách
                            </Button>
                            <Button
                              onClick={() => {
                                router.push("/sales");
                                closeDrawer();
                              }}
                              variant="contained"
                              sx={{
                                textTransform: "none",
                              }}
                            >
                              Xem chi tiết
                            </Button>
                          </Stack>
                        </Stack>
                      ),
                    });
                  },
                  onError: async (error) => {
                    toast({
                      type: "error",
                      message: <Box>{error?.response?.data?.message}</Box>,
                    });
                  },
                }
              );
            }}
            sx={{
              textTransform: "none",
            }}
          >
            Nhận đơn
          </LoadingButton>
        </Stack>
      </Stack>
    </Drawer>
  );
});

SalesDetailDrawer.displayName = "SalesDetailDrawer";

export default SalesDetailDrawer;
