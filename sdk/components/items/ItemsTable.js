import { React, useCallback, useEffect, useState } from "react";
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
import { useRouter } from "next/router";
import VegetableDialog from "./VegetableDialog";
import NavbarDashboard from "../NavbarDashboard";
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
  const router = useRouter();
  const [data, setData] = useState([]);
  // const updateData = (id, status) => {
  //   data.map((item) => {
  //     if (item.id === id) {
  //       item.inStock = status;
  //     }
  //   });
  // };
  //-----GET Request------
  const fetchData = useCallback(async () => {
    try {
      const res = await fetch(`${baseurl}/api/store-manager/item`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const reponseData = await res.json();
      setData(reponseData);
    } catch (error) {
      console.log(error);
    }
  }, []);
  useEffect(() => {
    fetchData();
  }, []);

  // {
  //   <VegetableDialog renderFunc={fetchData} />
  // }

  // const [checked, setChecked] = useState(true);
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };

  //--------PUT Request-------
  const handleChangeCheck = async (row) => {
    try {
      const response = await fetch(
        `${baseurl}/api/store-manager/item/${row.id}`,
        {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            category: 1,
            imageId: row.imageId,
            inStock: !row.inStock,
            name: row.name,
            price: row.price,
            strikeThroughPrice: row.strikeThroughPrice,
            baseQuantity: row.baseQuantity,
          }),
        }
      );
      const res = await response.json();
      console.log(response);
      if (response.status === 201) {
        // console.log("hi");
        fetchData();
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className={styles.contain}>
        <a className={styles.back} href="#">
          <h3
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Back
          </h3>
        </a>
        <a className={styles.heading} href="#">
          <h3>Items</h3>
        </a>
        <a className={styles.add} href="#">
          {/* <p>+ Add New {props.heading}</p> */}
          <VegetableDialog renderFunc={fetchData} />
        </a>
      </div>
      <div className={styles.mainContainer}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 1000 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ " td,  th": { border: 1 } }}>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>S.No</h4>
                </TableCell>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>Image</h4>
                </TableCell>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>VegetablesName</h4>
                </TableCell>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>Base Qty.</h4>
                </TableCell>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>
                    Price <br />
                    (per base Qty)
                  </h4>
                </TableCell>
                <TableCell className={styles.eachHeadCell} align="center">
                  <h4>In Stock</h4>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow key={row.id} sx={{ " td,  th": { border: 1 } }}>
                  <TableCell className={styles.eachCell} align="center">
                    {index + 1}
                  </TableCell>
                  <TableCell className={styles.eachImageCell} align="center">
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
                        checked={row.inStock}
                        onChange={() => {
                          handleChangeCheck(row);
                        }}
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
    </>
  );
}
