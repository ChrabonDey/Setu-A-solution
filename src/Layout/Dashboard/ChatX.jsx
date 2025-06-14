import React, { useState } from "react";
import "./ChatX.css";

const clientChats = [
  {
    name: "Alice Gray",
    img: "https://i.pravatar.cc/50?img=5",
    preview: "Can you update the site today?",
    role: "Client",
  },
  {
    name: "Max Payne",
    img: "https://i.pravatar.cc/50?img=6",
    preview: "Let’s finalize the homepage",
    role: "Client",
  },
];

const freelancerChats = [
  {
    name: "John Doe",
    img: "https://i.pravatar.cc/50?img=11",
    preview: "Logo design is done!",
    role: "Freelancer",
  },
  {
    name: "Nina Smith",
    img: "https://i.pravatar.cc/50?img=12",
    preview: "Sent invoice yesterday",
    role: "Freelancer",
  },
];

const defaultMessages = [
  {
    type: "received",
    text: "Hello, here are the project updates.",
  },
  {
    type: "sent",
    text: "Great, thanks for the update!",
  },
];

const ChatX = () => {
  const [chatType, setChatType] = useState("client");
  const chats = chatType === "client" ? freelancerChats : clientChats;
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState("");

  React.useEffect(() => {
    setSelectedChat(chats[0]);
    setMessages(defaultMessages);
  }, [chatType]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { type: "sent", text: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          type: "received",
          text: "Thanks for your message!",
        },
      ]);
    }, 600);
  };

  return (
    <div className="chatx-modern-container">
      {/* Chat List */}
      <div className="section chat-list">
        <div className="chat-topbar">
          <div className="chat-toggle">
            <button
              className={chatType === "client" ? "active" : ""}
              onClick={() => setChatType("client")}
            >
              Client
            </button>
            <button
              className={chatType === "freelancer" ? "active" : ""}
              onClick={() => setChatType("freelancer")}
            >
              Freelancer
            </button>
          </div>
          <div className="settings">
            <span className="material-icons">settings</span>
          </div>
        </div>
        <div id="chatItems">
          {chats.map((chat, idx) => (
            <div
              key={chat.name}
              className={`chat-item ${selectedChat?.name === chat.name ? "active" : ""}`}
              onClick={() => {
                setSelectedChat(chat);
                setMessages(defaultMessages);
              }}
            >
              <img src={chat.img} alt={chat.name} />
              <div className="chat-info">
                <div className="name">
                  {chat.name} ({chat.role})
                </div>
                <div className="preview">{chat.preview}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Window */}
      <div className="section chat-window">
        <div className="chat-header" id="chatHeader">
          <img src={selectedChat.img} alt={selectedChat.name} />
          <div>{selectedChat.name}</div>
        </div>
        <div className="chat-messages" id="chatMessages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <form className="chat-input" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit">
            <span className="material-icons">send</span>
          </button>
        </form>
      </div>
      {/* User Details */}
      <div className="section details" id="userDetails">
        <img src={selectedChat.img} alt={selectedChat.name} />
        <h3>{selectedChat.name}</h3>
        <p>{selectedChat.role}</p>
        <div className="info-list">
          <div className="info-item">
            <span>Email:</span>{" "}
            {selectedChat.name.replace(/ /g, "").toLowerCase()}@example.com
          </div>
          <div className="info-item">
            <span>Phone:</span> +123-456-7890
          </div>
          <div className="info-item">
            <span>Job:</span> Example Project
          </div>
          <div className="info-item">
            <span>Status:</span> Ongoing
          </div>
        </div>
        <div className="job-box">
          <h4>Job Timeline</h4>
          <div className="job-row">
            <strong>Start:</strong> 01 June 2025
          </div>
          <div className="job-row">
            <strong>Finish:</strong> 20 June 2025
          </div>
        </div>
        <div className="actions">
          <button className="block">Block</button>
          <button className="report">Report</button>
          <button className="more">More</button>
        </div>
      </div>
    </div>
  );
};

export default ChatX;