import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';

import UseAxiosPublic from '../../hooks/UseAxiosPublic';
import { authContext } from '../../provider/Authprovider';

const socket = io('http://localhost:5000'); // replace with your backend URL if needed

const ChatRoom = () => {
  const { jobId } = useParams();
  const { user } = useContext(authContext)
  const [isAllowed, setIsAllowed] = useState(false);
  const [posterEmail, setPosterEmail] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const axiosPublic=UseAxiosPublic()

  // Check access and fetch emails
  useEffect(() => {
   
    const checkAccess = async () => {
      try {
        const res = await axiosPublic.get(`/chat/access-job/${jobId}`);
        const { jobPosterEmail, applicantEmail } = res.data;
        console.log(jobPosterEmail,applicantEmail)
         console.log(jobId)

        if (user?.email === jobPosterEmail || user?.email === applicantEmail) {
          setIsAllowed(true);
          setPosterEmail(jobPosterEmail);
          setApplicantEmail(applicantEmail);
        } else {
          alert("You are not authorized to view this chat.");
        }
      } catch (err) {
        console.error("Access check failed:", err);
        alert("Failed to verify chat access.");
      }
    };

    checkAccess();
  }, [jobId, user?.email]);

  // Load existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axiosPublic.get(`/chat/messages`);
        const filtered = res.data.filter(msg => msg.jobId === jobId);
        setMessages(filtered);
      } catch (err) {
        console.error('Error loading chat messages:', err);
      }
    };

    if (isAllowed) fetchMessages();
  }, [isAllowed, jobId]);

  // Join room and listen for messages
  useEffect(() => {
    if (!isAllowed) return;

    socket.emit('join_room', {
      jobId,
      userEmail: user?.email,
      otherEmail: user?.email === posterEmail ? applicantEmail : posterEmail,
    });

    socket.on('receive_message', (data) => {
      if (data.jobId === jobId) {
        setMessages(prev => [...prev, data]);
      }
    });

    return () => {
      socket.off('receive_message');
    };
  }, [isAllowed, jobId, user?.email, posterEmail, applicantEmail]);

  // Send message
  const handleSend = () => {
    if (!message.trim()) return;

    const msg = {
      sender: user?.email,
      receiver: user?.email === posterEmail ? applicantEmail : posterEmail,
      jobId,
      content: message,
    };

    socket.emit('send_message', msg);
    setMessage('');
  };

  if (!isAllowed) {
    return <p className="text-center mt-4 text-gray-500">Checking chat access...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Setu Chat Room</h2>
      <div className="border rounded p-4 h-[400px] overflow-y-auto bg-white shadow mb-4">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-2 ${msg.sender === user.email ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block px-3 py-2 rounded-xl max-w-xs ${
              msg.sender === user?.email ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'
            }`}>
              <p className="text-sm">{msg.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          className="flex-1 border rounded px-3 py-2"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSend}
        >
          Send
        </button> 
      </div>
    </div>
  );
};

export default ChatRoom;
