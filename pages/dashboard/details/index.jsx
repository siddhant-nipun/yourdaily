import React from "react";
import NavbarDashboard from "../../../sdk/components/NavbarDashboard";
import TabsNavDetails from "../../../sdk/components/details/TabsNavDetails";
export default function items() {
  return (
    <div>
      <NavbarDashboard />
      <TabsNavDetails
        item1={"Cart Person"}
        value1={"1"}
        item2={"Delivery Boy"}
        value2={"2"}
        item3={"User"}
        value3={"3"}
      />
    </div>
  );
}
