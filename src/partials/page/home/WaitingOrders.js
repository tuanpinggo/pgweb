import {
  Badge,
  Box,
  Button,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Image from "next/image";
import OrdersSvg from "public/icons/orders.svg";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { DataGrid, viVN } from "@mui/x-data-grid";
import { NumericFormat } from "react-number-format";
import { goOffline, goOnline, onValue, ref } from "firebase/database";
import { useEffect, useRef, useState } from "react";
import { realtimeDB } from "@/components/firebase/init";
import Countdown from "react-countdown";
import { useSales } from "@/hooks/useSales";
import SalesDetailDrawer from "./SalesDetailDrawer";
import Link from "next/link";

const WaitingOrders = (props) => {
  const theme = useTheme();
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  const { salesDetail, setSelectedSales, selectedSales } = useSales();
  const [data, setData] = useState([]);

  useEffect(() => {
    goOnline(realtimeDB);
    return () => {
      goOffline(realtimeDB);
    };
  }, []);

  const realtimeDatabaseRef = useRef(ref(realtimeDB, "/orders"));

  useEffect(() => {
    onValue(
      realtimeDatabaseRef.current,
      (snapshot) => {
        let datas = [];
        snapshot.forEach((item) => {
          datas.push(item.val());
        });

        setData(datas);
      },
      {
        onlyOnce: true,
      }
    );
  }, []);

  const SalesDetailDrawerRef = useRef();

  const columns = [
    {
      field: "id",
      headerName: "Số đơn",
      width: 100,
      renderCell: (params) => (
        <Typography variant="body2" fontWeight={600} color="#333">
          {params.value}
        </Typography>
      ),
    },
    {
      field: "time_end",
      headerName: "Thời gian còn lại",
      width: 150,
      renderCell: (params) => (
        <Typography variant="h6" fontSize={15} fontWeight={700}>
          <Countdown date={params?.value * 1000} />
        </Typography>
      ),
    },
    {
      field: "address",
      headerName: "Địa chỉ giao hàng",
      width: 350,
      renderCell: (params) => (
        <Typography variant="body2" fontSize={13} fontWeight={400}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "total_item",
      headerName: "Số sản phẩm",
      width: 150,
      type: "number",
      renderCell: (params) => (
        <Typography variant="h6" fontSize={15} fontWeight={700}>
          {params.value}
        </Typography>
      ),
    },
    {
      field: "grand_total",
      headerName: "Giá trị đơn hàng",
      width: 200,
      renderCell: (params) => (
        <NumericFormat
          thousandSeparator=","
          decimalSeparator="."
          value={params?.value}
          displayType="text"
          suffix={"đ"}
          style={{
            color: theme.palette.primary.main,
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
      renderCell: (params) => (
        <Button
          variant="contained"
          onClick={() => {
            setSelectedSales({
              id: params?.id,
              time_end: params?.row?.time_end,
            });

            SalesDetailDrawerRef?.current?.openDrawer();
          }}
        >
          Chi tiết
        </Button>
      ),
    },
  ];

  return (
    <Stack mt={"30px"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{ xs: 1, sm: 2 }}
        bgcolor="#FFF"
        borderRadius={1}
        {...(!!props?.noHeader
          ? {
              display: "none",
            }
          : {})}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={{ sm: "20px" }}>
          <Stack display={{ xs: "none", sm: "flex" }}>
            <Image src={OrdersSvg} width={20} height={20} alt="Order" />
          </Stack>
          <Typography
            fontSize={{ xs: 14, sm: 20 }}
            lineHeight={{ xs: "20px", sm: "28px" }}
            fontWeight={600}
            variant="h4"
          >
            Đơn hàng chờ tiếp nhận
          </Typography>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <Link href={"/sales/receive"}>
            <Button
              sx={{
                textTransform: "none",
                color: "#363636",
              }}
              endIcon={
                isOverSmScreen ? (
                  <KeyboardDoubleArrowRightOutlinedIcon />
                ) : (
                  <Badge
                    badgeContent={data?.length}
                    color="primary"
                    sx={{ ml: 1 }}
                  />
                )
              }
            >
              <Typography
                fontSize={{ xs: 12, sm: 14 }}
                fontWeight={400}
                variant="body2"
              >
                Xem tất cả
              </Typography>
            </Button>
          </Link>
        </Stack>
      </Stack>
      <Stack mt={2} bgcolor="#FFF" borderRadius={"4px"}>
        {data.length < 1 ? (
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
            width="100%"
            height={{ xs: 150, sm: 300 }}
            mt={2}
            spacing={3}
          >
            <CircularProgress size={26} />
            <Typography variant="body2">Đang chờ đơn hàng mới ...</Typography>
          </Stack>
        ) : (
          <DataGrid
            rows={data}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 30,
                },
              },
            }}
            pageSizeOptions={[10, 20, 30, 50, 100]}
            disableRowSelectionOnClick
            rowHeight={50}
            localeText={viVN.components.MuiDataGrid.defaultProps.localeText}
            getRowId={(params) => params?.id}
            hideFooter={true}
          />
        )}
      </Stack>
      <SalesDetailDrawer
        ref={SalesDetailDrawerRef}
        salesDetail={salesDetail}
        selectedSales={selectedSales}
      />
    </Stack>
  );
};

export default WaitingOrders;
