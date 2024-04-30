import { useState } from "react";
import { ChatState } from "../Context/ChatProvider.js";
import ChatBox from "../components/ChatBox.js";
import MyChats from "../components/MyChats.js";
import SideDrawer from "../components/miscellaneous/SideDrawer.js";
import { Box } from "@chakra-ui/layout";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);
  // console.log(user);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        width={"100%"}
        height="91.5vh"
        p={"10px"}
      >
        {user && <MyChats fetchAgain={fetchAgain} />}

        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </div>
  );
};

export default Chatpage;
