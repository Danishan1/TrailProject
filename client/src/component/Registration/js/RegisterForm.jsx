import React, { useState, useRef, lazy, Suspense, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import AlertContainer from "./AlertContainer";
import style from "../css/RegisterForm.module.css";
import ErrorPage from "../../SpecialPages/js/ErrorPage";
import Loading from "../../SpecialPages/js/Loading";

const FormSection1 = lazy(() =>
  import("./FormSection1").then((module) => ({ default: module.FormSection1 }))
);
const FormSection2 = lazy(() =>
  import("./FormSection2").then((module) => ({ default: module.FormSection2 }))
);
const FormSection3 = lazy(() =>
  import("./FormSection3").then((module) => ({ default: module.FormSection3 }))
);

const RegisterForm = ({ orgId = "ORG_ID", createdBy = "Application" }) => {
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem("formData");
    return savedFormData
      ? JSON.parse(savedFormData)
      : {
          userId: "",
          name: "",
          mobile: "",
          email: "",
          profilePic: "",
          status: "active",
          designation: "User",
          orgId: orgId,
          createdBy: createdBy,
          updatedBy: createdBy,
        };
  });

  const [alertContainer, setAlertContainer] = useState([]);
  const [formFillStep, setFormFillStep] = useState(() => {
    const savedStep = localStorage.getItem("formFillStep");
    return savedStep ? parseInt(savedStep, 10) : 0;
  });

  const alertRef = useRef(null);
  const showAlert = (message, type) => {
    if (alertRef.current) {
      alertRef.current.addAlert(message, type);
    }
  };

  useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem("formFillStep", formFillStep.toString());
  }, [formFillStep]);

  const nextStep = (Element) => {
    return (
      <div className={style.formRapper}>
        <div className={style.userForm}>
          <Element
            setFormData={setFormData}
            formData={formData}
            showAlert={showAlert}
            setFormFillStep={setFormFillStep}
          />
          <div className={style.progress}>
            {formFillStep === 0 ? (
              <samp className={`${style.currentSec}`}></samp>
            ) : (
              <samp className={`${style.circle}`}></samp>
            )}
            {formFillStep === 1 ? (
              <samp className={`${style.currentSec}`}></samp>
            ) : (
              <samp className={`${style.circle}`}></samp>
            )}
            {formFillStep === 2 ? (
              <samp className={`${style.currentSec}`}></samp>
            ) : (
              <samp className={`${style.circle}`}></samp>
            )}
          </div>
        </div>
      </div>
    );
  };

  const wrapperNextStep = (id, element) => {
    return formFillStep === id ? (
      nextStep(element)
    ) : (
      <Navigate to={`/register/${formFillStep}`} replace />
    );
  };

  return (
    <div>
      <AlertContainer
        ref={alertRef}
        setAlertContainer={setAlertContainer}
        alertContainer={alertContainer}
      />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={wrapperNextStep(0, FormSection1)} />
          <Route path="0" element={wrapperNextStep(0, FormSection1)} />
          <Route path="1" element={wrapperNextStep(1, FormSection2)} />
          <Route path="2" element={wrapperNextStep(2, FormSection3)} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RegisterForm;
