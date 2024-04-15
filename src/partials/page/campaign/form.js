import Input from "@/components/ui/Controlled/Input";
import Radios from "@/components/ui/Controlled/Radios";
import { Businesses, SalaryRanges, Sexes, Social } from "@/constants";
import { globalConfig } from "@/ultils/config";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Checkbox, Container, Dialog, FormControlLabel, FormGroup, Paper, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";
import CampaignHero from "public/campaign_hero.png";
import { useForm } from "react-hook-form";
import * as React from "react";
import DatePicker from "@/components/ui/Controlled/DatePicker";
import AddressSelections from "@/components/ui/Controlled/AddressSelections";
import { LoadingButton } from "@mui/lab";
import Link from "next/link";
import { PinggerCampaignSchema } from "@/models/schema";
import { useCampaign } from "@/hooks/useCampaign";
import LoadingSection from "@/components/loading/loadingSection";
import DetailCampaign from "./detail";
import axios from "axios";
import { ContactlessOutlined } from "@mui/icons-material";

const CampaignForm = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      phone: "",
    },
    resolver: yupResolver(PinggerCampaignSchema),
  });

  const [loading,setLoading] = React.useState(false)

  const [formSeslect,setFormSelect] = React.useState({
    form_1: {
      id:1,
      check: true
    },
    form_2: {
      id:2,
      check: true
    },
  })

  const handleChangeCheckbox = (event,id) => {
    setFormSelect({
      ...formSelect,
      [event.target.name]: {
        id:id,
        check: event.target.checked
      },
    });
  };

  const watchSex = watch("sex");
  const watchSalary = watch("salary");
  const watchBusiness = watch("business");
  const watchSocial = watch("social_choose");

  const {campaigns,isLoading} = useCampaign()

  const onSubmit = async (values) => {

    setLoading(true)
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://api.pinggo.vn/auth/register',
      headers: { 
        "ClientKey": "robot"
      },
      data : {
        'email': `pingger${Math.floor(Date.now())}@gmail.com`,
        'password': `pingger${Math.floor(Date.now())}`,
        'password_confirmation': `pingger${Math.floor(Date.now())}`,
        'name': 'test',
        'phone': values.phone
      }
    };

    try {
      await axios.request(config)
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error)
    }
    
    setLoading(false)
    
  };

  if(!campaigns) return <LoadingSection />

  return (
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
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
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
          <Grid
            xs={12}
            md={6}
            maxHeight={{ xs: "unset", sm: "750px" }}
            sx={{ overflowY: "auto" }}
          >
            <Stack spacing={"15px"}>
              <Typography
                fontSize={"18px"}
                fontWeight={700}
                lineHeight={"22px"}
              >
                THÔNG TIN ĐĂNG KÝ
              </Typography>
              <Input
                control={control}
                customLabel={"Họ tên"}
                placeholder={"VD: Nguyễn Văn A"}
                id="name"
                name="name"
                fullWidth
                size="small"
                containerProps={{
                  spacing: "10px",
                }}
              />
              <Input
                control={control}
                customLabel={"Điện thoại liên hệ"}
                placeholder={"VD: 0968168800"}
                id="phone"
                name="phone"
                fullWidth
                size="small"
                containerProps={{
                  spacing: "10px",
                }}
              />
              <Input
                control={control}
                customLabel={"Địa chỉ email"}
                placeholder={"VD: contact@pinggo.vn"}
                id="email"
                name="email"
                fullWidth
                size="small"
                containerProps={{
                  spacing: "10px",
                }}
              />
              <Stack>
                <Typography>Giới tính</Typography>
                <Radios
                  name="sex"
                  control={control}
                  options={Sexes}
                  getChecked={(item) => item.id === watchSex}
                  renderLabel={(item) => (
                    <Stack spacing={0.5}>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={"20px"}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  )}
                  containerProps={{ row: true }}
                />
              </Stack>
              <Stack spacing={1}>
                <Typography>Ngày/tháng/năm sinh</Typography>
                <DatePicker
                  control={control}
                  name={"birthday"}
                  fullWidth
                  size="small"
                  placeholder="VD: 10/09/1990"
                  format="dd/MM/yyyy"
                />
              </Stack>
              <Stack spacing={2}>
                <Typography>Bạn đang sinh sống ở đâu</Typography>
                <Grid container columnSpacing={1}>
                  <AddressSelections
                    control={control}
                    selectProps={{
                      size: "small",
                      inputLabelProps: {
                        size: "small",
                      },
                    }}
                    selectContainerProps={{
                      sx: {
                        marginBottom: { xs: "10px", sm: "0px" },
                      },
                    }}
                  />
                </Grid>
              </Stack>
              <Stack>
                <Typography>
                  Vui lòng cho biết mức thu nhập của bạn / tháng
                </Typography>
                <Radios
                  name="salary"
                  control={control}
                  options={SalaryRanges}
                  getChecked={(item) => item.id === watchSalary}
                  renderLabel={(item) => (
                    <Stack spacing={0.5}>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={"20px"}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  )}
                  containerProps={{ row: true }}
                />
              </Stack>
              <Input
                control={control}
                customLabel={"Nghề nghiệp"}
                placeholder={"VD: Nhân viên văn phòng"}
                id="job"
                name="job"
                fullWidth
                size="small"
                containerProps={{
                  spacing: "10px",
                }}
              />
              <Stack>
                <Typography>Bạn đã bán hàng bao giờ chưa?</Typography>
                <Radios
                  name="business"
                  control={control}
                  options={Businesses}
                  getChecked={(item) => item.id === watchBusiness}
                  renderLabel={(item) => (
                    <Stack spacing={0.5}>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={"20px"}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  )}
                  containerProps={{ row: true }}
                />
              </Stack>
              <Stack>
                <Typography>
                  Bạn đang sử dụng mạng xã hội nào nhiều nhất
                </Typography>
                <Radios
                  name="social_choose"
                  control={control}
                  options={Social}
                  getChecked={(item) => item.id === watchSocial}
                  renderLabel={(item) => (
                    <Stack spacing={0.5}>
                      <Typography
                        fontSize={14}
                        fontWeight={400}
                        lineHeight={"20px"}
                      >
                        {item.label}
                      </Typography>
                    </Stack>
                  )}
                  containerProps={{ row: true }}
                />
              </Stack>
              
              <Input
                control={control}
                customLabel={"Link trang cá nhân mạng xã hội của bạn"}
                placeholder={"VD: facebook.com/tuan.nguyenhuy"}
                id="social_link"
                name="social_link"
                fullWidth
                size="small"
                containerProps={{
                  spacing: "10px",
                }}
              />

              <Stack>
                <Typography mt={2}>
                  Bạn muốn đăng ký tham gia chiến dịch?
                </Typography>
                <FormGroup>
                  {campaigns && campaigns?.data?.map(item => 
                    <FormControlLabel 
                      key={item.id} 
                      control={<Checkbox 
                        defaultChecked 
                        name={`form_${item.id}`}
                        onChange={(event) => handleChangeCheckbox(event,item.id)}
                      />} 
                      label={
                        <DetailCampaign data={item} />
                      } 
                    />
                  )}
                </FormGroup>
              </Stack>

              <LoadingButton
                variant="contained"
                sx={{
                  color: "white",
                  bgcolor: "rgba(25, 118, 210, 1)",
                }}
                type="submit"
                loading={loading}
              >
                <Typography
                  textTransform={"initial"}
                  variant="body1"
                  color={"white !important"}
                >
                  Xác nhận
                </Typography>
              </LoadingButton>
              <Typography
                textAlign={"center"}
                fontSize={12}
                lineHeight={"15px"}
              >
                Bằng cách nhấn &quot;Xác nhận&quot;, bạn đã đồng ý với
                <Typography
                  component={Link}
                  href={"/static/dieu-khoan-va-dieu-kien-giao-dich"}
                  margin={"0 3px"}
                  fontStyle={"italic"}
                  fontWeight={600}
                  fontSize={12}
                  lineHeight={"15px"}
                  color={"rgba(25, 118, 210, 1)"}
                >
                  điều khoản dịch vụ
                </Typography>
                và cung cấp thông tin cho PINGGO
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Paper>

    </Container>
  );
};

export default CampaignForm;
