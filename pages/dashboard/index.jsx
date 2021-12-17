import { useState, React, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import styles from "/styles/dashboard.module.scss";
import LogoutIcon from "@mui/icons-material/Logout";
import { baseurl } from "../../utility/auth";
import BookingNSGraph from "../../sdk/components/BookingNSGraph";

export default function ButtonAppBar() {
  const [dashboardData, setdashboardData] = useState();

  useEffect(() => {
    (async () => {
      try {
        let response = await fetch(
          `${baseurl}/api/store-manager/dashboard/stats`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const result = await response.json();
        setdashboardData(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  let cardData = [
    {
      id: 1,
      heading: "Total Card Person",
      digits: dashboardData?.cartBoyCount,
      footer: "View Details",
    },
    {
      id: 2,
      heading: "Total Delivery Boy",
      digits: dashboardData?.deliveryBoyCount,
      footer: "View Details",
    },
    {
      id: 3,
      heading: "Total User",
      digits: dashboardData?.userCount,
      footer: "View Details",
    },
    {
      id: 4,
      heading: "Unassigned Orders",
      digits: dashboardData?.unassignedOrders,
      footer: "View Details",
    },
    {
      id: 5,
      heading: "Total Items",
      digits: dashboardData?.totalItems,
      footer: "View Details",
    },
    {
      id: 6,
      heading: "Total Active Users",
      desp: "(Past 10 days order)",
      digits: dashboardData?.activeUsers,
    },
    {
      id: 7,
      heading: "Total Ongoining Bookings",
      digits: dashboardData?.onGoingOrder,
    },
    {
      id: 8,
      heading: "Past Week Bookings",
      digits: dashboardData?.bookingForLastWeek,
    },
    {
      id: 9,
      heading: "Denied/ Disputed order",
      digits: `${dashboardData?.deniedOrder} / ${dashboardData?.disputedOrder}`,
      footer: "View Details",
    },
    {
      id: 10,
      heading: "Schedules order",
      digits: dashboardData?.scheduledOrder,
      footer: "View Details",
    },
  ];

  return (
    <div className={styles.maincontainer}>
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
      {/* Dashboard cards starts-- */}
      <div className={styles.firstContainer}>
        <div className={styles.cardswrapper}>
          {cardData.map(({ id, heading, desp, digits, footer }) => (
            <div className={styles.card} key={id.toString()}>
              <div>
                <h3>{heading}</h3>
                {desp && <h5>{desp}</h5>}
                <h2>{digits}</h2>
              </div>
              {footer && (
                <Button className={styles.viewButton} variant="contained">
                  {footer}
                </Button>
              )}
            </div>
          ))}
        </div>
      </div>
      {/* Dashboard card conatiner ends-- */}
      <div>
        <BookingNSGraph />
      </div>
    </div>
  );
}
