🍽️ Cafe & Restaurant Finder

A full-stack web application that helps users discover nearby cafes and restaurants based on their current location. Built using React (Frontend) and Flask (Backend) with real-time data from the OpenStreetMap Overpass API.

---

🚀 Features

- 📍 Detects user's current location
- 🔎 Search restaurants by name
- 📏 Filter by distance
- 🗺️ Interactive map using Leaflet
- 🖼️ Custom restaurant images
- ⭐ Ratings, cuisine & pricing display
- ⏱️ Distance and estimated travel time
- 📖 Expandable dropdown with reviews
- 💻 Responsive grid layout (Zomato-style UI)

---

🛠️ Tech Stack

Frontend

- React.js
- JavaScript (ES6)
- CSS
- Leaflet (Maps)

Backend

- Flask (Python)
- Flask-CORS
- Requests

API

- OpenStreetMap Overpass API

---

📁 Project Structure

Restaurant-Finder/
│
├── backend/
│   └── app.py
│
├── frontend/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json

---

⚙️ Installation & Setup

1️⃣ Clone the repository

git clone https://github.com/your-username/restaurant-finder.git
cd restaurant-finder

---

2️⃣ Setup Backend (Flask)

cd backend
pip install flask flask-cors requests
python app.py

➡️ Runs on: "http://127.0.0.1:5000"

---

3️⃣ Setup Frontend (React)

cd frontend
npm install
npm start

➡️ Runs on: "http://localhost:3000"

---

🔗 API Endpoint

GET /restaurants?lat=<latitude>&lng=<longitude>

Returns nearby restaurants using OpenStreetMap data.

---

📸 Screenshots

- Home Page with Map
- <img width="1912" height="842" alt="image" src="https://github.com/user-attachments/assets/630e4bee-4bd1-408b-bae1-e407362a8062" />

- Restaurant Grid View
- <img width="1916" height="782" alt="image" src="https://github.com/user-attachments/assets/484317f7-12e0-455b-b7b6-50177053d0ad" />

- Dropdown Reviews Section
- <img width="957" height="893" alt="image" src="https://github.com/user-attachments/assets/32d18f1a-798a-4a22-b5a4-df9f864d6d71" />

---

🌟 Future Enhancements

- ❤️ Favorites system
- 📍 Restaurant detail page
- 🧭 Route navigation
- 🔥 Advanced filters (rating, price)
- 🎨 Improved animations

---

🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a pull request.

---

📜 License

This project is open-source and available under the MIT License.

---

👩‍💻 Author

Pujitha Mamidishetty
BTech Data Science | AR/VR Minor
Usha Mittal Institute of Technology

---
