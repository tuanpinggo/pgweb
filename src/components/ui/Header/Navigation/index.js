import { Typography, Stack, Button } from "@mui/material";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { PublicRoutes, HomeRoutes } from "@/constants/authenticated-routes";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks/useAuth";

const Navigation = () => {
  const router = useRouter();
  const { userData } = useAuth();

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      sx={{
        display: {
          xs: "none",
          sm: "flex",
        },
      }}
      flexShrink={0}
      spacing={2}
    >
      <Link
        href={"/"}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image src="/logo/logo.svg" alt="logo" width={130} height={22} />
      </Link>
      {!!userData &&
        [
          ...HomeRoutes.subRoutes,
          ...PublicRoutes.subRoutes,
          {
            title: "Nhận đơn",
            url: "/sales/receive",
          },
        ]?.map((route) => (
          <Link
            key={route.url}
            href={route.url}
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Button
              sx={{
                textTransform: "none",
              }}
            >
              <Typography
                fontSize={16}
                fontWeight={500}
                lineHeight={"24px"}
                {...(router.pathname === route.url
                  ? {
                      color: "primary",
                    }
                  : {})}
              >
                {route.title}
              </Typography>
            </Button>
          </Link>
        ))}
    </Stack>
  );
};

export default Navigation;
