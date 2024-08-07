import React, { useImperativeHandle, forwardRef } from "react";
import Alert from "./Alert";
import style from "../css/Alert.module.css";

const AlertContainer = ({ alertContainer, setAlertContainer }, ref) => {
  const addAlert = (message, type) => {
    const uniqueId = Date.now() + Math.random().toString(36).substring(2, 9);
    setAlertContainer((prevAlerts) => [
      ...prevAlerts,
      {
        id: uniqueId,
        message,
        type,
      },
    ]);
  };

  const removeAlert = (id) => {
    setAlertContainer((prevAlerts) =>
      prevAlerts.filter((alert) => alert.id !== id)
    );
  };

  useImperativeHandle(ref, () => ({
    addAlert,
  }));

  return (
    <div className={style.alertContainer}>
      {alertContainer.map((alert, index) => (
        <Alert
          key={alert.id}
          message={alert.message}
          type={alert.type}
          onDismiss={() => removeAlert(alert.id)}
          style={{ top: `${index * 60}px` }} // Adjust the gap as needed
        />
      ))}
    </div>
  );
};

export default forwardRef(AlertContainer);

/**
 * 
   Use it 
   
   const alertRef = useRef(null);
   
   const showAlert = (message, type) => {
     if (alertRef.current) {
       alertRef.current.addAlert(message, type);
     }
   };
   
   showAlert("This is an error alert!", "error")
   
   <AlertContainer
        ref={alertRef}
        setAlertContainer={setAlertContainer}
        alertContainer={alertContainer}
      />

    const [alertContainer, setAlertContainer] = useState([]);
 * 
 */
