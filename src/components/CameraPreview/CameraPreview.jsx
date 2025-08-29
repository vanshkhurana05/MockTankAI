import React, { useRef, useState, useEffect } from 'react';
import './CameraPreview.css';

const CameraPreview = () => {
  const videoRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isVideoActive, setIsVideoActive] = useState(true);
  const [isAudioActive, setIsAudioActive] = useState(true);

    useEffect(() => {
    // Initialize camera when component mounts
    enableCamera();

    return () => {
      // Clean up when component unmounts
      disableAll();
    };
  }, []);

  const enableCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: true, 
        audio: true 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setStream(mediaStream);
      setIsVideoActive(true);
      setIsAudioActive(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

    const toggleVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const videoTracks = videoRef.current.srcObject.getVideoTracks();
      videoTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsVideoActive(!isVideoActive);
    }
  };

  const toggleAudio = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const audioTracks = videoRef.current.srcObject.getAudioTracks();
      audioTracks.forEach(track => {
        track.enabled = !track.enabled;
      });
      setIsAudioActive(!isAudioActive);
    }
  };
    const disableAll = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setIsVideoActive(false);
      setIsAudioActive(false);
    }
    };
    
  return (
    <div className="camera-preview">
      <div className="video-container">
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline
          className="video-element"
        />
      </div>
      <div className="camera-controls">
        <button 
          className={`control-btn ${isAudioActive ? 'active' : 'muted'}`}
          onClick={toggleAudio}
        >
          {isAudioActive ? 'Mute' : 'Unmute'}
        </button>
        <button 
          className={`control-btn ${isVideoActive ? 'active' : 'muted'}`}
          onClick={toggleVideo}
        >
          {isVideoActive ? 'Stop Video' : 'Start Video'}
        </button>
      </div>
    </div>
  );
};

export default CameraPreview;