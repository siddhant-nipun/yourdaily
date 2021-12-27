import { React, useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
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
        const fetchData = await fetch(`${baseurl}/api/store-manager/item`, {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        });
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
                S.No
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Image
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                VegetablesName
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Base Qty.
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                Price <br />
                (per base Qty)
              </TableCell>
              <TableCell className={styles.eachHeadCell} align="center">
                In Stock
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.name} sx={{ " td,  th": { border: 1 } }}>
                {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
                <TableCell className={styles.eachCell} align="center">
                  {index + 1}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  <img src={row.itemImageLinks[0]} />
                </TableCell>
                <TableCell className={styles.eachNameCell} align="center">
                  {row.name}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {row.baseQuantity}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  ₹{row.price}
                </TableCell>
                <TableCell className={styles.eachCell} align="center">
                  {
                    <Checkbox
                      // defaultChecked={checked}
                      checked={row.inStock}
                      onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}