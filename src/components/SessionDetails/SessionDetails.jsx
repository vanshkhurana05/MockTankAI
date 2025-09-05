import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";
import bgImage from "../../assets/bo2.png";
import "./SessionDetails.css";

const SessionDetails = () => {
  const { currentUser } = useAuth();
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bottomRef = useRef(null);

  useEffect(() => {
    if (!currentUser) return;

    const fetchSession = async () => {
      try {
        const response = await fetch(
          `https://mocktankbackend-i0js.onrender.com/users/${currentUser.uid}/sessions/${sessionId}`
        );

        if (!response.ok) throw new Error(`Error: ${response.status}`);

        const data = await response.json();
        console.log("Session details:", data);
        setSessionData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [currentUser, sessionId]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [sessionData?.chats]);

  if (!currentUser) return <p>Please sign in to view session.</p>;
  if (loading) return <p>Loading session...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div
      className="session-page"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <Navbar />

      <div className="session-wrapper">
        <h2 className="page-title">Chat Session</h2>
        {/* <p className="page-subtitle">Session ID: {sessionId}</p> */}

        {sessionData?.chats ? (
          <div className="chat-window">
            {sessionData.chats.map((chat) => (
              <div
                key={chat._id}
                className={`chat-bubble ${chat.speaker === "user" ? "user" : "investor"}`}
              >
                {/* Speaker name above text */}
                <div className="chat-speaker">
                  {chat.speaker === "user" ? "You" : chat.name || "Investor"} :
                </div>

                {/* Actual message */}
                <span className="chat-text">{chat.text}</span>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        ) : (
          <p className="status-msg">No chats found.</p>
        )}
      </div>
    </div>
  );
};

export default SessionDetails;


