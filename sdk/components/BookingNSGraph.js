import React, { useMemo, useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { baseurl } from "../../utility/auth";
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
      <div>
        my chart
        <Bar options={options} data={data} />
      </div>
    </>
  );
}
