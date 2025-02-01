import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';
import useUserData from '../hooks/useUserData';

function ChatPage() {
  const { user } = useContext(AuthContext);
  const [conversations, setConversations] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { userData, loading, error } = useUserData(user?.email);
  // Fetch conversations for the logged-in user
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/messages/conversations/${userData?._id}`);
        const data = await response.json();
        setConversations(data);
      } catch (err) {
        console.error('Error fetching conversations:', err);
      }
    };

    // Fetch all users to enable messaging
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        // Remove the current user from the list
        setAllUsers(data.filter(u => u._id !== user._id));
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };

    if (user?._id) {
      fetchConversations();
      fetchUsers();
    }
  }, [user]);

  // Open message thread with a specific user
  const openMessageThread = (otherUserId) => {
    navigate(`/messages/${userData?._id}/${otherUserId}`);
  };

  // Filter users for search
  const filteredUsers = allUsers.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Users Sidebar */}
      <div className="w-1/3 border-r p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Chats</h2>
        
        {/* Search Input */}
        <input 
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />

        {/* Recent Conversations */}
        <h3 className="font-semibold mb-2">Recent Conversations</h3>
        {conversations.length > 0 ? (
          conversations.map((conv, index) => (
            <div 
              key={index} 
              onClick={() => openMessageThread(conv.user._id)}
              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer rounded"
            >
              <img 
                src={conv.user.photoURL} 
                alt={conv.user.name} 
                className="w-10 h-10 rounded-full mr-3"
              />
              <div className="flex-grow">
                <p className="font-medium">{conv.user.name}</p>
                <p className="text-sm text-gray-500 truncate">
                  {conv.lastMessage}
                </p>
              </div>
              <small className="ml-auto text-xs text-gray-500">
                {new Date(conv.lastMessageTime).toLocaleTimeString()}
              </small>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No recent conversations</p>
        )}
      </div>

      {/* Users List */}
      <div className="w-2/3 p-4 overflow-y-auto">
        <h3 className="text-xl font-semibold mb-4">Start a New Chat</h3>
        {filteredUsers.map((u) => (
          <div 
            key={u._id} 
            className="flex items-center justify-between p-3 border-b hover:bg-gray-50"
          >
            <div className="flex items-center">
              <img 
                src={u.photoURL} 
                alt={u.name} 
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium">{u.name}</p>
                <p className="text-sm text-gray-500">{u.email}</p>
              </div>
            </div>
            <button 
              onClick={() => openMessageThread(u._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Message
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatPage;