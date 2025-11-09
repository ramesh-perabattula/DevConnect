import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [targetUser, setTargetUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchTargetUser = async () => {
    try {
      // Get target user info from connections
      const connectionsRes = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      const targetUserData = connectionsRes.data.data.find(
        (conn) => conn._id === targetUserId
      );
      if (targetUserData) {
        setTargetUser(targetUserData);
      }
    } catch (err) {
      console.error("Error fetching target user:", err);
    }
  };

  const fetchChatMessages = async () => {
    try {
      setIsLoading(true);
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text, createdAt } = msg;
        return {
          senderId: senderId?._id || senderId,
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
          createdAt: createdAt ? new Date(createdAt) : new Date(),
        };
      });
      setMessages(chatMessages || []);
    } catch (err) {
      console.error("Error fetching chat messages:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (targetUserId) {
      fetchTargetUser();
      fetchChatMessages();
    }
  }, [targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!userId || !targetUserId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text, senderId: receivedSenderId }) => {
      // Ignore our own messages since we add them optimistically
      if (receivedSenderId && receivedSenderId.toString() === userId.toString()) {
        return;
      }
      
      // Add message from the other user
      setMessages((prevMessages) => {
        // Check for duplicates based on text and sender
        const isDuplicate = prevMessages.some(
          (msg) => msg.text === text && 
                   msg.senderId?.toString() === (receivedSenderId || targetUserId).toString() &&
                   Math.abs(new Date(msg.createdAt) - new Date()) < 2000 // Within 2 seconds
        );
        if (isDuplicate) return prevMessages;
        
        return [
          ...prevMessages,
          {
            senderId: receivedSenderId || targetUserId,
            firstName,
            lastName,
            text,
            createdAt: new Date(),
          },
        ];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user.firstName]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const messageText = newMessage.trim();
    setNewMessage("");

    // Optimistically add message to UI
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: userId,
        firstName: user.firstName,
        lastName: user.lastName,
        text: messageText,
        createdAt: new Date(),
      },
    ]);

    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: messageText,
    });
  };

  const formatTime = (date) => {
    if (!date) return "";
    const messageDate = new Date(date);
    const hours = messageDate.getHours();
    const minutes = messageDate.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${minutes.toString().padStart(2, "0")} ${ampm}`;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <svg className="animate-spin h-12 w-12 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-gray-600 font-medium">Loading chat...</p>
        </div>
      </div>
    );
  }

  const isOwnMessage = (msgSenderId) => {
    return msgSenderId?.toString() === userId?.toString();
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-160px)] bg-gray-50 py-4 px-2 sm:px-4">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 180px)', maxHeight: '700px' }}>
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/connections")}
              className="p-2 rounded-full hover:bg-white/20 transition-colors flex-shrink-0"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {targetUser && (
              <>
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-blue-500">
                    <img 
                      src={targetUser.photoUrl} 
                      alt={targetUser.firstName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="font-semibold text-white truncate text-sm sm:text-base">
                    {targetUser.firstName} {targetUser.lastName}
                  </h2>
                  <p className="text-xs text-blue-100">Online</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0 bg-gray-50">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg, index) => {
              const ownMessage = isOwnMessage(msg.senderId);
              return (
                <div
                  key={index}
                  className={`flex ${ownMessage ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] sm:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-sm ${
                      ownMessage
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-1.5 ${
                        ownMessage ? "text-blue-100" : "text-gray-400"
                      }`}
                    >
                      {formatTime(msg.createdAt)}
                    </p>
                  </div>
                </div>
              );
            })
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="bg-white border-t border-gray-200 p-3 sm:p-4 flex-shrink-0">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Type a message..."
              className="flex-1 px-4 py-2.5 rounded-full border-2 border-gray-300 focus:outline-none focus:border-blue-500 text-sm sm:text-base"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="p-2.5 sm:p-3 rounded-full bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 flex-shrink-0 shadow-md"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
