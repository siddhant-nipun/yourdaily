import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/ItemsTable.module.scss";
import { baseurl } from "../../../utility/auth";

// function createData(Sno, image, name, baseqty, price, stock) {
//   return { Sno, image, name, baseqty, price, stock };
// }

// const rows = [
//   createData(1, "img1", "Capsicum", "1000g", "Rs. 20"),
//   createData(2, "img2", "Lady Finger", "1000g", "Rs. 20/kg"),
//   createData(3, "img3", "Potato", "1000g", "Rs. 20/kg"),
//   createData(4, "img4", "Capsicum", "1000g", "Rs. 20/kg"),
//   createData(5, "img5", "Capsicum", "1000g", "Rs. 20"),
// ];

export default function BasicTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchData = await fetch(
          `${baseurl}/api/store-manager/dashboard/user/details`,
          {
            method: "GET",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const reponseData = await fetchData.json();
        setData(reponseData);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={styles.mainContainer}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 1000 }} aria-label="simple table">
          <TableHead>
            <TableRow sx={{ " td,  th": { border: 1 } }}>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Name</h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Contact</h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Primary Location</h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>
                  Total <br /> Orders
                </h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Denied</h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Cancel</h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>
                  Average <br /> Rating
                </h4>
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                <h4>Flagged</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id} sx={{ " td,  th": { border: 1 } }}>
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell className={styles.eachOrangeCell} align="center">
                  {row.name}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.contact}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.defaultAddress}
                </TableCell>
                <TableCell className={styles.eachOrangeCell} align="center">
                  {row.totalOrders}
                </TableCell>
                <TableCell className={styles.eachRedCell} align="center">
                  {row.deniedOrders}
                </TableCell>
                <TableCell className={styles.eachBlueCell} align="center">
                  {row.canceledOrders}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.avgRating}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.flagCount}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
