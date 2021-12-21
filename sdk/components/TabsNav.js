import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "/styles/TabsNav.module.scss";

export default function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.mainContainer}>
      <div>
        <TabContext className={styles.centerContainer} value={value}>
          <div>
            <TabList
              className={styles.centerContainer}
              onChange={handleChange}
              aria-label="lab API tabs example"
            >
              <Tab label="Vegetables" value="1" />
              <Tab label="Fruits" value="2" />
              <Tab label="Others" value="3" />
            </TabList>
          </div>
          <div>
            <TabPanel value="1">Item One</TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </div>
        </TabContext>
      </div>
    </div>
  );
}
