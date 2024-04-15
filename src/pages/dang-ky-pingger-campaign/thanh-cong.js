import BackToTop from "@/components/ui/BackToTop";
import EmptyLayout from "@/layouts/empty";
import CustomAppbar from "@/partials/page/landing-page/CustomAppbar";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { NextSeo } from "next-seo";
import Grid from "@mui/material/Unstable_Grid2";
import { globalConfig } from "@/ultils/config";
import CampaignHero from "public/campaign_hero.png";
import Image from "next/image";
import Link from "next/link";

export default function FormCampaignSuccess(){
    return (
        <>
            <NextSeo
            title="Chiến dịch đăng ký Pingger"
            description="Chiến dịch đăng ký Pingger"
            canonical="https://pinggo.vn/dang-ky-pingger-campaign"
            openGraph={{
                url: "https://pinggo.vn/dang-ky-pingger-campaign",
                title: "Chiến dịch đăng ký Pingger",
                description: "Chiến dịch đăng ký Pingger",
                images: [
                {
                    url: "/pinggo-og.jpg",
                    width: 800,
                    height: 800,
                    alt: "Chiến dịch đăng ký Pingger",
                    type: "image/jpeg",
                },
                ],
                siteName: "PingGo",
            }}
            twitter={{
                handle: "@pinggo",
                site: "@pinggo",
                cardType: "summary_large_image",
            }}
            />
            
            <Stack
                width="100vw"
                minHeight={"100vh"}
                id="#back-to-top-anchor"
                sx={{
                background:
                    "linear-gradient(116.65deg, #1D96D2 0.24%, #DA1A5D 99.27%)",
                position: "relative",
                }}
            >
                <CustomAppbar />
                <Container
                    maxWidth={globalConfig.containerMaxWidth}
                    sx={{
                        mt: { xs: "90px", sm: "125px" },
                        position: "relative",
                    }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                        padding: { xs: "15px", sm: "30px" },
                        borderRadius: "10px",
                        overflow: "hidden",
                        maxHeight: { xs: "calc(100svh - 120px)", sm: "unset" },
                        }}
                        component={"div"}
                    >
                        <Grid
                            container
                            columnSpacing={4.5}
                            sx={{
                                maxHeight: { xs: "calc(100svh - 150px)", sm: "750px" },
                                overflowY: { xs: "auto", sm: "unset" },
                            }}
                        >
                            <Grid xs={12} md={6}>
                                <Stack
                                bgcolor={{ sm: "#FFFFFF", md: "rgba(47, 138, 198, 1)" }}
                                borderRadius={{ md: "10px" }}
                                padding={{ md: "50px 35px 20px" }}
                                >
                                <Stack
                                    borderRadius={"10px"}
                                    border={"1px solid rgba(255, 255, 255, 0.2)"}
                                    bgcolor={"rgba(255, 255, 255, 0.2)"}
                                    justifyContent={"space-between"}
                                    position={"relative"}
                                >
                                    <Stack
                                    padding={{ xs: "20px 0px ", sm: "72px 36px" }}
                                    spacing={"20px"}
                                    textAlign={"center"}
                                    >
                                    <Typography
                                        fontWeight={700}
                                        fontSize={"20px"}
                                        lineHeight={"26px"}
                                    >
                                        CÙNG PINGGO KIẾM GẤP ĐÔI THU NHẬP NGAY HÔM NAY
                                    </Typography>
                                    <Typography
                                        color={{ sm: "#FFFFFF" }}
                                        fontSize={"18px"}
                                        fontWeight={500}
                                        lineHeight={"26px"}
                                        fontStyle={"italic"}
                                    >
                                        Vui lòng điền đầy đủ thông tin để bắt đầu tham gia chiến
                                        dịch
                                    </Typography>
                                    </Stack>
                                    <Box
                                    sx={{
                                        width: 359,
                                        height: 427,
                                        borderRadius: "10px",
                                        display: {
                                        xs: "none",
                                        md: "block",
                                        },
                                    }}
                                    >
                                    <Image
                                        src={CampaignHero}
                                        alt="Campaign Hero"
                                        width={359}
                                        height={427}
                                        quality={100}
                                        style={{
                                        borderRadius: "10px",
                                        }}
                                    />
                                    </Box>

                                    <Box
                                    sx={{
                                        position: "absolute",
                                        bottom: "-200px",
                                        left: "-200px",
                                        zIndex: 0,
                                        display: {
                                        xs: "none",
                                        md: "block",
                                        },
                                    }}
                                    >
                                    <Image
                                        src="/call-to-action.svg"
                                        width={430}
                                        height={418}
                                        alt="PingGO Logo"
                                    />
                                    </Box>
                                </Stack>
                                </Stack>
                            </Grid>

                            <Grid xs={12} md={6}>
                                <Stack width={"100%"} height={"100%"} justifyContent={"center"} alignItems={"center"} spacing={3}>
                                    <Typography fontSize={20} fontWeight={700} color="primary.main">
                                        Đăng ký chiến dịch thành công
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>
                                        Cảm ơn bạn ! thông tin đăng ký của bạn đã được gửi thành công đến PingGo và đang trong quá trình <strong>Xét duyệt</strong>. Bạn vui lòng đợi kết quả được trả <strong>trước ngày 18/3/2024</strong>
                                    </Typography>
                                    <Typography variant="body2" textAlign={"center"}>Để tiếp tục, vui lòng tải ứng dụng của PingGo để theo dõi kết quả và tìm hiểu thông tin chi tiết khác</Typography>

                                    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={3}>
                                        <Link href="https://apps.apple.com/us/app/pinggo-mobile/id1524577625">
                                            <Image
                                                src={'/btn-appstore.svg'}
                                                width={107}
                                                height={35}
                                                alt={"Download IOS PingGo App"}
                                            />
                                        </Link>
                                        <Link href="https://play.google.com/store/apps/details?id=vn.pinggo">
                                            <Image
                                                src={'/btn-chplay.svg'}
                                                width={107}
                                                height={35}
                                                alt={"Download Android PingGo App"}
                                            />
                                        </Link>
                                    </Stack>
                                </Stack>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Stack>

            <BackToTop />
        </>
    );
};

FormCampaignSuccess.Layout = EmptyLayout;
    