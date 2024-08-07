import React, { useEffect, useState } from "react";
import styles from "../css/ChatApp.module.css";
import ChatBoxDrop from "./ChatBoxDrop";
import UserListSection from "../../UserListSection/js/UserListSection";
import axios from "axios";
import Loading from "../../SpecialPages/js/Loading";
import ErrorPage from "../../SpecialPages/js/ErrorPage";

const ChatApp = () => {
  const [chatList, setChatList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openChatId, setOpenChatId] = useState(null);

  useEffect(() => {
    const getUserChatList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/chats/getChatList",
          { withCredentials: true }
        );

        if (
          response.data.responseCode === "00015" ||
          response.data.responseCode === "00016"
        ) {
          setChatList(response.data.data);
        } else if (response.data.responseCode === "00017") {
          setError(response.data.responseCode);
        }
      } catch (err) {
        console.log(err);
        setError("Error on Setting Chat App");
      } finally {
        setLoading(false);
      }
    };

    getUserChatList();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorPage statusCode="500" responseCode={error} />;
  }

  const openListCss =
    openChatId === null || openChatId === "" || openChatId === "list"
      ? styles.openSection
      : styles.closeSection;

  const openChatCss =
    openChatId !== null && openChatId !== "" && openChatId !== "list"
      ? styles.openSection
      : styles.closeSection;

  return (
    <div className={styles.chatApp}>
      <div className={styles.sectionA}></div>
      <div className={`${styles.sectionB} ${openListCss}`}>
        <UserListSection chatList={chatList} setOpenChatId={setOpenChatId} />
      </div>
      <div className={`${styles.sectionC} ${openChatCss}`}>
        <ChatBoxDrop openChatId={openChatId} setOpenChatId={setOpenChatId} />
      </div>
    </div>
  );
};

export default ChatApp;
