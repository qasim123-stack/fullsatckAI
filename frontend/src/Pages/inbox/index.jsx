"use client";

import { useState, useEffect } from "react";
import "./indes.css";
import { Search, Star, Tag, MoreHorizontal, Paperclip, Send } from "lucide-react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export default function Inbox() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [usernames, setUsernames] = useState({}); // Store usernames as an object { userId: username }

  const handleChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Fetch all conversations
  const { data: conversations, isLoading, error } = useQuery({
    queryKey: ["conversations"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/conversations/getall", {
          withCredentials: true,
        });

        const fetchedConversations = response.data;
        fetchUsernames(fetchedConversations);
        return fetchedConversations;
      } catch (err) {
        console.error("Error fetching conversations:", err);
        throw err;
      }
    },
  });

  // Fetch a username based on user ID
  const getUsername = async (id) => {
    if (!id) return "Unknown User";
    try {
      const response = await axios.get(`http://localhost:8800/api/user/${id}`, {
        withCredentials: true,
      });
      return response.data.username || "Unknown User";
    } catch (err) {
      console.error("Error fetching username:", err);
      return "Unknown User";
    }
  };

  // Fetch all usernames related to conversations
  const fetchUsernames = async (conversations) => {
    let userMap = {};
    const promises = conversations.map(async (convo) => {
      const chatWithUserId =
        convo.buyerId === currentUser?._id ? convo.sellerId : convo.buyerId;

      if (chatWithUserId) {
        userMap[chatWithUserId] = await getUsername(chatWithUserId);
      }
    });

    await Promise.all(promises);
    setUsernames(userMap);
  };

  // Handle selecting a conversation
  const handleConversationClick = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8800/api/messages/${id}`, {
        withCredentials: true,
      });

      setMessages(response.data);
      setSelectedConversationId(id);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  // Send message
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversationId || !currentUser) return;

    try {
      const response = await axios.post(
        `http://localhost:8800/api/messages`,
        {
          desc: newMessage,
          conversationId: selectedConversationId,
          userId: currentUser._id,
        },
        {
          withCredentials: true,
        }
      );

      setMessages([...messages, response.data]);
      setNewMessage("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  return (
    <div className="inbox-container">
      {/* Left Sidebar */}
      <div className="sidebar">
        <div className="sidebar-header">
          <select className="message-filter">
            <option>All messages</option>
          </select>
          <Search className="search-icon" />
        </div>

        <div className="conversation-list">
          {conversations?.map((c) => {
            const chatWithUserId =
              c.buyerId === currentUser?._id ? c.sellerId : c.buyerId;
            return (
              <div
                key={c.id}
                className="conversation-item"
                onClick={() => handleConversationClick(c.id)}
              >
                <div className="avatar-wrapper"></div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <span className="username">
                      {usernames[chatWithUserId] || "Loading..."}
                    </span>
                    <span className="time"></span>
                  </div>
                  <p className="preview-message">Hey there</p>
                </div>
                <Star className="star-icon" size={16} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="chat-area">
        <div className="chat-header">
          <div className="chat-user-info">
            <span className="status-dot"></span>
            <span className="username">
              {selectedConversationId
                ? usernames[
                    conversations?.find((c) => c.id === selectedConversationId)
                      ?.buyerId === currentUser?._id
                      ? conversations?.find((c) => c.id === selectedConversationId)
                          ?.sellerId
                      : conversations?.find((c) => c.id === selectedConversationId)
                          ?.buyerId
                  ] || "Unknown User"
                : "Select a Conversation"}
            </span>
            <span className="last-seen">Last seen: Recently</span>
          </div>
          <div className="chat-actions">
            <Tag size={20} className="action-icon" />
            <Star size={20} className="action-icon" />
            <MoreHorizontal size={20} className="action-icon" />
          </div>
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length > 0 ? (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.userId === currentUser?.id
                    ? "message-sent"
                    : "message-received"
                }`}
              >
            
                <div className="message-content">
                  <div className="message-header">
                    <span className="message-username">
                      {msg.userId === currentUser?.id ? "You" : usernames[msg.userId] }
                    </span>
                    <span className="message-time">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="message-text">{msg.desc}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-messages">No messages yet...</p>
          )}
        </div>

        {/* Message Input */}
        <div className="message-input-container">
          <textarea
            placeholder="Send message..."
            className="message-input"
            onChange={handleChange}
            value={newMessage}
          />
          <div className="input-actions">
            <Paperclip size={20} className="action-icon" />
            <Send size={20} className="action-icon send" onClick={handleSendMessage} />
          </div>
        </div>
      </div>

      {/* Right Sidebar */}
      <div className="profile-sidebar">
        <div className="profile-header">
          <h2>About User</h2>
        </div>
        <div className="profile-info">
          <div className="info-row">
            <span className="info-label">From</span>
            <span className="info-value">Unknown</span>
          </div>
        </div>
      </div>
    </div>
  );
}
