// import React from "react";
// import styles from "../../../styles/TabsNavOrders.module.scss";

// export default function TabsNavOrders() {
//   return (
//     <div className={styles.wholeContainer}>
//       <div className={styles.mainContainer}>
//         <div className={styles.tabsContainer}>
//           <div className={styles.tabsWrapper}>
//             <div className={styles.individualTab}>Denied Order</div>
//             <div className={styles.individualTab}>Disputed Order</div>
//             <div className={styles.individualTab}>Scehduled Order</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import styles from "../../../styles/TabsNavOrders.module.scss";
import DisputedOrderTable from "./DisputedOrderTable";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.mainContainer}>
        <Box sx={{ width: "100%" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Denied Order" {...a11yProps(0)} />
              <Tab label="Disputed Order" {...a11yProps(1)} />
              <Tab label="Scheduled Order" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {/* <DisputedOrderTable /> */}
          </TabPanel>
          <TabPanel value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel value={value} index={2}>
            Item Three
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
