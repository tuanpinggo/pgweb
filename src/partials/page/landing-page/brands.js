import { LandingBrands } from "@/constants";
import { Paper, Stack } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import Image from "next/image";

export default function BrandList({ datas }) {
  return (
    <>
      <Grid container spacing={2}>
        {datas.length > 0 &&
          datas
            ?.filter((item) => LandingBrands.includes(item?.id))
            ?.slice(0, 12)
            .map((item) => (
              <Grid xs={6} md={3} key={item.id}>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  border="1px solid #eee"
                  borderRadius={1.5}
                  py={1}
                  mb={1}
                  className="boxHover"
                >
                  <Image
                    src={item?.image || "/brand-default.png"}
                    width={128}
                    height={60}
                    alt={item.name}
                  />
                </Stack>
              </Grid>
            ))}
      </Grid>
    </>
  );
}
