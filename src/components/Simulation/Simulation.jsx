import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import CameraPreview from "../CameraPreview/CameraPreview";
import "./Simulation.css";
import {
  FaMicrophone,
  FaStop,
  FaChartLine,
  FaUser,
  FaBuilding,
} from "react-icons/fa";
import henry from "../../assets/henry.mp4";
import shreya from "../../assets/shreya.mp4";
import ananya from "../../assets/ananya.mp4";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

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
  const [activeSpeaker, setActiveSpeaker] = useState("Ananya Mehra");
  const [availableVoices, setAvailableVoices] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  const recognitionRef = useRef(null);
  const videoRefShreya = useRef(null);
  const videoRefAnanya = useRef(null);
  const videoRefHenry = useRef(null);
  const navigate = useNavigate();

  const { currentUser } = useAuth();

  const investorVideoRefs = {
    "Shreya Malhotra": videoRefShreya,
    "Ananya Mehra": videoRefAnanya,
    "Henry Collins": videoRefHenry,
  };

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
    };
    window.speechSynthesis.onvoiceschanged = loadVoices;
    loadVoices();

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  useEffect(() => {
    const initialMessage =
      "Hello. When you're ready to present your pitch, press the 'Start Pitch' button below.";

    setChatHistory([
      { speaker: "investor", name: "Ananya Mehra", text: initialMessage },
    ]);
    setInvestorResponse(initialMessage);

    const speakTimeout = setTimeout(() => {
      setActiveSpeaker("Ananya Mehra");
      speakText(initialMessage, "Ananya Mehra");
    }, 500);

    return () => clearTimeout(speakTimeout);
  }, [availableVoices]);

  useEffect(() => {
    if (isRecording || isLoading) {
      Object.values(investorVideoRefs).forEach(
        (ref) => ref.current && ref.current.pause()
      );
      return;
    }
    
    if (activeSpeaker && isInvestorSpeaking) {
      for (const [name, ref] of Object.entries(investorVideoRefs)) {
        if (ref.current) {
          if (name === activeSpeaker) {
            ref.current
              .play()
              .catch((error) => console.error("Video play failed:", error));
          } else {
            ref.current.pause();
          }
        }
      }
    } else {
      Object.values(investorVideoRefs).forEach(
        (ref) => ref.current && ref.current.pause()
      );
    }
  }, [isLoading, activeSpeaker, isInvestorSpeaking, isRecording]);

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
      const data = await response.json();
      console.log("AI Response:", data);
      return data;
    } catch (err) {
      console.error("Error calling AI API:", err);
      return { error: "Failed to get AI response" };
    }
  };

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
        const userText = finalTranscript.trim();

        setChatHistory((prev) => [
          ...prev,
          { speaker: "user", text: userText },
        ]);
        setUserSpeech(userText);

        setIsLoading(true);
        setDisplayedResponse("");
        setInvestorResponse("");
        setActiveSpeaker(null);
        Object.values(investorVideoRefs).forEach(
          (ref) => ref.current && ref.current.pause()
        );

        const aiResponse = await fetchAiResponse(userText);
        setIsLoading(false);

        if (aiResponse && aiResponse[1]?.[1]?.content) {
          const fullResponseText = aiResponse[1][1].content;
          // Use the current_investor from the response instead of parsing text
          const speakerName = aiResponse[2].current_investor || "Ananya Mehra";
          const messageText = fullResponseText;

          setChatHistory((prev) => [
            ...prev,
            { speaker: "investor", name: speakerName, text: messageText },
          ]);

          setActiveSpeaker(speakerName);
          setInvestorResponse(messageText);
          speakText(messageText, speakerName);
        } else {
          const errorMsg = "Sorry, I couldn't process that. Please try again.";
          setChatHistory((prev) => [
            ...prev,
            { speaker: "investor", name: "System", text: errorMsg },
          ]);
          setInvestorResponse(errorMsg);
          speakText(errorMsg, "Ananya Mehra");
        }
      }
    };

    recognitionRef.current = recognition;
    return () => recognition.stop();
  }, [availableVoices]);

  useEffect(() => {
    if (investorResponse) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= investorResponse.length) {
          setDisplayedResponse(investorResponse.substring(0, i));
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

  const getVoiceForInvestor = (investorName) => {
    const femaleVoices = availableVoices.filter(
      (voice) =>
        voice.lang.startsWith("en-") &&
        (voice.name.includes("Female") || voice.gender === "female")
    );
    if (femaleVoices.length === 0) return null;

    if (investorName === "Shreya Malhotra") {
      return femaleVoices[0 % femaleVoices.length];
    } else if (investorName === "Ananya Mehra") {
      return femaleVoices[1 % femaleVoices.length] || femaleVoices[0];
    } else {
      const maleVoices = availableVoices.filter(
        (voice) =>
          voice.lang.startsWith("en-") &&
          (voice.name.includes("Male") || voice.gender === "male")
      );
      return maleVoices.length > 0 ? maleVoices[0] : femaleVoices[0];
    }
  };

  const speakText = (text, speakerName) => {
    if (!text || !window.speechSynthesis) return;

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = getVoiceForInvestor(speakerName);
    if (voice) {
      utterance.voice = voice;
    }
    utterance.lang = "en-US";
    utterance.onstart = () => setIsInvestorSpeaking(true);
    utterance.onend = () => setIsInvestorSpeaking(false);

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  async function handleEndChat() {
    if (!currentUser) {
      console.error("User not logged in, cannot save session.");
      return;
    }

    const uid = currentUser.uid;
    console.log("--- CHAT ENDED ---");
    console.log("Final History:", chatHistory);

    try {
      const formattedConversation = chatHistory.map((message) => ({
        role: message.speaker === "user" ? "user" : "System",
        content: message.text,
      }));

      const analysisResponse = await fetch(
        "https://mocktankbackend-i0js.onrender.com/analyse",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            conversation: formattedConversation,
          }),
        }
      );

      if (!analysisResponse.ok) {
        throw new Error(`Analysis API failed: ${analysisResponse.statusText}`);
      }

      const analysisData = await analysisResponse.json();
      console.log("Analyse API response:", analysisData);

      const updateResponse = await fetch(
        `https://mocktankbackend-i0js.onrender.com/update_chats/${uid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sessions: {
              wpm: analysisData.wpm,
              res_length: analysisData[0].res_length,
              clarityIdx: analysisData[0].clarityIdx,
              vocabRichness: analysisData[0].vocabRichness,
              engagement_score: analysisData[0].engagement_score,
              confidence_score: analysisData[0].confidence_score,
              investor_alignment: analysisData[0].investor_alignment,
              createdAt: new Date().toISOString(),
              chats: chatHistory,
            },
          }),
        }
      );

      if (!updateResponse.ok) {
        throw new Error(`Failed to update chats: ${updateResponse.statusText}`);
      }

      const updatedUserData = await updateResponse.json();
      console.log("Updated user:", updatedUserData);

      navigate("/deepanalysis", { state: { analysisData: analysisData } });
    } catch (error) {
      console.error("Error ending chat:", error);
    }
  }

  return (
    <div className="exec-simulation-page">
      <Navbar />
      <div className="exec-layout">
        {/* Investors */}
        <div className="investor-gallery">
          <div
            className={`investor-card ${
              activeSpeaker === "Shreya Malhotra" && isInvestorSpeaking
                ? "speaking"
                : ""
            }`}
          >
            <div className="investor-video-placeholder">
              <video
                ref={videoRefShreya}
                src={shreya}
                muted
                playsInline
                loop
              ></video>
            </div>
            <p className="investor-name">Shreya Malhotra</p>
          </div>
          <div
            className={`investor-card ${
              activeSpeaker === "Ananya Mehra" && isInvestorSpeaking
                ? "speaking"
                : ""
            }`}
          >
            <div className="investor-video-placeholder">
              <video
                ref={videoRefAnanya}
                src={ananya}
                muted
                loop
                playsInline
              ></video>
            </div>
            <p className="investor-name">Ananya Mehra</p>
          </div>
          <div
            className={`investor-card ${
              activeSpeaker === "Henry Collins" && isInvestorSpeaking
                ? "speaking"
                : ""
            }`}
          >
            <div className="investor-video-placeholder">
              <video
                ref={videoRefHenry}
                src={henry}
                muted
                playsInline
                loop
              ></video>
            </div>
            <p className="investor-name">Henry Collins</p>
          </div>
        </div>
        {/* Right side panels */}
        <div className="main-content-grid">
          {/* Transcript */}
          <div className="content-panel conversation-panel">
            <h3 className="panel-header">Conversation Transcript</h3>
            <div className="conversation-log">
              {chatHistory.slice(-2).map((message, index, arr) => {
                const isLastInvestorMessage =
                  index === arr.length - 1 && message.speaker === "investor";

                if (message.speaker === "user") {
                  return (
                    <div className="log-bubble user" key={index}>
                      <div className="bubble-header">
                        <FaUser /> You
                      </div>
                      <p className="bubble-text">{message.text}</p>
                    </div>
                  );
                } else {
                  return (
                    <div className="log-bubble investor" key={index}>
                      <div className="bubble-header">
                        <FaBuilding /> {message.name || "Investor"}
                      </div>
                      <div className="bubble-text">
                        <p>
                          {isLastInvestorMessage
                            ? displayedResponse
                            : message.text}
                          {isLastInvestorMessage && isInvestorSpeaking && (
                            <span className="typing-cursor"></span>
                          )}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}

              {isLoading && (
                <div className="log-bubble investor">
                  <div className="bubble-header">
                    <FaBuilding /> Investor
                  </div>
                  <div className="bubble-text">
                    <ShimmerLoading />
                  </div>
                </div>
              )}
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
                className={`exec-button primary ${
                  isRecording ? "recording" : ""
                }`}
                onClick={
                  isRecording ? handleStopRecording : handleStartRecording
                }
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
                {isRecording ? "Stop Pitch" : "Start Pitch"}
              </button>
              <button className="exec-button secondary" onClick={handleEndChat}>
                <FaChartLine />
                End & Analyze
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Simulation;

