import React, { useState } from "react";
import style from "../css/ChatBoxDrop.module.css";
import ChatBox from "./ChatBox";
import {
  handleDragEnterWrapper,
  handleDragLeaveWrapper,
  handleDropWrapper,
  handleDragOver,
} from "../helper/chatDrag";

const ChatBoxDrop = ({ openChatId, setOpenChatId }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const dragCounter = React.useRef(0);

  return (
    <div
      className={`${style.fileUpload} ${isDragging ? style.dragging : ""}`}
      onDragEnter={(e) => handleDragEnterWrapper(e, setIsDragging, dragCounter)}
      onDragLeave={(e) => handleDragLeaveWrapper(e, setIsDragging, dragCounter)}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDropWrapper(e, setIsDragging, setFile, dragCounter)}
    >
      <ChatBox openChatId={openChatId} setOpenChatId={setOpenChatId} />
    </div>
  );
};

export default ChatBoxDrop;
