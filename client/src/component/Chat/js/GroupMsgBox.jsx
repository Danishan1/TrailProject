import React from "react";
import PropTypes from "prop-types";
import style from "../css/MsgBox.module.css";
import defaultDp from "./defaultDp.jpg";

const Chat = ({ currentChat, previousChat }) => {
  const isSameSender =
    previousChat && previousChat.sender.name === currentChat.sender.name;

  const chatBoxSendSender = isSameSender
    ? style.continuation
    : style.newMessage;
  const chatBoxIsSent = currentChat.isSent
    ? `${style.chatBox} ${style.sent}`
    : `${style.chatBox} ${style.received}`;

  const chatBoxClasses = `${chatBoxIsSent} ${chatBoxSendSender}`;

  return (
    <div className={chatBoxClasses}>
      <div className={style.content}>
        {!isSameSender && <SenderInfo sender={currentChat.sender} />}
        <MessageText message={currentChat.message} />
        <IdDateTime idDateTime={currentChat.idDateTime} />
      </div>
      <ShareIcon />
    </div>
  );
};

// Helper Components ##################################################################

const SenderInfo = ({ sender }) => (
  <div className={style.senderInfo}>
    <div className={style.dp}>
      <a href="www.google.com">
        <img src={defaultDp} height={40} alt="Profile" />
      </a>
    </div>
    <div className={style.name}>{sender.name}</div>
  </div>
);

const MessageText = ({ message }) => (
  <div className={style.msgText}>{message}</div>
);

const IdDateTime = ({ idDateTime }) => (
  <div className={style.idDateTime}>
    <p className={style.id}>{idDateTime.id}</p>
    <p className={style.time}>{idDateTime.time}</p>
  </div>
);

const ShareIcon = () => (
  <div className={`${style.share}`}>
    <a href="www.google.com">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="black"
          fillRule="evenodd"
          d="M18 2a3 3 0 0 0-2.947 3.562l-7.114 4.15a3 3 0 1 0 0 4.578l7.114 4.148a3 3 0 1 0 1.008-1.727l-7.114-4.15a3.011 3.011 0 0 0 0-1.123l7.114-4.15A3 3 0 1 0 18 2"
          clipRule="evenodd"
        />
      </svg>
    </a>
  </div>
);

Chat.propTypes = {
  currentChat: PropTypes.shape({
    sender: PropTypes.object.isRequired,
    message: PropTypes.string.isRequired,
    idDateTime: PropTypes.object.isRequired,
    isSent: PropTypes.bool.isRequired,
  }).isRequired,
  previousChat: PropTypes.object,
};

SenderInfo.propTypes = {
  sender: PropTypes.object.isRequired,
};

MessageText.propTypes = {
  message: PropTypes.string.isRequired,
};

IdDateTime.propTypes = {
  idDateTime: PropTypes.object.isRequired,
};

export default Chat;
