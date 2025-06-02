import React, { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SERVER_URL = 'http://localhost:5000';

const Chat = () => {
  const { email } = useParams(); // current logged-in user email
  const [access, setAccess] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [profiles, setProfiles] = useState({});
  const socketRef = useRef();

  useEffect(() => {
    if (!email) return;

    axios
      .get(`${SERVER_URL}/chat/access/${email}`)
      .then((res) => {
        setAccess(res.data.access);

        if (res.data.access) {
          socketRef.current = io(SERVER_URL);

          socketRef.current.emit('register', email);

          // Join a global room or default room
          socketRef.current.emit('join_room', 'global');

          axios
            .get(`${SERVER_URL}/chat/messages/global`)
            .then((res) => {
              setMessages(res.data || []);
              const uniqueEmails = [...new Set(res.data.map((msg) => msg.sender))];
              uniqueEmails.forEach(fetchProfile);
            });

          socketRef.current.on('receive_message', (msg) => {
            fetchProfile(msg.sender);
            setMessages((prev) => [...prev, msg]);
          });
        }
      })
      .catch((err) => {
        console.error('Access error:', err);
        setAccess(false);
      });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [email]);

  const fetchProfile = async (email) => {
    if (profiles[email]) return;
    try {
      const res = await fetch(`${SERVER_URL}/profile-data?email=${email}`);
      const data = await res.json();
      setProfiles((prev) => ({
        ...prev,
        [email]: { firstName: data.firstName, lastName: data.lastName },
      }));
    } catch (err) {
      console.error(`Failed to fetch profile for ${email}`, err);
    }
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const messageData = {
      sender: email,
      receiver: 'global', // or undefined if you're just using rooms
      content: input,
      timestamp: new Date().toISOString(),
    };

    socketRef.current.emit('send_message', messageData);
    setInput('');
  };

  if (access === null) return <div>Loading...</div>;
  if (access === false)
    return <div style={{ color: 'red', textAlign: 'center' }}>Access Denied</div>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Chat Room</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, idx) => {
          const isMine = msg.sender === email;
          const profile = profiles[msg.sender];
          const senderName = isMine
            ? 'You'
            : profile
            ? `${profile.firstName} ${profile.lastName}`
            : msg.sender;

          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                justifyContent: isMine ? 'flex-end' : 'flex-start',
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  ...styles.messageBubble,
                  backgroundColor: isMine ? '#0078fe' : '#e5e5ea',
                  color: isMine ? 'white' : 'black',
                  alignSelf: isMine ? 'flex-end' : 'flex-start',
                  borderTopLeftRadius: isMine ? 20 : 0,
                  borderTopRightRadius: isMine ? 0 : 20,
                }}
              >
                <div style={{ fontSize: 12, marginBottom: 4 }}>
                  <b>{senderName}</b>
                </div>
                <div>{msg.content}</div>
                <div style={styles.timestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            </div>
          );
        })}
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', opacity: 0.6 }}>No messages yet</p>
        )}
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={styles.input}
        />
        <button
          onClick={sendMessage}
          style={{
            ...styles.sendButton,
            backgroundColor: '#0078fe',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 600,
    margin: '0 auto',
    padding: 20,
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
  },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: 10,
    padding: 10,
    height: 400,
    overflowY: 'auto',
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
  },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    maxWidth: '70%',
  },
  timestamp: {
    fontSize: 10,
    marginTop: 5,
    textAlign: 'right',
    opacity: 0.6,
  },
  inputArea: {
    display: 'flex',
    gap: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 20,
    border: '1px solid #ccc',
    outline: 'none',
  },
  sendButton: {
    padding: '10px 20px',
    borderRadius: 20,
    color: 'white',
    border: 'none',
  },
};

export default Chat;
