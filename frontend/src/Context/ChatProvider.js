import { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const history = useHistory();
  const [notification, setNotification] = useState([]);

  useEffect(() => {
    if (true) {
      // Check if history is defined before using it
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // console.log(userInfo);
      if (!userInfo) {
        history.push("/");
      } else {
        setUser(userInfo);
      }
    }
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notification,
        setNotification,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
