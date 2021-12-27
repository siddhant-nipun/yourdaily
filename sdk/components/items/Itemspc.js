import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "../../../styles/ItemsTable.module.scss";
import { useRouter } from "next/router";
import { baseurl } from "../../../utility/auth";
import { Checkbox } from "@mui/material";
const headings = [
  "S.No",
  "Image",
  "Fruits Name",
  "Base Qty.",
  "Price(per base Qty)",
  "Stock",
];
export default function Totalfruits({ type, onChange }) {
  const router = useRouter();
  const [data, setData] = React.useState([]);
  const [isOpenCartPersonDetails, setIsOpenCartPersonDetails] =
    React.useState(false);
  const [vegeData, setVegeData] = React.useState({});
  const [isChecked, setIsChecked] = React.useState(false);
  const getdata = async () => {
    try {
      const fetchedData = await fetch(`${baseurl}/api/store-manager/item`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const fetchingData = await fetchedData.json();
      setData(fetchingData);
      console.log(fetchingData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getdata();
  }, [vegeData]);
  const handleChangeCheckbox = async (row) => {
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
            category: row.categoryID,
            imageId: row.id,
            inStock: !row.inStock,
            name: row.name,
            price: row.price,
            strikeThroughPrice: row.price,
            baseQuantity: row.baseQuantity,
          }),
        }
      );
      const fetchedData = await response.json();
      setVegeData(fetchedData);
      console.log("Hello" + vegeData);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <div className={styles.wholeContainer}>
        <TableContainer
          sx={{
            borderRadius: "20px",
          }}
          component={Paper}
        >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow
                sx={{ backgroundColor: "#FF0000 0% 0% no-repeat padding-box" }}
              >
                {headings.map((one, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    sx={{
                      color: `#707070`,
                      background: "#F88A124D 0% 0% no-repeat padding-box",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    {one}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, index) => (
                <TableRow
                  key={index}
                  // sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  {/* <TableCell align="center" component="th" scope="row">
                    {row.id}
                  </TableCell> */}
                  <TableCell
                    align="center"
                    sx={{
                      color: "#F88A12",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#777777",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    <img
                      src={row.itemImageLinks[0]}
                      style={{ width: "83px", height: "62px" }}
                    />
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#777777",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#F88A12",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    {row.baseQuantity}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#FF0000",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    {row.price}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color: "#4612F8",
                      borderRight: "1px solid rgba(224,224,224,1)",
                    }}
                  >
                    <Checkbox
                      defaultChecked={row.inStock}
                      checked={row.inStock}
                      onChange={() => {
                        handleChangeCheckbox(row);
                      }}
                      inputProps={{ "aria-label": "controlled" }}
                    />
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
