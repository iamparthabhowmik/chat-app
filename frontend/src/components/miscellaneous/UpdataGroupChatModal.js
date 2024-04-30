import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  IconButton,
  useToast,
  Box,
  FormControl,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/ChatProvider";
import UserBadgeItem from "../UserAvatar/UserBadgeItem";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

const UpdataGroupChatModal = ({ fetchAgain, setFetchAgain, fetchMessages }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [leaveLoading, setLeaveLoading] = useState(false);

  const { user, selectedChat, setSelectedChat } = ChatState();

  const toast = useToast();

  const handleRemove = async (user1) => {
    // here is some problem fix it later ...
    if (selectedChat.groupAdmin._id !== user._id && user1._id !== user._id) {
      toast({
        title: "Only group Admin can remove someone!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/groupremove`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      user1._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    }
  };
  const handleRename = async () => {
    if (!groupChatName) return;

    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `api/chat/rename`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setRenameLoading(false);
    }

    setGroupChatName("");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    try {
      setSearchLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(`/api/user?search=${search}`, config);
      console.log(data);
      setSearchLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setSearchLoading(false);
    }
  };

  const handleAddUser = async (user1) => {
    if (selectedChat.users.find((u) => u._id === user1._id)) {
      toast({
        title: "User already exist",
        duration: 5000,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
      return;
    }

    // if (selectedChat.groupAdmin._id !== user._id) {
    //   toast({
    //     title: "Only group Admin can add someone!",
    //     status: "error",
    //     duration: 5000,
    //     isClosable: true,
    //     position: "bottom-right",
    //   });
    //   return;
    // }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/groupadd`,
        {
          chatId: selectedChat._id,
          userId: user1._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title: "Error Occured!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  return (
    <>
      <IconButton
        display={{ base: "flex" }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize={"35px"}
            fontFamily={"Work sans"}
            display={"flex"}
            justifyContent={"center"}
          >
            {selectedChat.chatName}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
              {selectedChat.users.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user1={u}
                  Admin={selectedChat.groupAdmin}
                  loggedInUser={user}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl display={"flex"}>
              <Input
                placeholder="Chat Name"
                mb={3}
                value={groupChatName}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
              <Button
                variant={"solid"}
                colorScheme="teal"
                ml={1}
                isLoading={renameLoading}
                onClick={handleRename}
              >
                update
              </Button>
            </FormControl>
            <FormControl display={"flex"} mb={2}>
              <Input
                placeholder="Add user to group"
                mb={1}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button
                variant="solid"
                onClick={handleSearch}
                pl={7}
                pr={7}
                ml={1}
                isLoading={searchLoading}
              >
                <i className="fas fa-search"></i>
              </Button>
            </FormControl>

            {loading ? (
              <Box display="flex" justifyContent="center" alignItems="center">
                <Spinner size="lg" />
              </Box>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleAddUser(user)}
                  />
                ))
            )}

            <Box
              mt={4}
              mb={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button colorScheme="red" onClick={() => handleRemove(user)}>
                Leave Group
              </Button>
            </Box>
          </ModalBody>

          {/* <ModalFooter></ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdataGroupChatModal;
