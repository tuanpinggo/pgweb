import { useClientKey } from "@/hooks/useClientKey";
import {
  Container,
  Divider,
  List,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { globalConfig } from "@/ultils/config";

import DefaultHeader from "@/partials/header/default";
import DefaultFooter from "@/partials/footer/default";
import React from "react";
import SubRoute from "@/partials/sidebar/SubRoute";
import { useRouter } from "next/router";
import { AccountRoutes, OrdersRoutes } from "@/constants/authenticated-routes";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";
import { UserAvatarSvg } from "public/icons";

export default function AccountLayout({ children, ...props }) {
  useClientKey();

  const router = useRouter();

  const { userData, isLoading } = useAuth();

  return (
    <Stack width="100%" minHeight="100vh" sx={{ backgroundColor: "#F5F5F5" }}>
      <DefaultHeader />
      <Container
        maxWidth={globalConfig.containerMaxWidth}
        sx={{
          pt: { xs: "50px", md: "140px" },
          pb: 10,
          minHeight: "100vh",
        }}
        component={"main"}
      >
        <Stack direction={"row"} spacing={{ xs: 0, sm: 7 }}>
          <Stack
            display={{
              xs: "none",
              sm: "block",
            }}
            flexShrink={0}
          >
            <Stack direction={"row"} alignItems={"center"} spacing={1.5}>
              <Image src={UserAvatarSvg} width={40} height={40} alt="User" />
              <Stack spacing={0.5}>
                <Typography fontWeight={300} fontSize={13} lineHeight={"20px"}>
                  Xin chào !
                </Typography>
                <Typography
                  fontWeight={500}
                  fontSize={16}
                  lineHeight={"20px"}
                  color={"primary"}
                >
                  {isLoading ? "Đang tải..." : userData?.name}
                </Typography>
              </Stack>
            </Stack>
            <Divider sx={{ mt: 3, mb: 1.5 }} />
            <List sx={{ p: 0 }}>
              {AccountRoutes?.subRoutes?.map((subRoute) => (
                <React.Fragment key={subRoute.title}>
                  <SubRoute
                    {...subRoute}
                    isActive={router.pathname === subRoute.url}
                  />
                </React.Fragment>
              ))}
            </List>
            <Typography
              fontWeight={700}
              fontSize={14}
              lineHeight={"20px"}
              color={"primary"}
              my={2}
            >
              {OrdersRoutes.title}
            </Typography>
            <List sx={{ p: 0 }}>
              {OrdersRoutes?.subRoutes?.map((subRoute) => (
                <React.Fragment key={subRoute.title}>
                  <SubRoute
                    {...subRoute}
                    isActive={router.pathname === subRoute.url}
                  />
                </React.Fragment>
              ))}
            </List>
          </Stack>
          <Stack
            component={Paper}
            elevation={0}
            p={2}
            flexGrow={1}
            borderRadius={2}
            maxWidth={{
              xs: "100%",
              sm: "calc(100% - 250px)",
            }}
          >
            {children}
          </Stack>
        </Stack>
      </Container>
      <DefaultFooter />
    </Stack>
  );
}
