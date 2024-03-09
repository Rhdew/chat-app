import React, { useEffect, useState } from "react";
import axios from "axios";

const ChatPage = () => {
  const [chats, setChats] = useState([]);
  const getChats = async () => {
    console.log("start now");
    const { data } = await axios.get("/api/data");
    //console.log("data", data.chats);
    setChats(data.chats);
  };
  // console.log(chats);
  // chats.forEach((chat) => console.log(chat.chatName));

  useEffect(() => {
    getChats();
  }, []);

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id}>{chat.chatName}</div>
      ))}
    </div>
  );
};

export default ChatPage;
