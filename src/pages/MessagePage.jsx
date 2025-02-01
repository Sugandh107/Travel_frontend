import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function MessagePage() {
  const { userId, recipientId } = useParams();
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipientInfo, setRecipientInfo] = useState(null);
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  // Fetch messages and recipient info
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch messages
        const messagesResponse = await fetch(
          `http://localhost:5000/api/messages/${userId}/${recipientId}`
        );
        const messagesData = await messagesResponse.json();
        setMessages(messagesData);

        // Fetch recipient info
        const recipientResponse = await fetch(
          `http://localhost:5000/api/users/${recipientId}`
        );
        const recipientData = await recipientResponse.json();
        setRecipientInfo(recipientData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, [userId, recipientId]);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sender: userId,
          receiver: recipientId,
          content: newMessage,
        }),
      });
      const sentMessage = await response.json();
      setMessages((prevMessages) => [...prevMessages, sentMessage]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  // Handle Enter key for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Back to chat list
  const handleBackToChats = () => {
    navigate('/chat');
  };

  // View recipient profile
  const handleViewProfile = () => {
    navigate(`/user/${recipientId}`);
  };

  if (!recipientInfo) return <div>Loading...</div>;

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center">
          <img 
            src={recipientInfo.photoURL} 
            alt={recipientInfo.name} 
            className="w-10 h-10 rounded-full mr-3"
          />
          <div>
            <h2 className="text-xl font-semibold">{recipientInfo.name}</h2>
            <p className="text-sm text-gray-500"></p>
          </div>
        </div>
        <div>
          <button 
            onClick={handleViewProfile}
            className="mr-3 text-blue-500 hover:underline"
          >
            View Profile
          </button>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-grow overflow-y-auto p-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex mb-4 ${message.sender === userId ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-md p-3 rounded-lg ${
                message.sender === userId 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-black'
              }`}
            >
              <p>{message.content}</p>
              <small className={`text-xs ${
                message.sender === userId 
                  ? 'text-blue-200' 
                  : 'text-gray-500'
              }`}>
                {new Date(message.timestamp).toLocaleString()}
              </small>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white p-4 border-t">
        <div className="flex">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l-lg resize-none"
            rows="3"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default MessagePage;