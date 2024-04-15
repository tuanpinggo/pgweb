import { useRouter } from "next/router";
import { IconButton, Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const HomeButton = ({ url, src, title, icon }) => {
  const router = useRouter();

  return (
    <Link href={url}>
      <Stack spacing={0}>
        <IconButton>
          {!!icon ? (
            icon
          ) : (
            <Image src={src} width={26} height={26} alt="logo" />
          )}
        </IconButton>
        <Typography
          fontSize={12}
          fontWeight={400}
          lineHeight={"16px"}
          variant="body2"
          color={router.pathname.startsWith(url) ? "primary.main" : "#A9A9A9"}
          display={{ xs: "block", sm: "none" }}
        >
          {title}
        </Typography>
      </Stack>
    </Link>
  );
};

export default HomeButton;
