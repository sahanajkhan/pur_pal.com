import React, { useState, useEffect, useRef } from 'react';
import './PageStyles.css';

const Messages = () => {
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  
  const messagesEndRef = useRef(null);
  
  // Get logged in user from localStorage
  const studentStr = localStorage.getItem('student');
  const currentUser = studentStr ? JSON.parse(studentStr) : null;
  const token = localStorage.getItem('token') || (currentUser ? currentUser.token : null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUsers();
    }
  }, [token]);

  // Fetch messages when an active user is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeUser) return;
      
      try {
        const res = await fetch(`http://localhost:5000/api/messages/${activeUser._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        if (data.success) {
          setMessages(data.data);
          scrollToBottom();
        }
      } catch (error) {
        console.error('Failed to fetch messages:', error);
      }
    };

    if (token && activeUser) {
      fetchMessages();
    }
  }, [activeUser, token]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/messages/${activeUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text: newMessage })
      });
      const data = await res.json();
      
      if (data.success) {
        setMessages([...messages, data.data]);
        setNewMessage('');
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  return (
    <div className="page-container fade-in">
      <h1 className="page-title">Your <span className="highlight">Messages</span></h1>
      <p className="page-subtitle">Connect and collaborate through direct messages.</p>
      
      <div className="messages-layout">
        {/* Sidebar: User List */}
        <div className="messages-sidebar">
          <div className="messages-sidebar-header">Connections</div>
          <div className="user-list">
            {loading ? (
              <p style={{ padding: '1rem', color: '#64748b' }}>Loading connections...</p>
            ) : users.length === 0 ? (
              <p style={{ padding: '1rem', color: '#64748b' }}>No connections found.</p>
            ) : (
              users.map(user => (
                <div 
                  key={user._id} 
                  className={`user-item ${activeUser && activeUser._id === user._id ? 'active' : ''}`}
                  onClick={() => setActiveUser(user)}
                >
                  <div className="user-item-avatar">
                    {user.name.charAt(0)}
                  </div>
                  <div className="user-item-info">
                    <h4>{user.name}</h4>
                    <p>Start a conversation</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Main Content: Chat Area */}
        {activeUser ? (
          <div className="chat-area">
            <div className="chat-header">
              <div className="chat-header-avatar">
                {activeUser.name.charAt(0)}
              </div>
              <h3>{activeUser.name}</h3>
            </div>
            
            <div className="chat-messages">
              {messages.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '2rem', color: '#64748b' }}>
                  No messages yet. Say hello! 👋
                </div>
              ) : (
                messages.map(msg => {
                  const isSentByMe = Boolean(msg.sender === currentUser._id);
                  return (
                    <div 
                      key={msg._id} 
                      className={`message-bubble ${isSentByMe ? 'sent' : 'received'}`}
                    >
                      {msg.text}
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>
            
            <form className="chat-input-area" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                className="chat-input" 
                placeholder="Type a message..." 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button 
                type="submit" 
                className="send-btn"
                disabled={!newMessage.trim()}
              >
                Send
              </button>
            </form>
          </div>
        ) : (
          <div className="no-chat-selected">
            <div className="no-chat-icon">💬</div>
            <h2>Select a conversation</h2>
            <p>Choose someone from your connections to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
