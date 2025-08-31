import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import CameraPreview from "../CameraPreview/CameraPreview";
import "./Simulation.css";

const Simulation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState("");
  const [investorRes, setInvestorRes] = useState("");
  const recognitionRef = useRef(null);

  // Fetch AI response function
  const fetchAiResponse = async (text) => {
    try {
      const response = await fetch(
        "https://mocktankbackend-i0js.onrender.com/submit_text_to_chat",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ approvedText: text }),
        }
      );
      return await response.json();
    } catch (err) {
      console.error("Error calling AI API:", err);
      return { error: "Failed to get AI response" };
    }
  };

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      // Update speechText for UI with live text
      setSpeechText((prev) => finalTranscript + interimTranscript);

      // Only call AI when there is a new final transcript
      if (finalTranscript.trim()) {
        const aiResponse = await fetchAiResponse(finalTranscript.trim());
        console.log("AI Response:", aiResponse[1][1].content);

        // You can update state here to show AI response in UI
        setInvestorRes(aiResponse[1][1].content);
        speakText(aiResponse[1][1].content); // Speak the AI response
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
      setSpeechText(""); // Clear text after stopping
    }
  };
  // Function to speak text
const speakText = (text) => {
  if (!text) return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 1;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
};

  return (
    <div className="simulation-page">
      <Navbar />
      <div className="simulation-container">
        <div className="simulation-content">
          <div className="left-column">
            <div className="image-placeholder">
              <img src="../../../public/investor.jpg" alt="investor" />
            </div>
            <div className="controls">
              <button
                className={`start-button ${isRecording ? "recording" : ""}`}
                onClick={
                  isRecording ? handleStopRecording : handleStartRecording
                }
              >
                {isRecording ? "Stop Simulation" : "Start Simulation"}
              </button>
              <button className="analysis-button">Deep Analysis</button>
            </div>
          </div>

          <div className="right-column">
            <div className="speech-preview">
              <h3>Your Speech</h3>
              <textarea
                className="speech-text"
                placeholder="Your speech will appear here..."
                value={speechText}
                onChange={(e) => setSpeechText(e.target.value)}
              />
            </div>

            <div className="camera-section">
              <h3>Live Camera View</h3>
              <CameraPreview />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;
