# 🎬 MovieFlix Dashboard – Frontend  

This is the **frontend** of MovieFlix, a movie dashboard application built with React.  
It allows users to search movies, filter, sort, view detailed information, and explore analytics like genre distribution, IMDb ratings, and runtime trends.  

---

## 🌐 Live Link  

- **Frontend (Render):** [MovieFlix Frontend](https://moviedashboard-moengage-frontend-1.onrender.com)  

---

## 📂 GitHub Repository  

- **Frontend Repo:** [MovieFlix Frontend GitHub](https://github.com/Akhil090702/MovieDashboard_Moengage_Frontend.git)  

---

## 🚀 Features  

- 🔎 Search movies by title (via backend API)  
- 🎭 Filter movies by genre  
- 📊 Sort by rating, year, or title  
- 📑 Pagination for browsing search results  
- 📈 Stats Dashboard:  
  - Genre distribution (Pie chart)  
  - Average IMDb rating (Bar chart)  
  - Average runtime by year (Line chart)  
- 🎬 Smooth loader animation during fetch  

---

## 🛠️ Tech Stack  

- **React.js**  
- **CSS / Tailwind**  
- **Chart.js**  
- **Axios**  

---

## 📦 Installation & Setup  

# Clone the repository
git clone https://github.com/Akhil090702/MovieDashboard_Moengage_Frontend.git
cd MovieDashboard_Moengage_Frontend

# Install dependencies
npm install

# Create a .env file in the root directory
REACT_APP_BACKEND_URL=https://moviedashboard-moengage-backend.onrender.com

# Start the development server
npm start

---

## 💻 Usage

Open http://localhost:3000 (or the Render live link).
Search movies via the search bar.
Apply filters and sorting options.
Click a movie card for detailed information.
Explore analytics in the Stats Dashboard.

---

## 📌 Notes

This is frontend only — it depends on the backend API for data.
Make sure to update .env with the correct backend API URL when switching between local and production.
Pagination is handled through OMDb’s API (10 results per page).
