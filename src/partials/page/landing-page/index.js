import { useClientKey } from "@/hooks/useClientKey";
import Header from "./header";
import { Stack } from "@mui/material";
import Architecture from "./Architecture";
import DefaultFooter from "@/partials/footer/default";
// import Benefit from "./Benefit";
import BackToTop from "@/components/ui/BackToTop";
import OutstandingProducts from "./OutstandingProducts";
// import Blog from "./Blog";

const Landing = ({ products, brands, testimonials }) => {
  useClientKey();
  return (
    <Stack
      width="100%"
      minHeight="100vh"
      sx={{
        backgroundColor: "#FFFFFF",
      }}
      component={"main"}
    >
      <Header />
      <Architecture brands={brands} />
      {/* <Benefit /> */}
      <OutstandingProducts products={products} />
      {/* <Blog testimonials={testimonials} /> */}
      <DefaultFooter forceShow />
      <BackToTop />
    </Stack>
  );
};

export default Landing;
