import { Pagination, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { useRouter } from "next/router";

const PinggoPagination = ({ data, limit, unit }) => {
  const router = useRouter();

  const currentPage = !!router.query?.page ? Number(router.query?.page) : 1;

  const handleChangePage = (page) => {
    router.push({
      pathname: router.pathname,
      query: {
        ...router.query,
        page,
      },
    });
  };
  if (data?.meta?.total > limit) {
    return (
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent={{ xs: "flex-start", sm: "space-between" }}
        alignItems="center"
        height={{ xs: 60, sm: 50 }}
        px={{ xs: 0, sm: 2 }}
        py={{ xs: "4px", sm: 0 }}
        spacing={{ xs: "4px", sm: 0 }}
      >
        <Stack
          width={"100%"}
          maxWidth={{ xs: "unset", sm: "200px" }}
          justifyContent={"flex-start"}
        >
          <Typography variant="body2">
            Hiển thị {(currentPage - 1) * limit + 1} -{" "}
            {Math.min(currentPage * limit, data?.meta?.total)} /{" "}
            {data?.meta?.total} {unit}
          </Typography>
        </Stack>

        <Pagination
          count={Math.ceil(data?.meta?.total / limit)}
          page={currentPage}
          shape="rounded"
          color="primary"
          onChange={(_, page) => handleChangePage(page)}
          sx={{
            width: "100%",
            ".MuiPagination-ul": {
              justifyContent: { xs: "flex-start", sm: "flex-end" },
            },
          }}
          siblingCount={0}
          boundaryCount={1}
        />
      </Stack>
    );
  }

  return null;
};

export default PinggoPagination;
