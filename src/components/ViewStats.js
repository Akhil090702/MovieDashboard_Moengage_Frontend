import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/ViewStats.css";

const ViewStats = () => {
  const navigate = useNavigate();

  return (
    <div className="view-stats-container">
      <button 
        className="view-stats-btn" 
        onClick={() => navigate("/stats")}
      >
        📊 View Movie Stats
      </button>
    </div>
  );
};

export default ViewStats;
