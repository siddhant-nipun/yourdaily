import React from "react";
import styles from "/styles/ControlBar.module.scss";

export default function ControlBar(props) {
  return (
    <div className={styles.contain}>
      <a className={styles.back} href="#">
        <h3>Back</h3>
      </a>
      <a className={styles.heading} href="#">
        <h3>{props.heading}</h3>
      </a>
      <a className={styles.add} href="#">
        <p>+ Add New Items</p>
      </a>
    </div>
  );
}
