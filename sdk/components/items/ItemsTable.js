import React from "react";
import styles from "../../../styles/ItemsTable.module.scss";

export default function ItemsFruits() {
  return (
    <table className={styles.categoriesTable}>
      <thead>
        <tr className="styles.center">
          <th>S.No</th>
          <th>Image</th>
          <th>Vegetable</th>
          <th>Base Qty.</th>
          <th>
            Price
            <br /> (per base Qty)
          </th>
          <th>In Stock</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
