import React from "react";
import { Box, Container, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        bg={"whitesmoke"}
        p={3}
        borderRadius="10px"
        borderWidth="2px"
        m="40px 0 15px 0"
        w="100%"
        border="2px solid cyan"
      >
        <Text
          fontSize="x-large"
          fontFamily="Ojuju"
          color="black"
          textAlign="center"
        >
          Let's Chat
        </Text>
      </Box>
      <Box
        bg={"whitesmoke"}
        p={4}
        borderRadius="10px"
        borderWidth="2px"
        w="100%"
        border="2px solid cyan"
        fontFamily="work-sans"
        color="black"
      >
        <Tabs variant="soft-rounded" colorScheme="cyan">
          <TabList mb="1em">
            <Tab width="50%">Login</Tab>
            <Tab width="50%">Register</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Register />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
