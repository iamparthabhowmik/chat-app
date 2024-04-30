import React from "react";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/button";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const [show, setShow] = useState(false);

  const changeShow = () => setShow(!show);

  const toast = useToast();
  const history = useHistory();
  const { setUser } = ChatState();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setUser(data);
      localStorage.setItem("userInfo", JSON.stringify(data));

      // me

      // const { setUser } = ChatState();
      // // const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      // setUser(data);

      //

      setLoading(false);
      history.push("/chats");
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing="5px">
      <FormControl id="email" isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>

        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            value={password}
            placeholder="Enter Your Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={changeShow}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Login
      </Button>

      <Button
        variant={"solid"}
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@gmail.com");
          setPassword("welcome!");
        }}
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
