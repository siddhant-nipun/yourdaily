import React, { useMemo, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { baseurl } from "../../utility/auth";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styles from "/styles/BookingNSGraph.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { format } from "date-fns";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BookingNSGraph() {
  const [location, setLocation] = useState("");
  const [Bnschart, setBnschart] = useState([]);
  const [days, setDays] = useState("14");
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `${baseurl}/api/store-manager/dashboard/nsg/${days}`,
          {
            method: "GET",
            headers: {
              "content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const responseCharData = await response.json();
        setBnschart(responseCharData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [days]);

  const { date, now, Scheduled } = useMemo(() => {
    return {
      date: Bnschart.map((item) => {
        return format(new Date(item.date), "dd/mm");
      }),
      now: Bnschart.map((item) => {
        return item.nowOrders;
      }),
      scheduled: Bnschart.map((item) => {
        return item.scheduledOrders;
      }),
    };
  }, [Bnschart]);
  const options = {
    response: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "",
      },
    },
  };
  const data = {
    labels: date,
    datasets: [
      {
        label: "Now",
        data: now,
        backgroundColor: "#6AFF6A",
      },
      {
        label: "Scheduled",
        data: Scheduled,
        backgroundColor: "#FF8383",
      },
    ],
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.barContainer}>
          <div className={styles.bookingformWrapper}>
            <FormControl className={styles.locationSelectorForm}>
              <InputLabel id="AllLocation">All location</InputLabel>
              <Select
                labelId="AllLocation"
                id="AllLocation"
                value={location}
                label="AllLocation"
                onChange={(event) => {
                  setLocation(event.target.value);
                }}
              >
                <MenuItem value={1}>Location 1</MenuItem>
                <MenuItem value={2}>Location 2</MenuItem>
                <MenuItem value={3}>Location 3</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={styles.daysSelectorForm}>
              <InputLabel id="Days">Days</InputLabel>
              <Select
                labelId="Days"
                id="Days"
                value={days}
                label="Days"
                onChange={(e) => {
                  setDays(e.target.value);
                }}
              >
                <MenuItem value={14}>Last 14 Days</MenuItem>
                <MenuItem value={30}>Last 30 Days</MenuItem>
                <MenuItem value={60}>2 Months</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={styles.barGraph}>
            <Bar options={options} data={data} />
          </div>
        </div>
      </div>
    </>
  );
}
