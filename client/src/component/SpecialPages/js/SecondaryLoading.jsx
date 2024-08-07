import React from "react";
import { CubesLoader } from "./LoadingStyle";

const SecondaryLoading = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CubesLoader />
    </div>
  );
};

export default SecondaryLoading;
