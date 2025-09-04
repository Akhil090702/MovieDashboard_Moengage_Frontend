import React, { useEffect, useState } from "react";
import api from "../utils/api";
import "dotenv/config";
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

const API_KEY = process.env.OMDB_API_KEY;
const BASE_URL = process.env.OMDB_BASE;

const Stats = () => {
  const [genreData, setGenreData] = useState([]);
  const [avgRating, setAvgRating] = useState(0);
  const [runtimeData, setRuntimeData] = useState([]);
  const [loading, setLoading] = useState(true); // 🔹 Loader state

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const allMovies = [];
        for (let page = 1; page <= 3; page++) {
          const { data } = await api.get(
            `${BASE_URL}?apikey=${API_KEY}&s=movie&type=movie&page=${page}`
          );
          if (data.Search) allMovies.push(...data.Search);
        }

        const detailedMovies = await Promise.all(
          allMovies.map((m) =>
            api
              .get(`${BASE_URL}?apikey=${API_KEY}&i=${m.imdbID}`)
              .then((res) => res.data)
          )
        );

        const genreCount = {};
        detailedMovies.forEach(({ Genre }) =>
          Genre?.split(",").forEach((g) => {
            const genre = g.trim();
            genreCount[genre] = (genreCount[genre] || 0) + 1;
          })
        );
        setGenreData(Object.entries(genreCount));

        const ratings = detailedMovies
          .map((m) => parseFloat(m.imdbRating))
          .filter(Boolean);
        setAvgRating(
          (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)
        );

        const runtimeByYear = {};
        detailedMovies.forEach(({ Year, Runtime }) => {
          const runtime = parseInt(Runtime);
          if (Year && runtime) {
            runtimeByYear[Year] = runtimeByYear[Year] || [];
            runtimeByYear[Year].push(runtime);
          }
        });
        setRuntimeData(
          Object.entries(runtimeByYear).map(([year, runtimes]) => ({
            year,
            avg: (
              runtimes.reduce((a, b) => a + b, 0) / runtimes.length
            ).toFixed(2),
          }))
        );
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

  const barData = {
    labels: ["Average Rating"],
    datasets: [
      { label: "Rating", data: [avgRating], backgroundColor: "#FF6384" },
    ],
  };

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
      <h2>Movie Analytics Dashboard</h2>
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
