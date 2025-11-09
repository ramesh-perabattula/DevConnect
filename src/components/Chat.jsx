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
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const isOwnMessage = (msgSenderId) => {
    return msgSenderId?.toString() === userId?.toString();
  };

  return (
    <div className="flex flex-col bg-base-200" style={{ height: 'calc(100vh - 200px)', minHeight: '500px' }}>
      <div className="max-w-3xl mx-auto w-full flex flex-col h-full">
        {/* Simple Header */}
        <div className="bg-base-100 border-b border-base-300 px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/connections")}
              className="btn btn-ghost btn-sm btn-circle"
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
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            {targetUser && (
              <>
                <div className="avatar">
                  <div className="w-10 rounded-full">
                    <img src={targetUser.photoUrl} alt={targetUser.firstName} />
                  </div>
                </div>
                <div>
                  <h2 className="font-semibold">
                    {targetUser.firstName} {targetUser.lastName}
                  </h2>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-3 min-h-0">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <p className="text-base-content/50">No messages yet</p>
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
                    className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                      ownMessage
                        ? "bg-primary text-primary-content"
                        : "bg-base-100 text-base-content"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap break-words">
                      {msg.text}
                    </p>
                    <p
                      className={`text-xs mt-1 ${
                        ownMessage ? "text-primary-content/70" : "text-base-content/50"
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
        <div className="bg-base-100 border-t border-base-300 p-3 flex-shrink-0">
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
              className="input input-bordered flex-1 focus:outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!newMessage.trim()}
              className="btn btn-primary btn-circle"
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
