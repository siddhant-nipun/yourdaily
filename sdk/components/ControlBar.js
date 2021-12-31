import React, { useState } from "react";
import styles from "/styles/ControlBar.module.scss";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import VegetableDialog from "../components/items/VegetableDialog";

export default function ControlBar(props) {
  const router = useRouter();

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
          <h3>{props.heading}</h3>
        </a>
        <a className={styles.add} href="#">
          {/* <p>+ Add New {props.heading}</p> */}
          {props.heading && <VegetableDialog />}
        </a>
      </div>
    </>
  );
}
