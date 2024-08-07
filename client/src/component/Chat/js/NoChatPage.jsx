import React from "react";
import styles from "../css/NoChatPage.module.css";

const phrases = [
  "Every conversation starts with a single message. Begin your journey with a hello!",
  "A new chat is a new opportunity. Say hi and break the ice!",
  "Welcome to your new chat! Start the conversation and make it memorable.",
  "This chat is a blank canvas. Paint it with your words!",
  "Be the first to say something. Great conversations start with a single word.",
  "Start the connection. A simple hello can lead to great things.",
  "Say hello and spark a new conversation!",
  "Begin the conversation. Your words could be the start of something great.",
  "A new chat awaits. Start with a friendly message and see where it leads.",
  "Break the ice. Begin your chat with a friendly message.",
  "Start a new conversation and explore new horizons!",
  "Initiate a chat to begin a new journey.",
  "Open a chat and let the conversation flow.",
  "Dive into a new conversation and connect!",
  "Begin a chat and make meaningful connections.",
  "Write a simple text and let’s get started!",
  "Kick off a conversation with a fresh perspective.",
  "Start chatting and let the stories unfold.",
  "Engage in a new chat and discover something amazing.",
  "Start a chat, who knows what new insights await?",
  "Open the chat and see where the conversation takes you.",
  "Begin a dialogue and let the magic happen.",
  "Initiate a conversation and embrace the journey ahead.",
  "With a simple text, see uncover new possibilities.",
];

// Function to select a random phrase
const getRandomPhrase = () => {
  const randomIndex = Math.floor(Math.random() * phrases.length);
  return phrases[randomIndex];
};

/**
 * Default Values :
 * -  text = "random",
 * -  height = "100%",
 * -  width = "100%",
 *
 *
 */
export const NoChatPage = ({
  text = "random",
  height = "100%",
  width = "100%",
}) => {
  return (
    <div
      className={styles.noChatPage}
      style={{ height: `${height}`, width: `${width}` }}
    >
      <div className={styles.image}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor">
            <path d="M4.913 2.658q3.115-.406 6.337-.408c2.147 0 4.262.139 6.337.408c1.922.25 3.291 1.861 3.405 3.727a4.4 4.4 0 0 0-1.032-.211a51 51 0 0 0-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 0 0 2.433 3.984L7.28 21.53A.75.75 0 0 1 6 21v-4.03a49 49 0 0 1-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979" />
            <path d="M15.75 7.5q-2.065 0-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94q1.865.153 3.768.165l2.782 2.781a.75.75 0 0 0 1.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49 49 0 0 0 15.75 7.5" />
          </g>
        </svg>
      </div>
      <div className={styles.text}>
        {text === "random" ? getRandomPhrase() : text}
      </div>
    </div>
  );
};
