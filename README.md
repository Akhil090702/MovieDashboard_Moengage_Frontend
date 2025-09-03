# MovieFlix Dashboard

🎬 **MovieFlix** is a full-stack movie dashboard application that allows users to search for movies, view detailed information, filter by genre, sort by rating/year/title, and explore statistics like genre distribution, average IMDb rating, and runtime trends. It also includes pagination and admin-level caching of movie data for faster performance.

---

## Features

- Search movies by title
- Fetch detailed movie information from OMDb API
- Filter movies by genre
- Sort movies by rating, year
- Pagination support for browsing through search results
- Movie analytics dashboard:
  - Genre distribution (Pie chart)
  - Average IMDb rating (Bar chart)
  - Average runtime by year (Line chart)
- Backend caching for faster repeated searches
- Loader animation while fetching data

---

## Tech Stack

- **Frontend:** React, CSS, Chart.js
- **Backend:** Node.js, Express.js, MongoDB, Axios
- **APIs:** OMDb API
---

## Installation & Setup

1. Clone the repository

bash
git clone https://github.com/<your-username>/MovieFlix.git
cd MovieFlix

2. Install dependencies

Backend:

cd backend
npm install

Frontend:

cd frontend
npm install

3. Setup MongoDB with below connection string
4. Create a .env file in the backend directory
PORT=5000
OMDB_API_KEY=your_omdb_api_key
MONGO_URI=mongodb://localhost:27017/moviedb
JWT_SECRET=your_jwt_secret_key

5. Run the backend server
cd backend
npm run dev

6. Run the frontend
cd frontend
npm start

## Usage

1. Open `http://localhost:3000` in your browser.
2. Use the search bar to look for movies by title.
3. Apply filters by genre and sorting options.
4. Click on any movie card to see detailed information.
5. Browse through pages using the pagination buttons.
6. View movie analytics in the "View Stats" section.

## Notes

- Pagination uses OMDb’s page system (10 results per page). The backend caches results by query + page for faster subsequent access.
- Loader animation indicates data is being fetched.

