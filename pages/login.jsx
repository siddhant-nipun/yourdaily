import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import styles from "../styles/login.module.scss";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useFormik } from "formik";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { baseurl } from "../utility/auth";
import { useRouter } from "next/router";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Login() {
  const router = useRouter();
  //login

  //---- snackbar---
  const [open, setOpen] = React.useState("");

  const handleSnackClick = () => {
    // setOpen(true);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  //---snackbar--
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  // const handleChange = (prop) => (event) => {
  //   setValues({ ...values, [prop]: event.target.value });
  // };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // formik function

  const validate = (values) => {
    const errors = {};
    if (values.email === "") {
      errors.email = "Enter Valid Email";
    }

    if (values.password === "") {
      errors.password = "Enter valide password";
    }
    return errors;
  };
  const formik = useFormik({
    initialValues: {
      email: "a1@yourdaily.com",
      password: "1234",
    },
    validate,
    onSubmit: async (values) => {
      try {
        let result = await fetch(`${baseurl}/api/sm-login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (result.status === 200) {
          let result2 = await result.json();
          console.log(result2);
          localStorage.setItem("token", result2.Authorization);
          router.push("/dashboard");
        } else {
          setOpen("Invalid Credentials");
        }
      } catch (response) {}
    },
  });

  return (
    <div className={styles.mainContainer}>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <div className={styles.logo}>
          <img src="/assets/ydlogo.svg" alt="This is logo" />
        </div>
        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <img src="/assets/Illustrator 1.png" alt="This" />
          </div>
          <div className={styles.card}>
            <div sx={{ minWidth: 275 }}>
              <div>
                <h2>LOGIN</h2>
                <p>Please login to your account</p>
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                }}
              >
                <form
                  className={styles.credentials}
                  onSubmit={formik.handleSubmit}
                >
                  <TextField
                    label="User ID"
                    id="outlined-start-adornment"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <PersonIcon />
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                  <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      label="Password"
                      // sx={{ m: 1, width: "25ch" }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <div className={styles.loginbtnContainer}>
                    <Button
                      type="submit"
                      className={styles.loginbutton}
                      variant="contained"
                      onClick={handleSnackClick}
                    >
                      Login
                    </Button>
                  </div>
                </form>
                <a href="#" className={styles.forgotpwd}>
                  Forgot Password?
                </a>
              </Box>
            </div>
          </div>
        </div>
        <Snackbar
          open={!!open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleSnackClose}
        >
          <Alert
            onClose={handleSnackClose}
            severity="error"
            sx={{ width: "100%" }}
          >
            {open}
          </Alert>
        </Snackbar>
        {/* <Alert severity="error">This is an error message!</Alert> */}
        {/* <Alert severity="success">This is a success message!</Alert> */}
      </Stack>
    </div>
  );
}
