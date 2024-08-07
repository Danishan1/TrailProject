import React from "react";
import Style from "../css/FileBox.module.css";
import { media, directShare, fileUpload } from "../helper/PlusButtonIcons";

const FileBox = ({ content, type = "all" }) => {
  let visibleContetnt = "";

  switch (type) {
    case "media":
      visibleContetnt = <div className={Style.icon}>{media}</div>;
      break;
    case "document":
      visibleContetnt = <div className={Style.icon}>{fileUpload}</div>;
      break;
    case "directShare":
      visibleContetnt = <div className={Style.icon}>{directShare}</div>;
      break;
    default:
      visibleContetnt = (
        <div className={`${Style.icon} ${Style.multiIcon}`}>
          {media} {directShare} {fileUpload}
        </div>
      );
      break;
  }
  return <>{visibleContetnt}</>;
};

export default FileBox;
