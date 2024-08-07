import React, { useState, useRef } from "react";
import styles from "../css/MeetingBox.module.css";
import { Calendar } from "../../Calender/js/Calendar";
import InputTime from "../../Registration/js/InputTime";
import InputField from "../../Registration/js/InputField";
import CustomDropdown from "../../Registration/helper/CustomDropdown";
import { Button } from "../../Registration/js/Button";
import AlertContainer from "../../Registration/js/AlertContainer";
import {
  calculateDuration,
  compareTimes,
} from "../../Registration/helper/WorkingWithTime";

export const MeetingBox = ({ setMeetingData }) => {
  const [meetingDate, setMeetingDate] = useState(new Date());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [title, setTitle] = useState("");
  const [purpose, setPurpose] = useState("");
  const [recurrence, setRecurrence] = useState("None");
  const [notification, setNotification] = useState("30 minutes before");
  const [participants, setParticipants] = useState("");
  const [location, setLocation] = useState("");
  const [alertContainer, setAlertContainer] = useState([]);
  const alertRef = useRef(null);

  const recurrenceOptions = ["None", "Daily", "Weekly", "Monthly"];
  const notificationOptions = [
    "5 minutes before",
    "10 minutes before",
    "30 minutes before",
    "1 hour before",
  ];

  const showAlert = (message, type) => {
    if (alertRef.current) {
      alertRef.current.addAlert(message, type);
    }
  };

  const handleSchedule = () => {
    let hasError = false;

    if (title === "" && purpose === "" && location === "") {
      showAlert("Title, Purpose, Location must not be empty.", "error");
      hasError = true;
    } else {
      if (title === "") {
        showAlert("Title must not be empty.", "error");
        hasError = true;
      }
      if (purpose === "") {
        showAlert("Purpose must not be empty.", "error");
        hasError = true;
      }
      if (location === "") {
        showAlert("Location must not be empty.", "error");
        hasError = true;
      }
    }

    if (startTime === "") {
      showAlert("Start time must not be empty.", "error");
      hasError = true;
    }

    if (endTime === "") {
      showAlert("End time must not be empty.", "error");
      hasError = true;
    }

    if (
      startTime !== "" &&
      endTime !== "" &&
      !compareTimes(startTime, endTime)
    ) {
      showAlert("End time must be after start time.", "error");
      hasError = true;
    }

    const duration = calculateDuration(startTime, endTime);

    if (duration.hours === 0 && duration.minutes < 15) {
      showAlert("Meeting should be at least 15 minutes long.", "error");
      hasError = true;
    }

    if ((duration.hours === 5 && duration.minutes > 0) || duration.hours > 5) {
      showAlert("Meeting should be at most 5 hours long.", "error");
      hasError = true;
    }

    if (!hasError) {
      showAlert("Great, Let's review before schedule!", "info");
      setMeetingData({
        meetingDate,
        startTime,
        endTime,
        title,
        purpose,
        recurrence,
        notification,
        participants,
        location,
      });
    }
  };

  return (
    <div className={styles.meetingBox}>
      <AlertContainer
        ref={alertRef}
        setAlertContainer={setAlertContainer}
        alertContainer={alertContainer}
      />
      <div className={styles.meeting}>
        <div className={styles.container}>
          <div className={styles.title}>
            <InputField
              label="Title"
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required={true}
            />
          </div>
          <div className={styles.calenderTime}>
            <div className={styles.calender}>
              <Calendar handleDateClick={setMeetingDate} />
            </div>
            <div className={styles.time}>
              <InputTime label={"Start Time"} onTimeChange={setStartTime} />
              <InputTime label={"End Time"} onTimeChange={setEndTime} />
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <InputField
            label="Purpose"
            type="text"
            name="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required={true}
          />

          <InputField
            label="Location"
            type="text"
            name="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required={true}
          />
          <div className={styles.notiRecur}>
            <div>
              <p className={styles.lable}>Recurrence</p>
              <CustomDropdown
                options={recurrenceOptions}
                onChange={setRecurrence}
                value={recurrence}
                specialStyle={{ width: "100px" }}
              />
            </div>
            <div>
              <p className={styles.lable}>Notification</p>
              <CustomDropdown
                options={notificationOptions}
                onChange={setNotification}
                value={notification}
              />
            </div>
          </div>
          <div onClick={setParticipants} className={styles.Participate}>
            Add Participant
          </div>
          <div className={styles.btnContainer}>
            <Button
              text={"Schedule"}
              onClick={handleSchedule}
              style={{ width: "150px" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
