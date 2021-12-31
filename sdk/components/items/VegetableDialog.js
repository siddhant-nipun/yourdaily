import React, { useState, useEffect, useCallback } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import styles from "../../../styles/VegetableDialog.module.scss";
import Input from "@mui/material/Input";
import { useRouter } from "next/router";
import { baseurl } from "../../../utility/auth";

export default function FormDialog({ renderFunc }) {
  const router = useRouter();

  const [name, setname] = useState("");
  const [price, setprice] = useState(Number(""));
  const [baseQty, setbaseQty] = useState("");
  const [imageId, setImageId] = useState("");
  const [mrp, setmrp] = useState(Number(""));
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // post request
  const handleSubmit = React.useCallback(
    (event) => {
      console.log("ADD is working");
      // event.preventDefault();
      (async () => {
        try {
          const fetchData = await fetch(`${baseurl}/api/store-manager/item/`, {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify({
              category: 1,
              name,
              price: Number(price),
              inStock: true,
              baseQuantity: baseQty,
              imageId: imageId,
              strikeThroughPrice: Number(mrp),
            }),
          });
          const res = await fetchData.json();
          console.log(res);
          // console.log(fetchData);
          if (fetchData.status === 201) {
            console.log("hi");
            // debugger;
            renderFunc();
          }
        } catch (error) {
          console.log(error);
        }
        setOpen(false);
        // router.reload();
      })();
    },
    [name, price, baseQty, imageId, mrp, renderFunc]
  );
  // useEffect(() => {
  //   renderFunc;
  // }, []);

  const uplaoding = React.useCallback(async (image) => {
    try {
      const formData = new FormData();
      formData.append("item", image);
      const response = await fetch(`${baseurl}/api/store-manager/image/item`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("token"),
        },
        body: formData,
      });
      const res = await response.json();
      console.log(res.imageId);
      setImageId(res.imageId);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Button variant="text" onClick={handleClickOpen}>
          + Add new items
        </Button>
        <Dialog open={open} onClose={handleClose}>
          {/* <DialogTitle>Subscribe</DialogTitle> */}
          <DialogContent>
            <DialogContentText>
              {/* To subscribe to this website, please enter your email address here.
            We will send updates occasionally. */}
            </DialogContentText>
            <div className={styles.mainContainer}>
              <div className={styles.leftContainer}>
                <h4>Vegetable Name</h4>
              </div>
              <div className={styles.rightContainer}>
                <TextField
                  id="outlined-basic"
                  // placeholder="Enter name"
                  variant="outlined"
                  name="name"
                  onChange={(e) => {
                    setname(e.target.value);
                  }}
                />
              </div>
              <div className={styles.leftContainer}>
                <h4>Base Qty</h4>
              </div>
              <div className={styles.rightContainer}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="baseQty"
                  onChange={(e) => {
                    setbaseQty(e.target.value);
                  }}
                />
              </div>
              <div className={styles.leftContainer}>
                <h4>Price</h4>
              </div>
              <div className={styles.rightContainer}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="price"
                  onChange={(e) => {
                    setprice(e.target.value);
                  }}
                />
              </div>
              <div className={styles.leftContainer}>
                <h4>MRP</h4>
              </div>
              <div className={styles.rightContainer}>
                <TextField
                  id="outlined-basic"
                  variant="outlined"
                  name="mrp"
                  onChange={(e) => {
                    setmrp(e.target.value);
                  }}
                />
              </div>
              <div className={styles.leftContainer}>
                <h4>Upload Image</h4>
              </div>
              <div className={styles.rightContainer}>
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  //   sx={{ visibility: "hidden" }}
                  type="file"
                  name="image"
                  onChange={(e) => {
                    uplaoding(e.target.files[0]);
                  }}
                />
                {/* <Button
                  variant="contained"
                  component="span"
                  sx={{ marginLeft: "8rem" }}
                >
                  Upload
                </Button> */}
              </div>
            </div>
          </DialogContent>
          <DialogActions className={styles.center}>
            <Button variant="contained" onClick={handleSubmit}>
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </form>
  );
}
