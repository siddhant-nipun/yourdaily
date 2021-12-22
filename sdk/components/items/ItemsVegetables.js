import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import tick from "../../../public/assets/iconCheckboxTick.svg";
import untick from "../../../public/assets/iconCheckboxUntick.svg";
function createData(Sno, image, name, baseqty, price, stock) {
  return { Sno, image, name, baseqty, price, stock };
}

const rows = [
  createData(1, "img1", "Capsicum", "1000g", "Rs. 20"),
  createData(2, "img2", "Lady Finger", "1000g", "Rs. 20/kg"),
  createData(3, "img3", "Potato", "1000g", "Rs. 20/kg"),
  createData(4, "img4", "Capsicum", "1000g", "Rs. 20/kg"),
  createData(5, "img5", "Capsicum", "1000g", "Rs. 20"),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 1200 }} aria-label="simple table">
        <TableHead>
          <TableRow sx={{ " td,  th": { border: 2 } }}>
            <TableCell align="left">S.No</TableCell>
            <TableCell align="left">Image</TableCell>
            <TableCell align="center">VegetablesName</TableCell>
            <TableCell align="right">Base Qty.</TableCell>
            <TableCell align="right">`Price (per base Qty)`</TableCell>
            <TableCell align="right">In Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name} sx={{ " td,  th": { border: 1 } }}>
              {/* <TableCell component="th" scope="row">
                {row.name}
              </TableCell> */}
              <TableCell align="left">{row.Sno}</TableCell>
              <TableCell align="left">{row.image}</TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.baseqty}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.stock}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
