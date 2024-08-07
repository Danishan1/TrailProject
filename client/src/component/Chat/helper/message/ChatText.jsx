import React from "react";
import styles from "../css/ChatText.module.css";

const ChatText = ({ msgData }) => {
  return <div className={styles.chatText}>{msgData.text}</div>;
};

export default ChatText;
