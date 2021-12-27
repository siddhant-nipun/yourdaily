import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import styles from "/styles/TabsNavItems.module.scss";
import Box from "@mui/material/Box";
import CartpersonDetailsTable from "./CartpersonDetailsTable";
import UsersDetails from "./UsersDetails";
import ControlBarDetails from "./ControlBarDetails";

export default function LabTabs(props) {
  const [value, setValue] = React.useState("1");
  // const [item, setitem] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <ControlBarDetails
        heading={
          value === "1"
            ? props.item1
            : value === "2"
            ? props.item2
            : props.item3
        }
      />
      <div className={styles.mainContainer}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              className={styles.centerContainer}
              sx={{ border: 1, borderRadius: "10px", borderColor: "divider" }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label={props.item1} value="1" />
                <Tab label={props.item2} value="2" />
                <Tab label={props.item3} value="3" />
              </TabList>
            </Box>
            <div className={styles.centerContainer}>
              <TabPanel value={props.value1}>
                <CartpersonDetailsTable />
              </TabPanel>
              <TabPanel value={props.value2}>
                <CartpersonDetailsTable />
              </TabPanel>
              <TabPanel value={props.value3}>
                <UsersDetails />
              </TabPanel>
            </div>
          </TabContext>
        </Box>
      </div>
    </>
  );
}
