import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import Stats from "./pages/Stats";
import Login from "./pages/Login";
import "./index.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login onLogin={setIsLoggedIn} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/movie/:id"
          element={isLoggedIn ? <MovieDetails /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/stats"
          element={isLoggedIn ? <Stats /> : <Navigate to="/login" replace />}
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
        
      </Routes>
    </Router>
  );
}

export default App;
