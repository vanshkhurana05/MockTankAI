import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import CameraPreview from "../CameraPreview/CameraPreview";
import "./Simulation.css";
import { FaMicrophone, FaStop, FaChartLine, FaUser, FaBuilding } from "react-icons/fa";

import shreya from "../../assets/shreya.mp4";
import ananya from "../../assets/ananya.mp4";

const ShimmerLoading = () => (
  <div className="shimmer-container">
    <div className="shimmer-bar"></div>
    <div className="shimmer-bar" style={{ width: "80%" }}></div>
  </div>
);

const Simulation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [userSpeech, setUserSpeech] = useState("");
  const [investorResponse, setInvestorResponse] = useState("");
  const [displayedResponse, setDisplayedResponse] = useState("");
  const [isInvestorSpeaking, setIsInvestorSpeaking] = useState(false);

  const recognitionRef = useRef(null);

  // Video Refs
  const videoRef1 = useRef(null);
  const videoRefMain = useRef(null);
  const videoRef3 = useRef(null);

  // Play/pause logic: only pause when loading/fetching
  useEffect(() => {
    const videoMain = videoRefMain.current;
    const video1 = videoRef1.current;
    const video3 = videoRef3.current;

    if (!videoMain || !video1 || !video3) return;

    if (isLoading || !investorResponse) {
      videoMain.pause();
      video1.pause();
      video3.pause();
    } else {
      videoMain.play();
      video1.pause();
      video3.pause();
    }
  }, [isLoading, investorResponse]);

  // === API Call ===
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

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = async (event) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript + " ";
        }
      }
      if (finalTranscript.trim()) {
        setUserSpeech(finalTranscript.trim());
        setIsLoading(true);
        setDisplayedResponse("");
        setInvestorResponse("");

        const aiResponse = await fetchAiResponse(finalTranscript.trim());
        setIsLoading(false);
        if (aiResponse && aiResponse[1]?.[1]?.content) {
          const responseText = aiResponse[1][1].content;
          setInvestorResponse(responseText);
          speakText(responseText);
        }
      }
    };

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, []);

  // Typing animation for investor response
  useEffect(() => {
    if (investorResponse) {
      let i = 0;
      const interval = setInterval(() => {
        if (i < investorResponse.length) {
          setDisplayedResponse((prev) => prev + investorResponse.charAt(i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 25);
      return () => clearInterval(interval);
    }
  }, [investorResponse]);

  const handleStartRecording = () => {
    if (recognitionRef.current) {
      setUserSpeech("");
      setInvestorResponse("");
      setDisplayedResponse("");
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // === Speak only after response is ready ===
  const speakText = (text) => {
    if (!text || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";

    utterance.onstart = () => {
      setIsInvestorSpeaking(true);
    };

    utterance.onend = () => {
      setIsInvestorSpeaking(false);
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="exec-simulation-page">
      <Navbar />
      <div className="exec-layout">
        {/* Investors */}
        <div className="investor-gallery">
          <div className={`investor-card ${isInvestorSpeaking ? "speaking" : ""}`}>
            <div className="investor-video-placeholder">
              <video ref={videoRef1} src={shreya} muted playsInline loop></video>
            </div>
            <p className="investor-name">Sarah Chen</p>
          </div>

          <div className={`investor-card main ${isInvestorSpeaking ? "speaking" : ""}`}>
            <div className="investor-video-placeholder">
              <video ref={videoRefMain} src={ananya} muted loop playsInline></video>
            </div>
            <p className="investor-name">David Lee</p>
          </div>

          <div className="investor-card">
            <div className="investor-video-placeholder">
              <video
                ref={videoRef3}
                src="https://assets.mixkit.co/videos/preview/mixkit-businesswoman-in-a-modern-office-4333-large.mp4"
                muted
                playsInline
              ></video>
            </div>
            <p className="investor-name">Michael Rodriguez</p>
          </div>
        </div>

        {/* Right side panels */}
        <div className="main-content-grid">
          {/* Transcript */}
          <div className="content-panel conversation-panel">
            <h3 className="panel-header">Conversation Transcript</h3>
            <div className="conversation-log">
              <div className="log-bubble user">
                <div className="bubble-header">
                  <FaUser /> You
                </div>
                <p className="bubble-text">
                  {userSpeech || "Your transcribed speech will appear here..."}
                </p>
              </div>

              <div className="log-bubble investor">
                <div className="bubble-header">
                  <FaBuilding /> Investor
                </div>
                <div className="bubble-text">
                  {isLoading ? (
                    <ShimmerLoading />
                  ) : (
                    <p>
                      {displayedResponse}
                      <span className="typing-cursor"></span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User camera + controls */}
          <div className="content-panel user-panel">
            <h3 className="panel-header">Your Feed & Controls</h3>
            <div className="camera-container">
              <CameraPreview />
            </div>
            <div className="controls-container">
              <button
                className={`exec-button primary ${isRecording ? "recording" : ""}`}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
                {isRecording ? "Stop Pitch" : "Start Pitch"}
              </button>
              <button className="exec-button secondary">
                <FaChartLine />
                Deep Analysis
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

