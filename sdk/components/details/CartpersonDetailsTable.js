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
import Button from "@mui/material/Button";
import CartpersonDialog from "./CartpersonDialog";
import { RowingRounded } from "@mui/icons-material";

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
          `${baseurl}/api/store-manager/dashboard/staff/cart-boy`,
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

  const [dialog, setdialog] = useState({
    open: false,
    data: null,
  });

  const handleDialog = (item) => {
    setdialog({
      open: true,
      data: item,
    });
  };

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
                Name
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Contact
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Registration <br /> Date
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Total <br /> Orders
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Denied
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Cancel
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Total <br /> Bussiness
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Average <br /> Rating
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Flagged
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.name} sx={{ " td,  th": { border: 1 } }}>
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell className={styles.eachOrangeCell} align="center">
                  <Button
                    onClick={() => {
                      handleDialog(row);
                    }}
                  >
                    {row.name}
                  </Button>
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.contact}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.regDate}
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
                <TableCell className={styles.eachGreenCell} align="center">
                  ₹{row.totalAmount}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.avgRating}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.flagged}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CartpersonDialog
        dialogState={dialog.open}
        row={dialog.data}
        onClose={() => {
          setdialog({ open: false, data: null });
        }}
      />
    </div>
  );
}
