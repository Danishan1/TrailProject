import React, { useState, useEffect, useRef } from "react";
import style from "../css/ChatBox.module.css";
import MsgBox from "./MsgBox";
import CenteredDateDisplay from "./CenteredDateDisplay";
import ChatInput from "./ChatInput";
import { ForwardedBox } from "./ForwardedBox";
import axios from "axios";
import Loading from "../../SpecialPages/js/Loading";
import { formatDate } from "../helper/plusButton/formateDate";
import { NoChatPage } from "./NoChatPage";
import { left } from "../helper/PlusButtonIcons";

export default function ChatBox({ openChatId, setOpenChatId }) {
  // Used to store the chats
  const [chats, setChats] = useState([]);
  const [chatInfo, setChatInfo] = useState([]);
  const [isChatEnd, setIsChatEnd] = useState("");
  const [loading, setLoading] = useState(true);

  // Reference for the chat area and bottom div
  const chatAreaRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const fetchChat = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5000/api/chats/getChat",
          { chatId: openChatId },
          { withCredentials: true }
        );

        console.log(response);

        setIsChatEnd(response.data.chat.isEnd);
        setChats(response.data.chat.result);
        setChatInfo(response.data.chat.chatDetails);
        setLoading(false); // Set loading to false after fetching chats
      } catch (error) {
        console.error("Error fetching chat:", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    if (openChatId) {
      fetchChat();
    }
  }, [openChatId]);

  useEffect(() => {
    // Scroll to the bottom of the chat area whenever chats state changes
    const scrollToBottom = () => {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
      }
    };

    // Adding a slight delay to ensure all elements are rendered before scrolling
    setTimeout(scrollToBottom, 100);
  }, [chats]);

  const handleSend = async (message) => {
    await axios.post(
      "http://localhost:5000/api/chats/addMsg",
      {
        chatId: openChatId,
        forwardedChat: false,
        msgType: "text",
        messageData: { text: message },
      },
      { withCredentials: true }
    );
  };

  const chatMap = () => {
    return chats.map((chat, index) => (
      <React.Fragment key={index}>
        {index === 0 ||
        formatDate(chat.createdAt) !==
          formatDate(chats[index - 1].createdAt) ? (
          <CenteredDateDisplay newDate={chat.createdAt} />
        ) : (
          <></>
        )}

        <MsgBox
          key={index}
          currentChat={chat}
          previousChat={index > 0 ? chats[index - 1] : null}
        />
      </React.Fragment>
    ));
  };

  if (openChatId === null || openChatId === "") {
    return <NoChatPage height="100vh" />;
  } else if (loading) {
    return <Loading windowHeight="100vh" windowWidth="100%" />;
  }

  return (
    <div className={style.chatBox}>
      <div className={style.header}>
        <div
          className={style.backToListBtn}
          onClick={() => setOpenChatId("list")}
        >
          {left}
        </div>
        <div className={style.chatName}>
          {chatInfo.length > 0 ? chatInfo[0].chatName : "Chat"}
        </div>
      </div>
      <div className={style.chatArea} ref={chatAreaRef}>
        {chats.length > 0 ? chatMap() : <NoChatPage height="100%" />}
        <div ref={bottomRef}></div>
      </div>
      <div className={style.msgBox}>
        <div>
          <ForwardedBox type={"Pending - Forwarded Box"} />
        </div>
        <div className={style.chatInput}>
          <ChatInput onSendMessage={(message) => handleSend(message)} />
        </div>
      </div>
    </div>
  );
}
