import React from "react";
import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const [username, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  const postDetails = () => {};

  const submitHandler = async () => {
    if (!username || !email || !confirmpassword || !password) {
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
    if (password !== confirmpassword) {
      toast({
        title: "Password Does'nt match",
        description: "pasword and confirm password should be same",
        status: "warning",
        duration: 6000,
        isClosable: true,
        position: "bottom",
      });
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/user",
        { username, email, password, pic },
        config
      );

      toast({
        title: "Success",
        description: "Registration Successfull",
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

  const picLoading = () => {};

  return (
    <VStack spacing="5px">
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel>Email Address</FormLabel>
        <Input
          type="email"
          placeholder="Enter Your Email Address"
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="pic">
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>
      <Button
        colorScheme="cyan"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        //isLoading={picLoading}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
