import React, { lazy, Suspense, useEffect, useState } from "react";
import SecondaryLoading from "./SecondaryLoading";
import styles from "../css/Loading.module.css";

const CubesLoader = lazy(() =>
  import("./LoadingStyle").then((module) => ({ default: module.CubesLoader }))
);
const FoldingLoader = lazy(() =>
  import("./LoadingStyle").then((module) => ({ default: module.FoldingLoader }))
);
const BounceLoader = lazy(() =>
  import("./LoadingStyle").then((module) => ({ default: module.BounceLoader }))
);
const PulseLoader = lazy(() =>
  import("./LoadingStyle").then((module) => ({ default: module.PulseLoader }))
);
const LoadingChat = lazy(() => import("./LoadingChat"));

/**
 * Default Values: 
 *  - type = "CubesLoader"
 *  - display = "top"
 *  - position = "relative"
 *  - windowHeight = "100vh"
 *  - windowWidth = "100vw"
 * type can be [CubesLoader || FoldingLoader || BounceLoader || PulseLoader || LoadingChat]
 * @param type Allow to change based on this
 * @param display Allow to chage type of Screen [top || block]
 * @param windowHeight Loading page Height
 * @param windowWidth Loading page Width
 * @returns jsx
 */
const Loading = ({
  type = "CubesLoader",
  display = "top",
  position = "relative",
  windowHeight = "100vh",
  windowWidth = "100vw",
}) => {
  const [loadingText, setLoadingText] = useState("Loading");

  useEffect(() => {
    const dots = ["", ".", "..", "..."];
    let index = 0;

    const intervalId = setInterval(() => {
      setLoadingText(`Loading${dots[index]}`);
      index = (index + 1) % dots.length;
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  let LoaderComponent;

  switch (type) {
    case "CubesLoader":
      LoaderComponent = CubesLoader;
      break;
    case "FoldingLoader":
      LoaderComponent = FoldingLoader;
      break;
    case "BounceLoader":
      LoaderComponent = BounceLoader;
      break;
    case "PulseLoader":
      LoaderComponent = PulseLoader;
      break;
    case "LoadingChat":
      LoaderComponent = LoadingChat;
      break;
    default:
      LoaderComponent = CubesLoader;
  }

  const loadingStyle =
    display === "top" ? `${styles.loading} ${styles.top}` : styles.loading;

  const positionStyle =
    display === "top" && position === "relative"
      ? { position: "relative" }
      : { position: "absolute" };

  return (
    <div
      style={{ height: windowHeight, width: windowWidth, ...positionStyle }}
      className={loadingStyle}
    >
      <Suspense fallback={<SecondaryLoading />}>
        <LoaderComponent />
        <p className={styles.text}>{loadingText}</p>
      </Suspense>
    </div>
  );
};

export default Loading;
