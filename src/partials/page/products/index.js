import {
  Backdrop,
  Chip,
  CircularProgress,
  IconButton,
  InputAdornment,
  Pagination,
  PaginationItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { PER_PAGE, ProductsSort } from "@/constants/products";
import Grid from "@mui/material/Unstable_Grid2";
import values from "lodash/values";
import omit from "lodash/omit";
import useSWRMutation from "swr/mutation";
import axiosClient from "@/api-client/axiosClient";

import QuickViewDrawer from "@/components/ui/Products/QuickViewDrawer";
import EmptyData from "@/components/ui/EmptyData";
import RemoveShoppingCartOutlinedIcon from "@mui/icons-material/RemoveShoppingCartOutlined";
import Input from "@/components/ui/Controlled/Input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Product from "@/components/ui/Products/Product";

const Products = ({ defaultData, isLogined }) => {
  const router = useRouter();

  const [params, setParams] = useState({
    limit: PER_PAGE,
    sort: ProductsSort.SoldDesc.value,
    page: 1,
  });

  const {
    data = defaultData,
    isMutating,
    trigger,
  } = useSWRMutation(
    "/products",
    (url, { arg: params }) => {
      return axiosClient.get(url, {
        params: omit(params, "total"),
      });
    },
    {
      populateCache: true,
    }
  );
  const { handleSubmit, control } = useForm({
    defaultValues: {
      keyword: router?.query?.keyword,
    },
  });

  const handleChangeParams = (name, value) => {
    const newParams = {
      ...params,
      page: 1,
      [name]: value,
    };
    setParams(newParams);
    trigger(newParams);
    const anchor = document.getElementById("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
    }
  };

  const quickViewDrawerRef = useRef();

  const handleQuickViewProduct = (id) => {
    if (!!quickViewDrawerRef.current?.onViewProduct) {
      quickViewDrawerRef.current?.onViewProduct(id);
    }
  };
  const onSubmit = async (values) => {
    handleChangeParams("keyword", values.keyword);
  };
  return (
    <React.Fragment>
      <Stack
        component={Paper}
        p={2}
        spacing={2}
        elevation={0}
        sx={{ border: "1px solid #eee" }}
      >
        <Stack
          direction={{
            sm: "row",
          }}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            fontSize={15}
            lineHeight={"20px"}
            sx={{
              flexShrink: 0,
              width: "100px",
            }}
          >
            Tìm kiếm
          </Typography>
          <Input
            control={control}
            id="keyword"
            name="keyword"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm"
            aria-label="Nhập từ khóa tìm kiếm"
            size={"small"}
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton disableRipple type="submit">
                    <SearchOutlinedIcon />
                  </IconButton>
                </InputAdornment>
              ),
              sx: {
                ml: { sm: 1 },
                mt: {
                  xs: 1,
                  sm: 0,
                },
                borderRadius: 2,
                maxWidth: { sm: "300px" },
              },
            }}
            inputProps={{
              style: {
                fontSize: "14px",
                lineHeight: "1.5",
              },
            }}
          />
        </Stack>
        <Stack
          direction={{
            sm: "row",
          }}
          sx={{
            alignItems: {
              xs: "flex-start",
              sm: "center",
            },
          }}
        >
          <Typography
            variant="body1"
            fontWeight={500}
            fontSize={15}
            lineHeight={"20px"}
            sx={{
              flexShrink: 0,
              width: "100px",
            }}
          >
            Sắp xếp theo
          </Typography>
          <Stack
            direction={"row"}
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexWrap={{ xs: "wrap", sm: "nowrap" }}
            mt={{
              xs: 1,
              sm: 0,
            }}
            ml={{
              xs: -1,
              sm: 0,
            }}
          >
            {values(ProductsSort).map(({ label, value }) => (
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
                  ...(params?.sort === value
                    ? {
                        background: "#FFF0F0",
                        color: "primary.main",
                        ":hover": {
                          background: "#FFF0F0",
                        },
                      }
                    : {
                        color: "#717171",
                      }),
                }}
                onClick={() => handleChangeParams("sort", value)}
              />
            ))}
          </Stack>
        </Stack>
      </Stack>
      <Stack spacing={3} minHeight={500} mt={"20px!important"}>
        {data?.data?.length > 0 && (
          <React.Fragment>
            <Grid container spacing={{ xs: 1, sm: 2 }}>
              {data?.data?.map((product) => (
                <React.Fragment key={product?.id}>
                  <Product
                    {...product}
                    onQuickView={handleQuickViewProduct}
                    isLogined={isLogined}
                  />
                </React.Fragment>
              ))}
            </Grid>
            <Stack
              marginY={"24px!important"}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Pagination
                count={Math.ceil(data?.meta?.total / PER_PAGE)}
                page={Number(params.page)}
                onChange={(_, value) => handleChangeParams("page", value)}
                renderItem={(item) => (
                  <PaginationItem
                    component={"div"}
                    {...item}
                    sx={{
                      backgroundColor: "white.main",
                      "&.MuiPaginationItem-root.Mui-selected": {
                        color: "white.main",
                        backgroundColor: "primary.main",
                      },
                    }}
                  />
                )}
              />
            </Stack>
          </React.Fragment>
        )}
        {data?.data?.length === 0 && (
          <EmptyData
            title={"Không có kết quả nào phù hợp"}
            icon={
              <RemoveShoppingCartOutlinedIcon
                color="primary"
                fontSize="large"
              />
            }
          />
        )}
      </Stack>
      <Backdrop
        sx={{
          color: "primary.main",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          marginTop: "0 !important",
          backgroundColor: "rgb(0,0,0,0.1)",
        }}
        open={isMutating}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <QuickViewDrawer ref={quickViewDrawerRef} />
    </React.Fragment>
  );
};

export default Products;
