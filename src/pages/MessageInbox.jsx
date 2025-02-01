// src/pages/MessageInbox.js
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function MessageInbox() {
  const { user } = useContext(AuthContext); // Logged-in user
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`https://travel-backend-lw95.onrender.com/api/messages/conversations/${user._id}`);
        const data = await response.json();
        setConversations(data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };

    fetchConversations();
  }, [user]);

  return (
    <div className="p-4">
    <h2 className="text-2xl font-semibold mb-4">Messages</h2>
    <div className="space-y-4">
      {Array.isArray(conversations) && conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Link
            key={conversation._id}
            to={`/messages/${user._id}/${conversation.user._id}`}
            className="block p-4 border rounded-lg bg-white shadow-md hover:bg-gray-100 transition"
          >
            <div className="flex justify-between items-center">
              <p className="text-xl font-semibold">{conversation.user.name}</p>
              <small className="text-gray-500">
                {new Date(conversation.lastMessage).toLocaleString()}
              </small>
            </div>
            <p className="text-gray-600 mt-2">{conversation.message}</p>
          </Link>
        ))
      ) : (
        <p>No conversations available.</p>
      )}
    </div>
  </div>
  );
}

export default MessageInbox;
