import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Navbar/Navbar';
import CameraPreview from '../CameraPreview/CameraPreview';
import './Simulation.css';

const Simulation = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [speechText, setSpeechText] = useState('');
  const [interimText, setInterimText] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true; // keeps listening until stopped
      recognition.interimResults = true; // show speech while speaking
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let newInterim = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;

          if (event.results[i].isFinal) {
            // Add confirmed text permanently
            setSpeechText((prev) => prev + transcript + ' ');
          } else {
            // Keep live temporary words
            newInterim += transcript;
          }
        }

        // Show interim separately (does not overwrite final)
        setInterimText(newInterim);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech Recognition not supported in this browser.');
    }
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
      setSpeechText('');   // Clear text ONLY when stopped
      setInterimText('');
    }
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
                className={`start-button ${isRecording ? 'recording' : ''}`}
                onClick={isRecording ? handleStopRecording : handleStartRecording}
              >
                {isRecording ? 'Stop Simulation' : 'Start Simulation'}
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
                value={speechText + interimText}
                readOnly
              />
              {/* Interim text preview */}
              {/* <p style={{ color: 'gray', fontStyle: 'italic' }}>{interimText}</p> */}
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
