import React from "react";
import ControlBar from "../../sdk/components/ControlBar";
import NavbarDashboard from "../../sdk/components/NavbarDashboard";
import TabsNav from "../../sdk/components/TabsNav";
export default function items() {
  return (
    <div>
      <NavbarDashboard />
      <ControlBar heading={"Items"} />
      <TabsNav />
    </div>
  );
}
