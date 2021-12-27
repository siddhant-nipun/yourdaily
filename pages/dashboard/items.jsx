import React from "react";
import ControlBar from "../../sdk/components/ControlBar";
import NavbarDashboard from "../../sdk/components/NavbarDashboard";
import TabsNavItems from "../../sdk/components/TabsNavItems";
export default function items() {
  return (
    <div>
      <NavbarDashboard />
      <ControlBar heading={"Items"} />
      <TabsNavItems item1={"Vegetables"} item2={"Fruits"} item3={"Others"} />
    </div>
  );
}
