import React from "react";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
//import { ChatState } from "../../Context/ChatProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const toast = useToast();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //const { setUser } = ChatState();

  const submitHandler = async () => {
    if (!email || !password) {
      toast({
        title: "fill all the fields",
        description: "all fields are mandatory",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
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
        title: "Success",
        description: "Login Successfull",
        status: "success",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });

      sessionStorage.setItem("UserInfo", JSON.stringify(data));
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something goes wrong",
        status: "error",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  const loading = () => {};

  return (
    <VStack spacing="10px">
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          value={email}
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type={show ? "text" : "password"}
            placeholder="Enter password"
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme="cyan"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        // isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant="solid"
        colorScheme="red"
        width="100%"
        onClick={() => {
          setEmail("guest@example.com");
          setPassword("123456");
        }}
      >
        Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
