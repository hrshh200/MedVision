import React, { useState } from "react";
import "./Chatbot.css";
import { baseURL } from "../../../../frontend/src/main";
import axios from 'axios';

const Chatbot = () => {
  const [showChat, setShowChat] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [doctors, setDoctors] = useState([]); // ✅ NEW STATE

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    const userInput = input;
    setInput("");
    setDoctors([]); // ✅ Clear previous doctor list on new question

    try {
      const response = await axios.post(`${baseURL}/doctorchatbotfetchdata`, {
        doctorspecialist: userInput,
      });

      const fetchedDoctors = response.data.doctors;

      if (fetchedDoctors && fetchedDoctors.length > 0) {
        setDoctors(fetchedDoctors); // ✅ Save doctors in state
        const botMessage = {
          role: "bot",
          content: `Here are some ${userInput} specialists we found:`,
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        const botMessage = {
          role: "bot",
          content: response.data.message || "No doctors found for this specialty.",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage = {
        role: "bot",
        content: "Server error. Please try again later.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <div className="chatbot-icon" onClick={() => setShowChat(!showChat)}>💬</div>

      {showChat && (
        <div className="chatbot-container">
          <div className="chatbot-header">MedAssist</div>
          
          <div className="chatbot-messages">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.role === "user" ? "chatbot-user" : "chatbot-bot"}
              >
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-bot typing">
                <span className="dot"></span>
                <span className="dot"></span>
                <span className="dot"></span>
              </div>
            )}

            {/* ✅ Render doctors beautifully here */}
            {doctors.length > 0 && (
              <div className="doctor-list">
                {doctors.map((doc, idx) => (
                  <div className="doctor-card" key={idx}>
                    <h4>{doc.name}</h4>
                    <p><strong>Specialist:</strong> {doc.specialist}</p>
                    <p><strong>Experience:</strong> {doc.experience || "N/A"} years</p>
                    <p><strong>Location:</strong> {doc.location || "N/A"}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your question..."
            />
            <button onClick={handleSend}>▶</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
