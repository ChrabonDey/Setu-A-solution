import React, { useState, useRef } from "react";
import "./ChatX.css";

// Helper to get current time in HH:mm format
function getCurrentTime() {
  const d = new Date();
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const clientChats = [
  {
    name: "Alice Gray",
    img: "https://i.pravatar.cc/50?img=5",
    preview: "Can you update the site today?",
    role: "Client",
    lastMessageTime: getCurrentTime(),
  },
  {
    name: "Max Payne",
    img: "https://i.pravatar.cc/50?img=6",
    preview: "Let’s finalize the homepage",
    role: "Client",
    lastMessageTime: getCurrentTime(),
  },
];

const freelancerChats = [
  {
    name: "John Doe",
    img: "https://i.pravatar.cc/50?img=11",
    preview: "Logo design is done!",
    role: "Freelancer",
    lastMessageTime: getCurrentTime(),
  },
  {
    name: "Nina Smith",
    img: "https://i.pravatar.cc/50?img=12",
    preview: "Sent invoice yesterday",
    role: "Freelancer",
    lastMessageTime: getCurrentTime(),
  },
];

const defaultMessages = [
  {
    type: "received",
    text: "Hello, here are the project updates.",
    time: getCurrentTime(),
  },
  {
    type: "sent",
    text: "Great, thanks for the update!",
    time: getCurrentTime(),
  },
];

const attachmentOptions = [
  { icon: "photo_camera", label: "Photo" },
  { icon: "attach_file", label: "File" },
  { icon: "image", label: "Image" },
  { icon: "insert_drive_file", label: "Document" },
];

const ChatX = () => {
  const [chatType, setChatType] = useState("client");
  const [chatList, setChatList] = useState(chatType === "client" ? freelancerChats : clientChats);
  const [selectedChat, setSelectedChat] = useState(chatList[0]);
  const [messages, setMessages] = useState(defaultMessages);
  const [input, setInput] = useState("");
  const [showAttachment, setShowAttachment] = useState(false);
  const attachMenuRef = useRef(null);

  React.useEffect(() => {
    const chats = chatType === "client" ? freelancerChats : clientChats;
    setChatList(chats);
    setSelectedChat(chats[0]);
    setMessages([
      {
        type: "received",
        text: "Hello, here are the project updates.",
        time: getCurrentTime(),
      },
      {
        type: "sent",
        text: "Great, thanks for the update!",
        time: getCurrentTime(),
      },
    ]);
  }, [chatType]);

  // Close attachment menu if clicked outside
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (attachMenuRef.current && !attachMenuRef.current.contains(event.target)) {
        setShowAttachment(false);
      }
    }
    if (showAttachment) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showAttachment]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = { type: "sent", text: input, time: getCurrentTime() };
    setMessages([...messages, newMsg]);
    setInput("");

    // Update lastMessageTime for selected chat in chatList
    setChatList(prev =>
      prev.map(chat =>
        chat.name === selectedChat.name
          ? { ...chat, preview: input, lastMessageTime: newMsg.time }
          : chat
      )
    );

    setTimeout(() => {
      const reply = {
        type: "received",
        text: "Thanks for your message!",
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, reply]);
      // Also update lastMessageTime for selected chat
      setChatList(prev =>
        prev.map(chat =>
          chat.name === selectedChat.name
            ? { ...chat, preview: reply.text, lastMessageTime: reply.time }
            : chat
        )
      );
    }, 600);
  };

  const handleAttachmentClick = (option) => {
    alert(`You clicked ${option.label}`);
    setShowAttachment(false);
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    setMessages([
      {
        type: "received",
        text: "Hello, here are the project updates.",
        time: getCurrentTime(),
      },
      {
        type: "sent",
        text: "Great, thanks for the update!",
        time: getCurrentTime(),
      },
    ]);
  };

  return (
    <div className="chatx-modern-container">
      {/* Chat List */}
      <div className="chatx-section chatx-chat-list">
        <div className="chatx-chat-topbar">
          <div className="chatx-chat-toggle">
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
          <div className="chatx-settings">
            <span className="material-icons">settings</span>
          </div>
        </div>
        <div id="chatx-chatItems">
          {chatList.map((chat) => (
            <div
              key={chat.name}
              className={`chatx-chat-item${selectedChat?.name === chat.name ? " active" : ""}`}
              onClick={() => handleSelectChat(chat)}
            >
              <img src={chat.img} alt={chat.name} />
              <div className="chatx-chat-info">
                <div className="chatx-name">
                  {chat.name} ({chat.role})
                </div>
                <div className="chatx-preview">{chat.preview}</div>
              </div>
              <span className="chatx-chat-time">{chat.lastMessageTime}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Chat Window */}
      <div className="chatx-section chatx-chat-window">
        <div className="chatx-chat-header" id="chatx-chatHeader">
          <img src={selectedChat.img} alt={selectedChat.name} />
          <div>{selectedChat.name}</div>
        </div>
        <div className="chatx-chat-messages" id="chatx-chatMessages">
          {messages.map((msg, idx) => (
            <div className="chatx-message-row" key={idx}>
              <div className={`chatx-message chatx-${msg.type}`}>
                {msg.text}
              </div>
              <span className="chatx-message-time">{msg.time}</span>
            </div>
          ))}
        </div>
        <form className="chatx-chat-input" onSubmit={handleSend} style={{ position: "relative" }}>
          <button
            type="button"
            className="chatx-attach-btn"
            aria-label="Attachment"
            onClick={() => setShowAttachment((v) => !v)}
            tabIndex={0}
          >
            <span className="material-icons">attach_file</span>
          </button>
          {showAttachment && (
            <div className="chatx-attachment-menu" ref={attachMenuRef}>
              {attachmentOptions.map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => handleAttachmentClick(opt)}
                >
                  <span className="material-icons">{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          )}
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
      <div className="chatx-section chatx-details" id="chatx-userDetails">
        <img src={selectedChat.img} alt={selectedChat.name} />
        <h3>{selectedChat.name}</h3>
        <p>{selectedChat.role}</p>
        <div className="chatx-info-list">
          <div className="chatx-info-item">
            <span>Email:</span>{" "}
            {selectedChat.name.replace(/ /g, "").toLowerCase()}@example.com
          </div>
          <div className="chatx-info-item">
            <span>Phone:</span> +123-456-7890
          </div>
          <div className="chatx-info-item">
            <span>Job:</span> Example Project
          </div>
          <div className="chatx-info-item">
            <span>Status:</span> Ongoing
          </div>
        </div>
        <div className="chatx-job-box">
          <h4>Job Timeline</h4>
          <div className="chatx-job-row">
            <strong>Start:</strong> 01 June 2025
          </div>
          <div className="chatx-job-row">
            <strong>Finish:</strong> 20 June 2025
          </div>
        </div>
        <div className="chatx-actions">
          <button className="chatx-block">
            <span className="material-icons">block</span>
            Block
          </button>
          <button className="chatx-report">
            <span className="material-icons">report</span>
            Report
          </button>
          <button className="chatx-more">
            <span className="material-icons">more_horiz</span>
            More
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatX;