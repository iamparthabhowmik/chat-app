import React from "react";
import { isSameUser } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

import ScrollableFeed from "react-scrollable-feed";

const ScrollableChatIndividual = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#8DECB4" : "#97E7E1"
                }`,
                borderRadius: "11px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: `${m.sender._id === user._id ? "auto" : 0}`,
                marginTop: isSameUser(messages, m, i, user._id) ? 2 : 13,
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChatIndividual;
