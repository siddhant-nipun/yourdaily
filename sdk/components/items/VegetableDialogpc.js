import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Button, Input, TextField } from "@mui/material";
import styles from "../../styles/addNewItems.module.scss";
import { Form, useFormik } from "formik";
import { baseurl } from "../../../utility/auth";
import { useRouter } from "next/router";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
function SimpleDialogAddNewItem(props) {
  const { onClose, selectedValue, open } = props;
  // const [values, setValues] = React.useState({
  //   fruitsName: "",
  //   baseQty: false,
  //   price: "",
  //   mrp: "",
  // });
  const [category, setCategory] = React.useState("none");
  const [name, setName] = React.useState("");
  const [baseQty, setBaseQty] = React.useState("1 Unit");
  const [price, setPrice] = React.useState(Number(""));
  const [mrp, setMrp] = React.useState(Number(""));
  const [imageID, setImageID] = React.useState();
  const handleClose = () => {
    onClose(selectedValue);
  };
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const router = useRouter();
  // const validate = React.useCallback((values) => {
  //   const errors = {};
  //   if (values.fruitsName === "") errors.fruitsName = "Add a fruisName";
  //   if (values.baseQty === "") errors.baseQty = "Add a baseQty";
  //   if (values.price === "") errors.price = "Add a price";
  //   if (values.mrp === "") errors.mrp = "Add a mrp";
  //   // console.log(errors);
  //   return errors;
  // }, []);
  // const form = useFormik({
  //   initialValues: {
  //     fruitsName: "",
  //     baseQty: "",
  //     price: "",
  //     mrp: "",
  //   },
  //   validate,
  //   onSubmit: async (values) => {
  //     console.log("Hii there..");
  //     console.log(values);
  //     // const dataValues = {
  //     //     "category":values.category,
  //     //     "name":values.fruitsName,
  //     //     "price":values.price,
  //     //     "inStock":true,
  //     //     "baseQuantity":"1 Unit",
  //     //     "imageId":52
  //     // }
  //   },
  // });
  // React.useEffect(() => {
  //   (async () => {
  //     try {
  //       const result = await fetch(`${baseurl}/api/store-manager/image/item`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "Multipart/form-data",
  //           Authorization: localStorage.getItem("JWTsessionToken"),
  //         },
  //         body: JSON.stringify({
  //           item: form.values.pic,
  //         }),
  //       });
  //       const response = await result.json();
  //       setImageID(response);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   })();
  // }, [form.values.pic]);
  const handleSubmit = React.useCallback(
    (event) => {
      console.log("ADD button is Working");
      event.preventDefault();
      (async () => {
        try {
          const result = await fetch(`${baseurl}/api/store-manager/item`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("JWTsessionToken"),
            },
            body: JSON.stringify({
              category,
              name,
              price: Number(price),
              inStock: true,
              baseQuantity: baseQty,
              imageId: imageID,
              strikeThroughPrice: null,
            }),
          });
          const res = await result.json();
          console.log(res);
          debugger;
          if (res.categoryID === 1) {
            router.push("./vegetables");
          }
          if (res.categoryID === 2) {
            router.reload();
          }
          if (res.categoryID === 3) {
            router.push("./others");
          }
        } catch (error) {
          console.log(error);
        }
      })();
    },
    [name, price, baseQty, imageID]
  );
  const uplaoding = React.useCallback(async (image) => {
    try {
      const formData = new FormData();
      formData.append("item", image);
      const response = await fetch(`${baseurl}/api/store-manager/image/item`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("JWTsessionToken"),
        },
        body: formData,
      });
      const res = await response.json();
      console.log(res.imageId);
      setImageID(res.imageId);
    } catch (error) {
      console.log(error);
    }
  }, []);
  // same thing we could have achieved through the use of useEffect, in it we just need to provide ;()()...but in useCallback same thing has been achived by directly
  // callling the useCallback function
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Dialog onClose={handleClose} open={open}>
          <div className={styles.Contain}>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>Category Name</div>
              <Select
                // labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                // label="Category"
                onChange={handleChangeCategory}
              >
                <MenuItem value={"none"}>Select Category</MenuItem>
                <MenuItem value={1}>Vegetables</MenuItem>
                <MenuItem value={2}>Fruits</MenuItem>
                <MenuItem value={3}>Others</MenuItem>
              </Select>
            </div>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>Name</div>
              <TextField
                id="outlined-basic"
                placeholder="Enter name"
                variant="outlined"
                name="Name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                // value={form.values.fruitsName}
                // onChange={form.handleChange}
                // onBlur={form.handleBlur}
                // error={
                //   form.touched.fruitsName && Boolean(form.errors.fruitsName)
                // }
              />
            </div>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>Base Qty</div>
              <TextField
                id="outlined-basic"
                placeholder="Enter Base Qty"
                variant="outlined"
                name="baseQty"
                value={baseQty}
                onChange={(e) => {
                  setBaseQty(e.target.value);
                }}
                // value={form.values.baseQty}
                // onChange={form.handleChange}
                // onBlur={form.handleBlur}
                // error={form.touched.baseQty && Boolean(form.errors.baseQty)}
              />
            </div>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>Price</div>
              <TextField
                id="outlined-basic"
                placeholder="Enter Price"
                variant="outlined"
                type="number"
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                // value={form.values.price}
                // onChange={form.handleChange}
                // onBlur={form.handleBlur}
                // error={form.touched.price && Boolean(form.errors.price)}
              />
            </div>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>MRP</div>
              <TextField
                id="outlined-basic"
                placeholder="Enter MRP"
                variant="outlined"
                name="mrp"
                value={mrp}
                type="number"
                onChange={(e) => {
                  setMrp(e.target.value);
                }}
                // value={form.values.mrp}
                // onChange={form.handleChange}
                // onBlur={form.handleBlur}
                // error={form.touched.mrp && Boolean(form.errors.mrp)}
              />
            </div>
            <div className={styles.fruitContainer}>
              <div className={styles.left}>Upload Image</div>
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/png, image/gif, image/jpeg"
                  id="contained-button-file"
                  multiple
                  sx={{ visibility: "hidden" }}
                  type="file"
                  name="pic"
                  onChange={(e) => {
                    uplaoding(e.target.files[0]);
                  }}
                />
                <Button
                  variant="contained"
                  component="span"
                  sx={{ marginLeft: "8rem" }}
                >
                  Upload
                </Button>
              </label>
            </div>
            <hr color="#F88A12"></hr>
            <Button
              variant="contained"
              component="span"
              sx={{
                display: "flex",
                justifyContent: "center",
                marginLeft: "13rem",
                marginRight: "15rem",
              }}
              onClick={handleSubmit}
            >
              ADD
            </Button>
          </div>
        </Dialog>
      </form>
    </>
  );
}
export default SimpleDialogAddNewItem;
