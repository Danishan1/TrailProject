import React, { useState, useEffect } from "react";
import style from "../css/ChatBox.module.css";
import Chat from "./GroupMsgBox";
import CenteredDateDisplay from "./CenteredDateDisplay";
import ChatInput from "./ChatInput";
import ContactChat from "./ContactChat";

export default function GroupChat() {
  const [chats, setChats] = useState([
    {
      sender: { name: "Danishan", dp: "../../img/defaultDp.jpg" },
      message: "Hey, How are you ?",
      isSent: true,
      idDateTime: { id: "~id2011", date: "Jan 20 2024", time: "10:30 PM" },
      type: "text",
    },
    {
      sender: { name: "Sahil", dp: "../../img/defaultDp.jpg" },
      message: "Great, long time no see... What are doing next sunday ?",
      isSent: false,
      idDateTime: { id: "~id2012", date: "Jan 20 2024", time: "10:35 PM" },
      type: "text",
    },
    {
      sender: { name: "Salman", dp: "../../img/defaultDp.jpg" },
      message:
        "Finally Danishan, you are back, i thought something bad haapens to you that's why you are not responding...?",
      isSent: false,
      idDateTime: { id: "~id2013", date: "Jan 20 2024", time: "10:40 PM" },
      type: "text",
    },
    {
      sender: { name: "Salman", dp: "../../img/defaultDp.jpg" },
      message: "and yeah, any plan for Sunday ?? I am in...",
      isSent: false,
      idDateTime: { id: "~id2014", date: "Jan 20 2024", time: "10:41 PM" },
      type: "text",
    },
    {
      sender: { name: "Danishan", dp: "./person1" },
      message:
        "Sorry Guys, I was little busy before but now all set. Lets plan something... I am too tired with this week",
      isSent: true,
      idDateTime: { id: "~id2015", date: "Jan 21 2024", time: "09:16 AM" },
      type: "text",
    },
    {
      sender: { name: "Danishan", dp: "./person1" },
      message:
        "How about... swiming ? I want to something like child, its too hot",
      isSent: true,
      idDateTime: { id: "~id2016", date: "Jan 21 2024", time: "09:18 AM" },
      type: "text",
    },
    {
      sender: { name: "Sahil", dp: "./person2" },
      message: "No, Not Swiming lets go to ice skating...",
      isSent: false,
      idDateTime: { id: "~id2017", date: "Jan 21 2024", time: "09:19 AM" },
      type: "text",
    },
    {
      sender: { name: "Sahil", dp: "../../img/defaultDp.jpg" },
      message: "We were planing this last time as well but not succeed",
      isSent: false,
      idDateTime: { id: "~id2018", date: "Jan 21 2024", time: "09:20 AM" },
      type: "text",
    },
    {
      sender: { name: "Danishan", dp: "./person1" },
      message:
        "Okay now we are on one-one lets take salman vote as well and than will decide...",
      isSent: true,
      idDateTime: { id: "~id2019", date: "Jan 21 2024", time: "09:26 AM" },
      type: "text",
    },
    {
      sender: { name: "Danishan", dp: "./person1.jpg" },
      message: "Salman, say something ....",
      isSent: true,
      idDateTime: { id: "~id2020", date: "Jan 21 2024", time: "09:27 AM" },
      type: "text",
    },
    {
      sender: { name: "Salman", dp: "../../img/defaultDp.jpg" },
      message:
        "Oh yeah, Suddenly I feel like very Important... But I think sahil is right, we should go for Ice Skating..",
      isSent: false,
      idDateTime: { id: "~id2021", date: "Jan 21 2024", time: "09:31 AM" },
      type: "text",
    },
    {
      sender: { name: "Danishan", dp: "./person1" },
      message: "Okay than, Skating is final on Sunday... Great",
      isSent: true,
      idDateTime: { id: "~id2022", date: "Jan 21 2024", time: "9:33 AM" },
      type: "text",
    },
    {
      sender: { name: "Salhil", dp: "../../img/defaultDp.jpg" },
      message: "I love it, Just leave on the planing on me...",
      isSent: false,
      idDateTime: { id: "~id2023", date: "Jan 21 2024", time: "9:35 AM" },
      type: "text",
    },

    // Add more chat data as needed
  ]);

  const [latestDate, setLatestDate] = useState(null);

  useEffect(() => {
    if (chats.length > 0) {
      const latestChatDate = chats[chats.length - 1].idDateTime.date;
      if (latestDate !== latestChatDate) {
        setLatestDate(latestChatDate);
      }
    }
  }, [chats, latestDate]);

  return (
    <div className={style.chatBox}>
      <div className={style.header}>Group Chat</div>
      <div className={style.chatArea}>
        {chats.map((chat, index) => (
          <React.Fragment key={index}>
            {index === 0 ||
            chat.idDateTime.date !== chats[index - 1].idDateTime.date ? (
              <React.Fragment>
                <CenteredDateDisplay newDate={chat.idDateTime.date} />
                {chat.type === "text" ? (
                  <Chat
                    key={index}
                    currentChat={chat}
                    previousChat={index > 0 ? chats[index - 1] : null}
                  />
                ) : chat.type === "contact" ? (
                  <ContactChat />
                ) : null}
              </React.Fragment>
            ) : (
              <Chat
                key={index}
                currentChat={chat}
                previousChat={index > 0 ? chats[index - 1] : null}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className={style.msgBox}>
        <ChatInput onSendMessage={() => console.log("Send")} />
      </div>
    </div>
  );
}
