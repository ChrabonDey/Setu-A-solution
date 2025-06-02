import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { MentionsInput, Mention } from 'react-mentions';
import axios from 'axios';

export default function ChatApp({ userEmail }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [mentionUsers, setMentionUsers] = useState([]);
  const [username] = useState('User-' + Math.floor(Math.random() * 1000));

  const socketRef = useRef(null);
  const chatBoxRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('http://localhost:5000');

    if (userEmail) {
      socketRef.current.emit('register', userEmail);
    } else {
      socketRef.current.emit('register', username);
    }

    socketRef.current.on('receive_message', (data) => {
      setMessages((prev) => [...prev, data]);
    });

    socketRef.current.on('mentioned_notification', (notification) => {
      alert(`You were mentioned by ${notification.by}: "${notification.message}"`);
    });

    return () => socketRef.current.disconnect();
  }, [userEmail, username]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    axios.get('http://localhost:5000/mention-users')
      .then((res) => {
        // Validate and normalize data:
        const users = (res.data || []).map(user => ({
          id: user.id || user.email || '',
          display: user.display || user.name || '',
        })).filter(u => typeof u.id === 'string' && u.id.length > 0 && typeof u.display === 'string' && u.display.length > 0);

        setMentionUsers(users);
      })
      .catch((err) => console.error('Failed to fetch mention users:', err));
  }, []);

  const sendMessage = () => {
    if (!message.trim()) return;

    const msgData = {
      username,
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    socketRef.current.emit('send_message', msgData);
    setMessages((prev) => [...prev, msgData]);
    setMessage('');
  };

  // The important fix: onChange handler receives (event, newValue)
  const handleChange = (event, newValue) => {
    setMessage(newValue || '');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: '0 auto', padding: 16 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 16 }}>💬 Job Chat Room</h2>

      <div
        ref={chatBoxRef}
        style={{
          border: '1px solid #ddd',
          borderRadius: 8,
          padding: 16,
          height: 400,
          overflowY: 'auto',
          backgroundColor: 'white',
          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
        }}
      >
        {messages.map((msg, idx) => (
          <div key={idx} style={{ marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: '#666', marginBottom: 4 }}>
              <strong style={{ color: '#2563eb' }}>{msg.username}</strong> at {msg.timestamp}
            </p>
            <p
              style={{
                backgroundColor: '#ebf4ff',
                borderRadius: 6,
                padding: '8px 12px',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
              }}
            >
              {msg.message}
            </p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
        <MentionsInput
          value={message}
          onChange={handleChange}
          placeholder="Type @ to mention..."
          style={{
            control: {
              backgroundColor: '#fff',
              fontSize: 14,
              fontWeight: 'normal',
              border: '1px solid #ccc',
              borderRadius: 6,
              padding: 8,
              width: '100%',
              minHeight: 40,
            },
            highlighter: {
              padding: 8,
              border: '1px solid transparent',
            },
            input: {
              margin: 0,
            },
            suggestions: {
              list: {
                backgroundColor: 'white',
                border: '1px solid #ccc',
                fontSize: 14,
                maxHeight: 150,
                overflowY: 'auto',
              },
              item: {
                padding: '5px 15px',
                borderBottom: '1px solid #eee',
                cursor: 'pointer',
              },
              itemFocused: {
                backgroundColor: '#f0f0f0',
              },
            },
          }}
          markup="@[__display__](__id__)"
          onKeyDown={handleKeyDown}
        >
          <Mention
            trigger="@"
            data={mentionUsers}
            displayTransform={(id, display) => `@${display}`}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>

        <button
          onClick={sendMessage}
          style={{
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: 6,
            padding: '0 16px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
