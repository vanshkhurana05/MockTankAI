import React, { useEffect, useState } from "react";
import "./DeepAnalysis.css";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import Navbar from "../Navbar/Navbar";

const DeepAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    // Simulated API fetch (replace with backend data later)
    const data = {
      confidence: [
        { time: "T1", value: 70 },
        { time: "T2", value: 75 },
        { time: "T3", value: 80 },
        { time: "T4", value: 82 },
        { time: "T5", value: 85 },
      ],
      tone: [
        { name: "Positive", value: 65 },
        { name: "Neutral", value: 20 },
        { name: "Negative", value: 15 },
      ],
      speed: [
        { range: "80 wpm", value: 2 },
        { range: "100 wpm", value: 4 },
        { range: "120 wpm", value: 8 },
        { range: "140 wpm", value: 5 },
      ],
      fillers: [
        { filler: "um", value: 3 },
        { filler: "like", value: 5 },
        { filler: "you know", value: 2 },
      ],
    };
    setAnalysisData(data);
  }, []);

  if (!analysisData) return <p>Loading...</p>;

  return (
    <div className="analysis-container">
        <Navbar />
      <h1>Simulation Feedback</h1>

      <div className="analysis-grid">
        {/* Confidence Line Graph */}
        <div className="chart-card">
          <h2>Confidence Level</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={analysisData.confidence}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#4ade80" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Tone Pie Chart */}
        <div className="chart-card">
          <h2>Tone Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={analysisData.tone}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {analysisData.tone.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#4ade80", "#facc15", "#f87171"][index]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Speaking Speed Bar Chart */}
        <div className="chart-card">
          <h2>Speaking Speed</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analysisData.speed}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Filler Words Bar Chart */}
        <div className="chart-card">
          <h2>Filler Word Usage</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={analysisData.fillers}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="filler" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#f87171" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DeepAnalysis;
