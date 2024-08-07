import React from "react";
import ChatText from "../helper/message/ChatText";

const Message = ({ msgData, typeOfMsg }) => {
  let content = <p>Default Text</p>;

  switch (typeOfMsg) {
    case "text":
      content = <ChatText msgData={msgData} />;
      break;
    case "meeting":
      // content = msgData.map((item, index) => {});
      break;
    case "location":
      break;
    case "payment":
      break;
    case "call_up":
      break;
    case "media":
      break;
    case "file":
      break;

    default:
    // content = handleText(
    //   "Haven't got type of Messaage, kindly contact to the organisation."
    // );
  }

  return <>{content}</>;
};

export default Message;
