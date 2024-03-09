import Home from "./pages/HomePage";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exect path="/" element={<Home />} />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
