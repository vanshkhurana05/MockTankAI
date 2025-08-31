import React, { useState, useEffect, useRef } from "react";
import Navbar from "../Navbar/Navbar";
import CameraPreview from "../CameraPreview/CameraPreview";
import "./Simulation.css";
import { FaMicrophone, FaStop, FaChartLine, FaUser, FaBuilding } from "react-icons/fa";

const ShimmerLoading = () => (
    <div className="shimmer-container">
        <div className="shimmer-bar"></div>
        <div className="shimmer-bar" style={{ width: '80%' }}></div>
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

    // --- Core component logic remains unchanged ---

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
                setIsInvestorSpeaking(true);
                setDisplayedResponse("");
                setInvestorResponse("");
                const aiResponse = await fetchAiResponse(finalTranscript.trim());
                setIsLoading(false);
                if (aiResponse && aiResponse[1]?.[1]?.content) {
                    const responseText = aiResponse[1][1].content;
                    setInvestorResponse(responseText);
                    speakText(responseText);
                } else {
                    setIsInvestorSpeaking(false);
                }
            }
        };
        recognitionRef.current = recognition;
        return () => recognition.stop();
    }, []);

    useEffect(() => {
        if (investorResponse) {
            let i = 0;
            const interval = setInterval(() => {
                if (i < investorResponse.length) {
                    setDisplayedResponse((prev) => prev + investorResponse.charAt(i));
                    i++;
                } else {
                    clearInterval(interval);
                    setIsInvestorSpeaking(false);
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

    const speakText = (text) => {
        if (!text || !window.speechSynthesis) return;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = "en-US";
        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="exec-simulation-page">
            <Navbar />
            <div className="exec-layout">
                {/* Top section for all three investors */}
                <div className="investor-gallery">
                    <div className="investor-card">
                        <div className="investor-video-placeholder">
                            <video
                                src="https://bhatiayug175.wistia.com/medias/xth86876de"
                                autoPlay loop muted playsInline
                            ></video>
                        </div>
                        <p className="investor-name">Sarah Chen</p>
                    </div>
                    <div className={`investor-card main ${isInvestorSpeaking ? 'active-speaker' : ''}`}>
                        <div className="investor-video-placeholder">
                            <video
                                src="https://assets.mixkit.co/videos/preview/mixkit-man-working-on-a-laptop-in-a-modern-office-4334-large.mp4"
                                autoPlay loop muted playsInline
                            ></video>
                        </div>
                        <p className="investor-name">David Lee</p>
                    </div>
                    <div className="investor-card">
                        <div className="investor-video-placeholder">
                            <video
                                src="https://assets.mixkit.co/videos/preview/mixkit-businesswoman-in-a-modern-office-4333-large.mp4"
                                autoPlay loop muted playsInline
                            ></video>
                        </div>
                        <p className="investor-name">Michael Rodriguez</p>
                    </div>
                </div>

                {/* Main content area */}
                <div className="main-content-grid">
                    <div className="content-panel conversation-panel">
                        <h3 className="panel-header">Conversation Transcript</h3>
                        <div className="conversation-log">
                            <div className="log-bubble user">
                                <div className="bubble-header"><FaUser /> You</div>
                                <p className="bubble-text">{userSpeech || "Your transcribed speech will appear here..."}</p>
                            </div>
                            <div className="log-bubble investor">
                                <div className="bubble-header"><FaBuilding /> Investor</div>
                                <div className="bubble-text">
                                    {isLoading ? <ShimmerLoading /> : (
                                        <p>{displayedResponse}<span className="typing-cursor"></span></p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content-panel user-panel">
                        <h3 className="panel-header">Your Feed & Controls</h3>
                        <div className="camera-container">
                            <CameraPreview />
                        </div>
                        <div className="controls-container">
                            <button
                                className={`exec-button primary ${isRecording ? 'recording' : ''}`}
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