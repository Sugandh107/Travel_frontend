import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function Message() {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { user } = useContext(AuthContext); // Logged-in user
  const navigate = useNavigate();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/chats/${user._id}`);
        const chatData = await response.json();
        setChats(chatData);
      } catch (err) {
        console.error('Error fetching chats:', err);
      }
    };

    fetchChats();
  }, [user]);

  const selectChat = async (chat) => {
    setActiveChat(chat);

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${chat._id}`);
      const messagesData = await response.json();
      setMessages(messagesData);
    } catch (err) {
      console.error('Error fetching messages:', err);
    }
  };

  const sendMessage = async () => {
    if (!newMessage || !activeChat) return;

    try {
      const response = await fetch('http://localhost:5000/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chatId: activeChat._id,
          senderId: user._id,
          content: newMessage,
        }),
      });

      const newMessageData = await response.json();
      setMessages((prevMessages) => [...prevMessages, newMessageData]);
      setNewMessage('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Chat List */}
      <div className="w-1/3 border-r overflow-y-auto">
        <h2 className="text-lg font-bold p-4 border-b">Chats</h2>
        {chats.map((chat) => (
          <div
            key={chat._id}
            onClick={() => selectChat(chat)}
            className={`p-4 cursor-pointer hover:bg-gray-100 ${
              activeChat?._id === chat._id ? 'bg-gray-200' : ''
            }`}
          >
            <div className="flex items-center gap-2">
              <img
                src={chat.participants.find((p) => p._id !== user._id).photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">
                  {chat.participants.find((p) => p._id !== user._id).name}
                </p>
                <p className="text-sm text-gray-500">{chat.lastMessage}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Messages Section */}
      <div className="w-2/3 flex flex-col">
        {activeChat ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b">
              <h2 className="text-lg font-bold">
                Chat with{' '}
                {activeChat.participants.find((p) => p._id !== user._id).name}
              </h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message) => (
                <div
                  key={message._id}
                  className={`p-2 rounded ${
                    message.senderId === user._id ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'
                  }`}
                >
                  {message.content}
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded p-2"
              />
              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500">Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Message;
