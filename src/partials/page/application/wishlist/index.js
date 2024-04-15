import DoneAllIcon from "@mui/icons-material/DoneAll";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Paper,
  Table,
  Button,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useWishList } from "@/hooks/useWishList";
import { helpers } from "@/ultils/helpers";
import Swal from "sweetalert2";
import EmptyData from "@/components/ui/EmptyData";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import LoadingSection from "@/components/loading/loadingSection";
import PinggoImage from "@/components/ui/PinggoImage";

const Wishlist = () => {
  const { wishLists, deleteWishlist, isLoading } = useWishList();

  const handleDeleteItem = (productId) => {
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
    <Box>
      <TableContainer component={Paper} elevation={0}>
        {wishLists?.data?.length === 0 && (
          <EmptyData
            title={"Danh sách yêu thích trống"}
            icon={<FavoriteBorderOutlined color="primary" fontSize="large" />}
          />
        )}
        {wishLists?.data?.length > 0 && (
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#1d96d2" }}>
              <TableRow>
                <TableCell style={{ color: "white" }}>Sản phẩm</TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Thương hiệu
                </TableCell>
                <TableCell align="center" style={{ color: "white" }}>
                  Tình trạng
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  Giá
                </TableCell>
                <TableCell align="right" style={{ color: "white" }}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wishLists?.data.map((item) => {
                return (
                  <TableRow
                    key={item.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" sx={{ width: "30%" }}>
                      <Box sx={{ display: "flex" }}>
                        <PinggoImage
                          src={item.image[0].small_image_url}
                          alt={item.name}
                          width={45}
                          height={45}
                          style={{ display: "block", marginRight: "10px" }}
                        />
                        <Link href={`/products/${item.slug}-i.${item.id}`}>
                          {item.name}
                        </Link>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <Chip label={item.brand.name} color="primary" />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", justifyContent: "center" }}>
                        <DoneAllIcon
                          sx={{ color: "#2e7d32", marginRight: "10px" }}
                        />
                        <Typography variant="body2">
                          {item.stock_label}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body2"
                        fontWeight={"600"}
                        color={"primary"}
                      >
                        {helpers.formatCurrency(item.price)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="outlined"
                        onClick={() => handleDeleteItem(item.id)}
                      >
                        <DeleteIcon style={{ color: "red" }} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        )}
        {isLoading && <LoadingSection />}
      </TableContainer>
    </Box>
  );
};

export default Wishlist;
