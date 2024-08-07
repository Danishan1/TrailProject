import React from "react";
import styles from "../css/ErrorPage.module.css";
import { useNavigate } from "react-router-dom";
import { getStatusDetails } from "../../utils/getStatusDetails";

const ErrorPage = ({ statusCode = "404", responseCode = null }) => {
  let statusDetail = getStatusDetails(statusCode);

  console.log(statusDetail);
  if (!statusDetail) {
    statusDetail = {
      statusCode: statusCode,
      statusError: "Given Wrong Status Code",
      statusDetail:
        "The Status Code is invalid. Kindly contact to organization.",
    };
  }

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className={styles.errorCode}>{statusCode}</p>
        <div className={styles.message}>
          <h1 id="pageTitle" className={styles.title}>
            <svg
              aria-hidden="true"
              className={styles.icon}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className={styles.titleText}>
              Oops! Page {statusDetail.statusCode}.
            </span>
          </h1>
          <p className={styles.description}>
            The page you are looking for was {statusDetail.statusError}.
          </p>
          <p className={styles.description}>
            <span className="boldL2">Detail:</span> {statusDetail.statusDetail}
          </p>
          {responseCode !== null ? (
            <p className={styles.description}>
              <span className="boldL2">Response Code:</span> {responseCode}
            </p>
          ) : (
            <></>
          )}
          <p className={styles.instruction}>
            You may return to{" "}
            <span className={styles.link} onClick={handleClick}>
              Home Page
            </span>{" "}
            or try using the correct URL.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;
