import { IconButton, InputAdornment, Stack } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import PinggoImage from "@/components/ui/PinggoImage";
import useSystem from "@/hooks/useSystem";
import Input from "@/components/ui/Controlled/Input";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const Promotions = () => {
  const { promotions } = useSystem();
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    defaultValues: {},
  });

  const onSubmit = async (values) => {
    router.push({
      pathname: "products",
      query: {
        keyword: values?.keyword,
      },
    });
  };
  return (
    <Stack>
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
        display={{ xs: "flex", sm: "none" }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
        mb={2}
      >
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
              background: "#FFF",
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
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        className="swiper-homepage"
      >
        {promotions?.map(
          (promotion) =>
            !!promotion?.thumbnail && (
              <SwiperSlide key={promotion?.id}>
                <PinggoImage
                  src={promotion?.thumbnail?.full}
                  width={1200}
                  height={500}
                  alt="Promotion"
                  style={{
                    borderRadius: "8px",
                  }}
                />
              </SwiperSlide>
            )
        )}
      </Swiper>
    </Stack>
  );
};

export default Promotions;
