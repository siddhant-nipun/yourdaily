import React from "react";
import styles from "/styles/ControlBar.module.scss";
import { useRouter } from "next/router";

export default function ControlBar(props) {
  const router = useRouter();
  return (
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
      <a className={styles.add} href="#">
        <p>+ Add New {props.heading}</p>
      </a>
    </div>
  );
}
