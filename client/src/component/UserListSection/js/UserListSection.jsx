import React, { useEffect, useState } from "react";
import style from "../css/UserListSection.module.css";
import UserBox from "./UserBox";
import { Button } from "../../Registration/js/Button";
import SearchBox from "./SearchBox";
import { NewChat } from "./NewChat";
import { NoChatPage } from "../../Chat/js/NoChatPage";

const UserListSection = ({ chatList, setOpenChatId }) => {
  const [userChatOpenId, setUserChatOpenId] = useState("");
  const [whichListSection, setWhichListSection] = useState(null);

  useEffect(() => {
    setOpenChatId(userChatOpenId);
  }, [userChatOpenId, setOpenChatId]);

  const chatListMap = () => {
    return chatList.length > 0 ? (
      chatList.map((chat) => (
        <UserBox
          key={chat.chatId}
          details={chat}
          setUserChatOpenId={setUserChatOpenId}
          isOpen={userChatOpenId === chat.chatId}
        />
      ))
    ) : (
      <NoChatPage />
    );
  };

  const setListSection = () => {
    let content;

    switch (whichListSection) {
      case "newChat":
        content = (
          <NewChat
            setWhichListSection={setWhichListSection}
            setUserChatOpenId={setUserChatOpenId}
          />
        );
        break;
      case "list":
        content = chatListMap();
        break;
      default:
        content = chatListMap();
    }

    return content;
  };

  const listRemoveBorder =
    whichListSection === "newChat" ? style.listRemoveBorder : "";

  return (
    <div className={`${style.userListSection} ${listRemoveBorder}`}>
      <div className={style.searchBox}>
        <SearchBox />
      </div>
      <div className={style.topInfoBar}></div>
      <div className={style.bottomList}>
        <div className={style.sideInfoBar}></div>
        <div className={style.userList}>{setListSection()}</div>
      </div>
      <div className={style.newChatBtn}>
        <Button
          text={whichListSection === "newChat" ? "Back" : "New"}
          onClick={() => {
            whichListSection === "newChat"
              ? setWhichListSection("list")
              : setWhichListSection("newChat");
          }}
        />
      </div>
    </div>
  );
};

export default UserListSection;
