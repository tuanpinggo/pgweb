import {
  Button,
  Chip,
  CircularProgress,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useRef, useState } from "react";
import MyLocationOutlinedIcon from "@mui/icons-material/MyLocationOutlined";
import axiosClient from "@/api-client/axiosClient";
import useSWR from "swr";
import { ProductsSort } from "@/constants/products";
import Product from "@/components/ui/Products/Product";
import QuickViewDrawer from "@/components/ui/Products/QuickViewDrawer";
import values from "lodash/values";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import Link from "next/link";

const RepresentativeProducts = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  const [sort, setSort] = useState(ProductsSort.PublishedAtDesc.value);

  const { data, isLoading, isValidating } = useSWR(
    ["/products", sort],
    ([url, sort]) => {
      return axiosClient.get(url, {
        params: {
          limit: 10,
          page: 1,
          sort,
        },
      });
    },
    {
      dedupingInterval: 1000 * 60 * 60 * 24,
      throwOnError: false,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      onSuccess: (res) => {},
      onError: (res) => {},
    }
  );

  const products = data?.data;
  const quickViewDrawerRef = useRef();

  const handleQuickViewProduct = (id) => {
    if (!!quickViewDrawerRef.current?.onViewProduct) {
      quickViewDrawerRef.current?.onViewProduct(id);
    }
  };
  return (
    <Stack mt={"30px"} mb={"60px"}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={{ xs: 1, sm: 2 }}
        bgcolor="#FFF"
        borderRadius={1}
      >
        <Stack direction={"row"} alignItems={"center"} spacing={{ sm: "20px" }}>
          <Stack display={{ xs: "none", sm: "flex" }}>
            <MyLocationOutlinedIcon sx={{ color: "primary.main" }} />
          </Stack>
          <Typography
            fontSize={{ xs: 14, sm: 20 }}
            lineHeight={{ xs: "20px", sm: "28px" }}
            fontWeight={600}
            variant="h4"
          >
            Sản phẩm tiêu biểu
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexWrap={{ xs: "wrap", sm: "nowrap" }}
        >
          {isOverSmScreen ? (
            values(ProductsSort).map(({ label, value }) => (
              <Chip
                key={value}
                label={label}
                sx={{
                  mx: 1,
                  my: {
                    xs: 1,
                    sm: 0,
                  },
                  borderRadius: "4px",
                  ...(sort === value
                    ? {
                        background: "#FFF0F0",
                        color: "primary.main",
                      }
                    : { color: "#717171" }),
                }}
                onClick={() => setSort(value)}
              />
            ))
          ) : (
            <Link href={"/products"}>
              <Button
                sx={{
                  textTransform: "none",
                  color: "#363636",
                }}
                endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
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
          )}
        </Stack>
      </Stack>
      <Grid container spacing={1} mt={2}>
        {products?.map((product) => (
          <React.Fragment key={product?.id}>
            <Product
              {...product}
              onQuickView={handleQuickViewProduct}
              isLogined={true}
            />
          </React.Fragment>
        ))}
      </Grid>
      {(isLoading || isValidating) && (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          width="100%"
          height={300}
          mt={2}
          spacing={3}
        >
          <CircularProgress size={26} />
          <Typography variant="body2">Đang lấy dữ liệu ...</Typography>
        </Stack>
      )}
      <QuickViewDrawer ref={quickViewDrawerRef} />
    </Stack>
  );
};

export default RepresentativeProducts;
