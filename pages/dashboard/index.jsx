import { useState, React, useEffect } from "react";
import Button from "@mui/material/Button";
import styles from "/styles/dashboard.module.scss";
import { baseurl } from "../../utility/auth";
import BookingGraph from "../../sdk/components/BookingGraph";
import NavbarDashboard from "../../sdk/components/NavbarDashboard";
import { useRouter } from "next/router";

export default function ButtonAppBar() {
  const router = useRouter();
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
      link: "/dashboard/details",
    },
    {
      id: 2,
      heading: "Total Delivery Boy",
      digits: dashboardData?.deliveryBoyCount,
      footer: "View Details",
      link: "/dashboard/details",
    },
    {
      id: 3,
      heading: "Total User",
      digits: dashboardData?.userCount,
      footer: "View Details",
      link: "/dashboard/details",
    },
    {
      id: 4,
      heading: "Unassigned Orders",
      digits: dashboardData?.unassignedOrders,
      footer: "View Details",
      link: "/dashboard",
    },
    {
      id: 5,
      heading: "Total Items",
      digits: dashboardData?.totalItems,
      footer: "View Details",
      link: "/dashboard/items",
    },
    {
      id: 6,
      heading: "Total Active Users",
      desp: "(Past 10 days order)",
      digits: dashboardData?.activeUsers,
      link: "/dashboard",
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
      link: "/dashboard",
    },
    {
      id: 10,
      heading: "Schedules order",
      digits: dashboardData?.scheduledOrder,
      footer: "View Details",
      link: "/dashboard",
    },
  ];

  return (
    <div className={styles.maincontainer}>
      <NavbarDashboard />
      {/* Dashboard cards starts-- */}
      <div className={styles.container}>
        <div className={styles.firstContainer}>
          <div className={styles.cardswrapper}>
            {cardData.map(({ id, heading, desp, digits, footer, link }) => (
              <div className={styles.card} key={id.toString()}>
                <div>
                  <h3>{heading}</h3>
                  {desp && <h5>{desp}</h5>}
                  <h2>{digits}</h2>
                </div>
                {footer && (
                  <Button
                    className={styles.viewButton}
                    variant="contained"
                    onClick={() => {
                      router.push(link);
                    }}
                  >
                    {footer}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Dashboard card conatiner ends-- */}
        <div>
          <BookingGraph
            chartHeading={"Accepted and Denied Bookings Graph"}
            apiFolder={"adg"}
            graphvar1={"Accepted"}
            graphvar2={"Denied"}
            key1={"acceptedOrders"}
            key2={"declinedOrders"}
          />
          <BookingGraph
            chartHeading={"Bookings (Now vs Scheduled)"}
            apiFolder={"nsg"}
            graphvar1={"Now"}
            graphvar2={"Scheduled"}
            key1={"nowOrders"}
            key2={"scheduledOrders"}
          />
        </div>
      </div>
    </div>
  );
}
