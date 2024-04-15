import React from "react";

import WaitingOrders from "./WaitingOrders";
import Events from "./Events";
import Promotions from "./Promotions";
import RepresentativeProducts from "./RepresentativeProducts";

const Home = () => {
  return (
    <React.Fragment>
      <Promotions />
      <WaitingOrders />
      <Events />
      <RepresentativeProducts />
    </React.Fragment>
  );
};

export default Home;
