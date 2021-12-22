import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "/styles/TabsNav.module.scss";
import Box from "@mui/material/Box";
import ItemsVegetables from "./items/ItemsVegetables";
import ItemsTable from "./items/ItemsTable";
import Itemspc from "./items/Itemspc";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.mainContainer}>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box
            className={styles.centerContainer}
            sx={{ border: 1, borderRadius: "10px", borderColor: "divider" }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Vegetables" value="1" />
              <Tab label="Fruits" value="2" />
              <Tab label="Others" value="3" />
            </TabList>
          </Box>
          <div className={styles.centerContainer}>
            <TabPanel value="1">
              {/* <ItemsVegetables /> */}
              <ItemsTable />
            </TabPanel>
            <TabPanel value="2">Fruits</TabPanel>
            <TabPanel value="3">
              <Itemspc />
            </TabPanel>
          </div>
        </TabContext>
      </Box>
    </div>
  );
}
