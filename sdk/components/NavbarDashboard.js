import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "/styles/navbarDashboard.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";

export default function navbarDashboard() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <div className={styles.navbar}>
            <div className={styles.navbarleft}>
              <div className={styles.ydlogo}>
                <img src="/assets/ydlogodash.svg" alt="This is a yd logo" />
              </div>
              <h3 component="div" sx={{ flexGrow: 1 }}>
                Dashboard
              </h3>
            </div>
            <div className={styles.navbarright}>
              <Button color="inherit">
                <img src="/assets/usericon.svg" alt="user icon" />
              </Button>
              <Button color="inherit">
                <LogoutIcon fontSize="medium" />
              </Button>
            </div>
          </div>
        </AppBar>
      </Box>
    </div>
  );
}
