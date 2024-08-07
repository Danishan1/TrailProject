import React, { useEffect, useRef, useState } from "react";
import IconSetter from "../helper/IconSetter";
import style from "../css/PlusButton.module.css";
import {
  meeting,
  note,
  fileUpload,
  schedule,
  reminder,
  payment,
  media,
  directShare,
} from "../helper/PlusButtonIcons";

import {
  handleFileChange,
  handleFileClick,
  getFileType,
} from "../helper/plusButton/media";

import AlertContainer from "../../Registration/js/AlertContainer";
import { handleIconClick } from "../helper/plusButton/handleIconClick";

const PlusButton = ({ setPlusClickContent }) => {
  const fileInputRef = useRef(null);
  const alertRef = useRef(null);

  const [alertContainer, setAlertContainer] = useState([]);
  const [uploadedFile, setUploadedFile] = useState([]);

  // Handle Plus Icon
  const handlePlusClick = () => {
    setPlusClickContent();
  };

  const showAlert = (message, type) => {
    if (alertRef.current) {
      alertRef.current.addAlert(message, type);
    }
  };

  const onfileClick = (type) => {
    const newFileType = getFileType(type);
    console.log(newFileType);
    if (fileInputRef.current) {
      fileInputRef.current.accept = newFileType;
      handleFileClick(fileInputRef);
    }
  };


  return (
    <div className={style.plusButton}>
      {/* Used to mannage the file uploading from media & direct Share */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={(e) => setUploadedFile(handleFileChange(e, showAlert))}
        multiple
      />
      <AlertContainer
        ref={alertRef}
        setAlertContainer={setAlertContainer}
        alertContainer={alertContainer}
      />

      {/* Different Options */}
      <IconSetter
        icon={meeting}
        name={"Meeting"}
        clickHandle={() => setPlusClickContent(handleIconClick("meeting"))}
      />
      <IconSetter
        icon={note}
        name={"Notes"}
        clickHandle={() => {
          handleIconClick("notes");
          showAlert("Adding 'notes' feature will be avaibale soon", "info");
        }}
      />
      <IconSetter
        icon={media}
        name={"Media"}
        clickHandle={() => {
          // setPlusClickContent(handleIconClick("media"));
          onfileClick("media");
        }}
      />
      <IconSetter
        icon={fileUpload}
        name={"Document"}
        clickHandle={() => {
          // setPlusClickContent(handleIconClick("document"));
          onfileClick("doc");
        }}
      />
      <IconSetter
        icon={directShare}
        name={"Direct Share"}
        clickHandle={() => {
          // setPlusClickContent(handleIconClick("directShare"));
          onfileClick("all");
        }}
      />
      <IconSetter
        icon={schedule}
        name={"Schedule"}
        clickHandle={() => {
          handleIconClick("schedule");
          showAlert("Schedule message feature will be avaibale soon", "info");
        }}
      />
      <IconSetter
        icon={reminder}
        name={"Reminder"}
        clickHandle={() => {
          handleIconClick("reminder");
          showAlert("Adding 'Remainder' feature will be avaibale soon", "info");
        }}
      />
      <IconSetter
        icon={payment}
        name={"Payment"}
        clickHandle={() => {
          handleIconClick("payment");
          showAlert("'Payment' feature will be avaibale soon", "info");
        }}
      />
    </div>
  );
};

export default PlusButton;
