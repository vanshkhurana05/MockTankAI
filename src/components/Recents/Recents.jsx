import React, { useEffect, useState } from "react";
import "./Recents.css";
import { FaUser, FaBuilding, FaComments } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../Navbar/Navbar";

const Recents = () => {
  const { currentUser, authLoading } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistory() {
      if (authLoading) return; // wait until Firebase auth is ready

      if (!currentUser) {
        setError("Please sign in to view your conversations.");
        setLoading(false);
        return;
      }

      try {
        const uid = currentUser.uid;
        const response = await fetch(
          `https://mocktankbackend-i0js.onrender.com/get_chats/${uid}`
        );

        if (!response.ok) throw new Error("Failed to fetch history");

        const data = await response.json();
        console.log("Fetched Final History:", data);
        console.log("Data history:", data.history);
        // setHistory(data.history || []);
      } catch (err) {
        console.error("Error fetching history:", err);
        setError("Could not load recent conversation.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [currentUser, authLoading]);

  if (authLoading) {
    return (
      <div className="recents-page">
        <div className="recents-header">
          <FaComments /> Recent Conversation
        </div>
        <p className="empty-text">Checking authentication...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="recents-page">
        <div className="recents-header">
          <FaComments /> Recent Conversation
        </div>
        <p className="empty-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="recents-page">
        <div className="recents-header">
          <FaComments /> Recent Conversation
        </div>
        <p className="empty-text">{error}</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="recents-page">
        <Navbar />
        <div className="recents-header">
          <FaComments /> Recent Conversation
        </div>
        <p className="empty-text">No messages found.</p>
      </div>
    );
  }

  return (
    <div className="recents-page">
      <Navbar />
      <div className="recents-header">
        <FaComments /> Recent Conversation
      </div>

      <div className="conversation-list">
        {history.map((msg, index) => (
          <div
            key={index}
            className={`conversation-card ${
              msg.speaker === "user" ? "user-msg" : "investor-msg"
            }`}
          >
            <div className="card-header">
              {msg.speaker === "user" ? (
                <>
                  <FaUser className="icon user-icon" />
                  <span>You</span>
                </>
              ) : (
                <>
                  <FaBuilding className="icon investor-icon" />
                  <span>{msg.name || "Investor"}</span>
                </>
              )}
            </div>
            <div className="card-body">{msg.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recents;




