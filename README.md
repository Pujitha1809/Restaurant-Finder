# 🍽️ Cafe & Restaurant Finder

A full-stack web application that helps users discover nearby cafes and restaurants on an interactive map. Built with **React** (frontend) and **Python Flask** (backend), powered by the **OpenStreetMap Overpass API**.

---

## 📸 Screenshots

### 🗺️ Map View
<img src="https://github.com/user-attachments/assets/74607f6d-1c0c-4e07-8d55-fbbc3dcdeda4" width="700" alt="Map View"/>

### 🍽️ Restaurant Card
<img src="https://github.com/user-attachments/assets/70e92fe2-11df-451f-a140-8fccab58f12a" width="400" alt="Restaurant Card"/>

### 📋 Restaurant Detail
<img src="https://github.com/user-attachments/assets/a406d397-f53e-49a3-8c2b-5251205f7dd0" width="400" alt="Restaurant Detail"/>

---

## ✨ Features

- 🗺️ Interactive map showing nearby restaurants using Leaflet.js
- 🔍 Search restaurants by name
- 📏 Filter by distance (e.g. 1 km, 5 km, 10 km)
- ⭐ View ratings, cuisine type, price, and travel time
- 🟢 See which restaurants are open right now
- 📍 Click on map markers to highlight restaurants

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, Leaflet.js |
| Backend | Python, Flask |
| Map Data | OpenStreetMap / Overpass API |
| Styling | CSS |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or above)
- [Python](https://www.python.org/) (v3.8 or above)
- pip (Python package manager)

---

### 🔧 Backend Setup

```bash
# Navigate to the backend folder
cd backend

# Install required Python packages
pip install flask requests flask-cors

# Start the Flask server
python app.py
```

The backend will run at: `http://localhost:5000`

---

### 💻 Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Start the React app
npm start
```

The frontend will open at: `http://localhost:3000`

---

### ⚠️ Important

> You need **both servers running at the same time** — backend on port `5000` and frontend on port `3000`.

---

## 📁 Project Structure

```
Restaurant-Finder/
├── backend/
│   └── app.py              # Flask API server
├── frontend/
│   ├── public/
│   │   └── images/         # Restaurant images
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.js
│   │   │   ├── Navbar.js
│   │   │   ├── RestaurantCard.js
│   │   │   └── SearchBar.js
│   │   └── pages/
│   │       ├── Finder.js
│   │       ├── Home.js
│   │       └── RestaurantDetails.js
└── README.md
```

---

## 🌐 How It Works

1. The React frontend sends the user's location to the Flask backend
2. The backend queries the **Overpass API** (OpenStreetMap) for nearby restaurants
3. Results are returned and displayed on the interactive **Leaflet map**
4. Users can search, filter, and click on restaurants to view details

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👩‍💻 Author

**Pujitha Mamidishetty** — [GitHub](https://github.com/Pujitha1809)
