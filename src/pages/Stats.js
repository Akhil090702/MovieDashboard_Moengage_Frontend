import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { Pie, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import "../css/Stats.css";

// Register chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement
);

const Stats = () => {
  const [genreData, setGenreData] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [runtimeData, setRuntimeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await api.get("/stats");

        // Convert backend data into chart-friendly state
        setGenreData(Object.entries(data.genreCount));
        setAvgRating(parseFloat(data.avgRating));
        setRuntimeData(data.runtimeData);
      } catch (err) {
        console.error("Failed to load stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading movie statistics...</p>
      </div>
    );
  }

  // Pie Chart Data (Genres)
  const pieData = {
    labels: genreData.map(([g]) => g),
    datasets: [
      {
        data: genreData.map(([, count]) => count),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#E7E9ED",
          "#00A36C",
        ],
      },
    ],
  };

  // Bar Chart Data (Average IMDb Rating)
  const barData = {
    labels: ["Average Rating"],
    datasets: [
      {
        label: "Rating",
        data: [avgRating],
        backgroundColor: "#FF6384",
      },
    ],
  };

  // Line Chart Data (Runtime by Year)
  const lineData = {
    labels: runtimeData.map((r) => r.year),
    datasets: [
      {
        label: "Avg Runtime (mins)",
        data: runtimeData.map((r) => r.avg),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54,162,235,0.2)",
        fill: true,
      },
    ],
  };

  return (
    <div className="stats-container">
      <h2>📊 Movie Analytics Dashboard</h2>
      <div className="stats-flex">
        {genreData.length > 0 && (
          <div className="stats-section">
            <h3 className="chart-title">🎬 Genre Distribution</h3>
            <Pie data={pieData} />
          </div>
        )}

        {avgRating > 0 && (
          <div className="stats-section">
            <h3 className="chart-title">⭐ Average IMDb Rating</h3>
            <Bar
              data={barData}
              options={{ scales: { y: { beginAtZero: true, max: 10 } } }}
            />
          </div>
        )}
      </div>

      {runtimeData.length > 0 && (
        <div className="stats-section-2">
          <h3 className="chart-title">⏱️ Avg Runtime by Year</h3>
          <Line data={lineData} />
        </div>
      )}
    </div>
  );
};

export default Stats;
