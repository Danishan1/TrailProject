import React from "react";
import styles from "../css/LoadingChat.module.css";

const LoadingChat = () => {
  return (
    <div className={styles.blobs}>
      <div className={styles.blobCenter}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <div className={styles.blob}></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        style={{ display: "none" }}
      >
        <defs>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

export default LoadingChat;
