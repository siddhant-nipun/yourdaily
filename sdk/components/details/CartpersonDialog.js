import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import styles from "../../../styles/CartpersonDialog.module.scss";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function CustomizedDialogs(props) {
  //   const [open, setOpen] = React.useState(props.dialogState);

  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div className={styles.whole}>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={() => {
          props.onClose();
        }}
        aria-labelledby="customized-dialog-title"
        open={props.dialogState}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={() => {
            props.onClose();
          }}
        >
          {/* Modal title */}
        </BootstrapDialogTitle>
        <DialogContent dividers className={styles.contentContainer}>
          <div className={styles.wholeContainer}>
            <div className={styles.mainContainer}>
              <div className={styles.wrapper}>
                <div className={styles.topContainer}>
                  <div className={styles.topLeft}>
                    <div className={styles.dpHolder}>
                      <img src="/assets/Rakesh.png" alt="Rakesh" />
                    </div>
                  </div>
                  <div className={styles.topRight}>
                    <h3>Name</h3>
                    <div className={styles.textfield}>{props.row?.name}</div>
                    <h3>Contact</h3>
                    <div className={styles.textfield}>{props.row?.contact}</div>
                    <h3>Reg. Date</h3>
                    <div className={styles.textfield}>{props.row?.regDate}</div>
                  </div>
                </div>
                <div className={styles.bottomContainer}>
                  <div className={styles.bottomCards}>
                    <div className={styles.card}>
                      <h2 className={styles.greenText}>
                        ₹{props.row?.totalAmount}
                      </h2>
                      <p>Total Business</p>
                    </div>
                    <div className={styles.card}>
                      <h2 className={styles.redText}>🚩{props.row?.flagged}</h2>
                      <p>Flagged</p>
                    </div>
                    <div className={styles.card}>
                      <h2 className={styles.orangeText}>
                        {props.row?.avgRating}★
                      </h2>
                      <p>Avg. Rating</p>
                    </div>
                    <div className={styles.card}>
                      <h2 className={styles.greenText}>
                        {props.row?.totalOrder}
                      </h2>
                      <p>Total Order</p>
                    </div>
                    <div className={styles.card}>
                      <h2 className={styles.redText}>
                        {props.row?.deniedOrders}
                      </h2>
                      <p>Denied</p>
                    </div>
                    <div className={styles.card}>
                      <h2 className={styles.orangeText}>
                        {props.canceledOrders}
                      </h2>
                      <p>Cancel</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              props.onClose();
            }}
          >
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
