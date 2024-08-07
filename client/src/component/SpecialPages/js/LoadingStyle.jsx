import React from "react";
import styles from "../css/LoadingStyle.module.css";

export const CubesLoader = () => (
  <div className={styles.cubes}>
    <div className={`${styles.skCube} ${styles.skCube1}`}></div>
    <div className={`${styles.skCube} ${styles.skCube2}`}></div>
    <div className={`${styles.skCube} ${styles.skCube3}`}></div>
    <div className={`${styles.skCube} ${styles.skCube4}`}></div>
    <div className={`${styles.skCube} ${styles.skCube5}`}></div>
    <div className={`${styles.skCube} ${styles.skCube6}`}></div>
    <div className={`${styles.skCube} ${styles.skCube7}`}></div>
    <div className={`${styles.skCube} ${styles.skCube8}`}></div>
    <div className={`${styles.skCube} ${styles.skCube9}`}></div>
  </div>
);

export const FoldingLoader = () => (
  <div className={styles.folding}>
    <div className={`${styles.skCube} ${styles.skCube1}`}></div>
    <div className={`${styles.skCube} ${styles.skCube2}`}></div>
    <div className={`${styles.skCube} ${styles.skCube4}`}></div>
    <div className={`${styles.skCube} ${styles.skCube3}`}></div>
  </div>
);

export const BounceLoader = () => (
  <div className={styles.bounce}>
    <div className={styles.bounce1}></div>
    <div className={styles.bounce2}></div>
    <div className={styles.bounce3}></div>
  </div>
);

export const PulseLoader = () => (
  <div className={styles.pulse}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 100"
      className={styles.svg}
    >
      <polyline
        fill="none"
        strokeWidth="3px"
        className={styles.polyline}
        points="2.4,58.7 70.8,58.7 76.1,46.2 81.1,58.7 89.9,58.7 93.8,66.5 102.8,22.7 110.6,78.7 115.3,58.7 126.4,58.7 134.4,54.7 142.4,58.7 197.8,58.7"
      />
    </svg>
  </div>
);
