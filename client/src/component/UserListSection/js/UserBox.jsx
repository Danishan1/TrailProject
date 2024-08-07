import React, { useState, useEffect } from "react";
import style from "../css/UserBox.module.css";

import dp from "../../images/defaultDp.jpg";
import { convertDate2time } from "../helper/convertDate2time";
import { reciptSetter } from "./reciptSetter";

const UserBox = ({ details, setUserChatOpenId, isOpen }) => {
  // API Call with userID to get the Data

  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  let {
    chatId,
    chatName,
    lastMsgTime,
    message,
    status = "none",
    type,
    profilPath,
  } = details;

  // Formating things to appear better
  if (lastMsgTime) lastMsgTime = convertDate2time(lastMsgTime);
  if (type === "text")
    message =
      windowSize < 392
        ? message.length > 20
          ? `${message.slice(0, 20).trim()}...`
          : message
        : windowSize > 425
        ? message.length > 30
          ? `${message.slice(0, 30).trim()}...`
          : message
        : message.length > 23
        ? `${message.slice(0, 23).trim()}...`
        : message;
  else {
    message = type;
  }

  const userBoxCss =
    isOpen === true ? `${style.userBox} ${style.isOpen}` : `${style.userBox}`;

  const userMobileBoxCss = `${style.mobile} ${
    isOpen === true ? style.isOpen : ""
  }`;

  if (windowSize < 890 && windowSize > 600)
    return (
      <div
        className={userMobileBoxCss}
        onClick={() => setUserChatOpenId(chatId)}
      >
        <div className={style.userDP}>
          <img src={dp} alt="DP" width={"50px"} />
        </div>
      </div>
    );

  return (
    <div className={userBoxCss} onClick={() => setUserChatOpenId(chatId)}>
      <div className={style.userDP}>
        <img src={dp} alt="DP" width={"50px"} />
      </div>
      <div className={style.userInfo}>
        <div className={style.name}>{chatName}</div>
        <div className={style.msgInfo}>
          <div className={style.msg}>{message}</div>
          <div className={style.infoTime}>
            <div className={style.time}>{lastMsgTime}</div>
            <div className={style.info}>{reciptSetter(status)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserBox;
