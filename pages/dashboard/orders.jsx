import React from "react";
import ControlBar from "../../sdk/components/ControlBar";
import NavbarDashboard from "../../sdk/components/NavbarDashboard";
// import TabsNavItems from "../../sdk/components/TabsNavItems";
import TabsNavOrders from "../../sdk/components/orders/TabsNavOrders";
export default function items() {
  return (
    <div>
      <NavbarDashboard />
      <ControlBar />
      {/* <TabsNavItems item1={"Vegetables"} item2={"Fruits"} item3={"Others"} /> */}
      <TabsNavOrders />
    </div>
  );
}
