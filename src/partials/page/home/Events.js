import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import Image from "next/image";
import FireSvg from "public/icons/fire.svg";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import useSystem from "@/hooks/useSystem";
import Grid from "@mui/material/Unstable_Grid2";
import PinggoImage from "@/components/ui/PinggoImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const DesktopLayout = ({ events }) => {
  return (
    <Grid container spacing={1} mt={2}>
      {events?.slice(0, 4)?.map((event) => (
        <Grid sm={3} key={event?.id}>
          <Stack spacing={1} borderRadius={1.5}>
            <Box
              width={"100%"}
              height={160}
              sx={{
                borderRadius: 1.5,
              }}
            >
              <PinggoImage
                src={event?.thumbnail}
                alt="Event Image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 6,
                }}
              />
            </Box>
            <Box width={"100%"} pr={1}>
              <Typography variant="body2" fontSize={12} fontWeight={500}>
                {event?.title}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      ))}
    </Grid>
  );
};

const MobileLayout = ({ events }) => {
  return (
    <Stack
      direction={"row"}
      justifyContent={"center"}
      alignItems={"center"}
      mt={2}
    >
      <Swiper
        slidesPerView={"auto"}
        centeredSlides={false}
        spaceBetween={20}
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination]}
        className="custom-swiper-home-blog"
        initialSlide={3}
      >
        {events?.map((event) => (
          <SwiperSlide key={event?.id}>
            {({ isActive }) => (
              <Stack
                justifyContent="center"
                alignItems="center"
                height={"100%"}
                border="1px solid #eee"
                borderRadius={1.5}
                className="boxHover"
                sx={{
                  opacity: isActive ? 1 : 0.4,
                }}
                textAlign={"left"}
              >
                <Stack
                  bgcolor={"#FFFFFF"}
                  width="100%"
                  height={"100%"}
                  borderRadius="5px"
                >
                  <Stack
                    objectFit="cover"
                    width={"100%"}
                    maxHeight={"215px"}
                    minHeight={"215px"}
                    borderRadius="8px 8px 0 0"
                    sx={{
                      "& img": {
                        borderRadius: "5px 5px 0 0",
                      },
                    }}
                  >
                    <PinggoImage
                      src={event?.thumbnail}
                      cover
                      alt={"Product Image"}
                    />
                  </Stack>
                  <Box px={1.5} py={2}>
                    <Typography
                      sx={{
                        display: "-webkit-box",
                        " -webkit-line-clamp": 3,
                        " -webkit-box-orient": "vertical",
                        overflow: "hidden",
                      }}
                      fontWeight={400}
                      fontSize={14}
                      mt={1.5}
                    >
                      {event?.title}
                    </Typography>
                  </Box>
                </Stack>
              </Stack>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </Stack>
  );
};

const Events = () => {
  const isOverSmScreen = useMediaQuery("(min-width:600px)");

  const { events } = useSystem();

  return (
    <Stack mt={"30px"}>
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
            <Image src={FireSvg} width={20} height={20} alt="Order" />
          </Stack>
          <Typography
            fontSize={{ xs: 14, sm: 20 }}
            lineHeight={{ xs: "20px", sm: "28px" }}
            fontWeight={600}
            variant="h4"
          >
            {isOverSmScreen
              ? " Sự kiện Pinggo hợp tác cùng các nhãn hàng"
              : "Sự kiện PingGO cùng các nhãn hàng"}
          </Typography>
        </Stack>
        <Stack
          direction={"row"}
          alignItems={"center"}
          spacing={"20px"}
          display={{ xs: "none", sm: "flex" }}
        >
          <Button
            sx={{
              textTransform: "none",
              color: "#363636",
            }}
            endIcon={<KeyboardDoubleArrowRightOutlinedIcon />}
          >
            <Typography fontSize={14} fontWeight={400} variant="body2">
              Xem tất cả
            </Typography>
          </Button>
        </Stack>
      </Stack>
      {isOverSmScreen ? (
        <DesktopLayout events={events} />
      ) : (
        <MobileLayout events={events} />
      )}
    </Stack>
  );
};

export default Events;
