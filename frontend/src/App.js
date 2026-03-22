import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

/* Marker Icons */
const blueIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

const redIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

/* Distance calculator */
function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;

  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) *
    Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function App() {

  const [restaurants, setRestaurants] = useState([]);
  const [userLocation, setUserLocation] = useState(null);

  const [expanded, setExpanded] = useState(null);

  const [search, setSearch] = useState("");
  const [maxDistance, setMaxDistance] = useState(10);

  /* Add custom data + images */
  const enrichRestaurant = (restaurant, index) => {

    const images = [
      "/images/rays_cafe_pizzeria.jpg",
      "/images/cafe_madras.jpg",
      "/images/ganga_vihar_restaurant.jpg",
      "/images/amber.jpg",
      "/images/Light_of_bharat.jpg",
      "/images/sodabottleopenerwala.jpg",
      "/images/balaji.jpg",
      "/images/simply_delicious.jpg",
      "/images/deepa_bar.jpg",
      "/images/stomach.jpg",
      "/images/unknown.jpg",
      "/images/ram_ashray.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/and_chillies.jpg",
      "/images/unknown.jpg",
      "/images/gomantak.jpg",
      "/images/elco.jpg",
      "/images/ice&spice.jpg",
      "/images/ferry_wharf.jpg",
      "/images/jimmy.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/imbiss.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/rama.jpg",
      "/images/sharda.jpg",
      "/images/cafe_gulshan.jpg",
      "/images/snowpoint.jpg",
      "/images/guru_kripa.jpg",
      "/images/hotel_shraddha.jpg",
      "/images/radha_krishna.jpg",
      "/images/marrakesh.jpg",
      "/images/unknown.jpg",
      "/images/unknown.jpg",
      "/images/yoko_sizzlers.jpg",
      "/images/lucky_dadar.jpg",
      "/images/cincin.jpg",
      "/images/yauatcha.jpg",
      "/images/nara_thai.jpg",
      "/images/kyma.jpg",
      "/images/sequel.jpg",
      "/images/amazonia.jpg",
      "/images/butterfly.jpg",
      "/images/o_pedro.jpg",
      "/images/oragami.jpg",
      "/images/lucky.jpg",
      "/images/amey.jpg",
      "/images/belvedere.jpg",
      "/images/koolar&co.jpg",
      "/images/paramount.jpg",
      "/images/hakkasan.jpg",
      "/images/arbab.jpg",
      "/images/dimsum.jpg",
      "/images/sai_sagar.jpg",
      "/images/meraki.jpg",
      "/images/dp.jpg",
      "/images/apna.jpg",
      "/images/peninsula.jpg",
      "/images/hanuman.jpg",
      "/images/rehmat.jpg",
      "/images/mercy.jpg",
      "/images/hotel_sangam.jpg",
      "/images/adarsha.jpg",
      "/images/tanmak_thai.jpg",
      "/images/mad_over_donuts.jpg",
      "/images/green.jpg",
      "/images/pizza_hut.jpg",
      "/images/rajaraj.jpg",
      "/images/border_bean.jpg",
      "/images/qj.jpg",
      "/images/unknown.jpg",
      "/images/loveinlangos.jpg",
      "/images/maaji.jpg",
      "/images/houseofmisal.jpg",
      "/images/southspice.jpg" , 
      "/images/mani.jpg",
      "/images/chinar.jpg",
      "/images/ahar.jpg",
      "/images/tandoor.jpg",
      "/images/nasir.jpg",
      "/images/persiandarbar.jpg",
      "/images/ovenfresh.jpg",
      "/images/copperchimney.jpg",
      "/images/mountaingoat.jpg",
      "/images/blackshepherd.jpg",
      "/images/trupti.jpg",
      "/images/bastian.jpg",
      "/images/gokul.jpg",
      "/images/seefah.jpg",
      "/images/fourchopsticks.jpg",
      "/images/newriyaz.jpg",
      "/images/stepin.jpg",
      "/images/99pancakes.jpg",
      "/images/saiprasad.jpg",
      "/images/cafemysore.jpg",
      "/images/jyoti.jpg",
      "/images/theona.jpg",
      "/images/swagat.jpg",
      "/images/goldrush.jpg",
      "/images/sujata.jpg",
      "/images/muttuswami.jpg",
    ];

    const cuisines = [
      "Indian, Fast Food",
      "South Indian",
      "North Indian",
      "Multi Cuisine",
      "Multi Cuisine",
      "Parsi, Irani Cafe",
      "South Indian",
      "North Indian",
      "Multi Cuisine",
      "Chinese, Thai",
      "Multi Cuisine",
      "North Indian, Chinese",
      "South Indian",
      "North Indian",
      " Multi Cuisine",
      "Goan, Seafood",
      "Authentic Chinese Food",
      "Seafood, North Indian",
      "Street Food, Fast Food",
      "Multi Cuisine",
      "Seafood, North Indian",
      "Chinese",
      "Italian",
      "Biryani",
      "North Indian",
      "Non Vegiterian ",
      "Goan, Seafood",
      "Multi Cuisine",
      "South Indian",
      "South Indian",
      "Multi Cuisine",
      "Multi Cuisine",
      "Vegeterian, North Indian",
      "Multi Cuisine",
      "Multi Cuisine",
      "Thai, Indian, Vegetarian",
      "Indian, Wraps, Rolls, North Indian, Middle Eastern, Biryani",
      "Indian, Chinese",
      "Halal Restaurant",
      "Multi Cuisine",
      "Italian",
      "Chinese, Thai",
      "Thai Restaurant",
      "Asian, Thai, Chinese",
      "Oragnic Food, Healthy Food, Vegan Food, Vegetarian Food",
      "Continental, Italian, Asian, Chinese, Thai, Japanese",
      "Modern Indian, Continental",
      "Goan Restaurant",
      "Japanese",
      "North Indian",
      "South Indian, North indian, Chinese, Fast Food",
      "Middle Eastern, Continental, Lebanese",
      "Parsi, Vegetarian, North Indian, Chinese, Fast Food",
      "Chinese",
      "Seafood, Asian",
      "Labanese Restaurant",
      "Authentic Chinese Food, Thai, Asian",
      "South Indian, North Indian, Chinese, Fast Food",
      "Chinese",
      "Vegetarian",
      "Family Restaurant, North Indian, Chinese, Fast Food",
      "Punjabi, North Indian",
      "Vegetarian, North Indian, Chinese, Fast Food",
      "Multi Cuisine",
      "Fine Dine-In",
      "Multi Cuisine",
      "Multi Cuisine",
      "Thai, Chinese, Asian",
      "Bakery, Desserts",
      "Chinese Restaurant",
      "Pizza, Fast Food",
      "south Indian",
      "Barbeque Restaurant",
      "Multi Cuisine",
      "Multi Cuisine",
      "Mexican, fast food",
      "Chinese",
      "Maharashtrian",
      "South Indian",
      "Cafe Food, Fast Food",
      "Chinese",
      "Vegetarian, North Indian, Chinese, Fast Food",
      "Multi Cuisine",
      "Multi Cuisine",
      "Chinese, North Indian, Biryani",
      "Italian, Asian, Chinese, Pizza, Pasta",
      "Family Restaurant, North Indian, Chinese, Fast Food",
      "Momo, Chinese, Nepali, Asian",
      "British Restaurant",
      "Restaurant",
      "Multi Cuisine",
      "South Indian, Chinese, Fast Food",
      "Asian, Thai",
      "Chinese, Korean, Japanese",
      "Restaurant",
      "Chinese, Mulghlai, Biryani",
      "Bakery, Desserts, Pancakes",
      "Multi Cuisine, North Indian, Chinese, Fast Food",
      "South Indian",
      "Family Restaurant",
      "Family Restaurant",
      "Multi Cuisine",
      "Multi Cuisine",
      "Multi Cuisine",
      "Multi Cuisine",
    ];

    const prices = [
      "₹200 for one",
      "₹150 for one",
      "₹250 for one",
      "₹300 for one",
      "₹700 for two",
      "₹245 for one",
      "₹180 for one",
      "₹350 for two",
      "₹250 for two",
      "₹400 for two",
      "₹500 for two",
      "₹150 for one",
      "₹300 for two",
      "₹200 for one",
      "₹600 for two",
      "₹500 for one",
      "₹350 for two",
      "₹600 for two",
      "₹400 for two",
      "₹750 for two",
      "₹800 for one",
      "₹1500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹1200 for two",
      "₹350 for one",
      "₹450 for two",
      "₹200 for one",
      "₹300 for two",
      "₹400 for two",
      "₹250 for two",
      " ₹300 for two",
      "₹500 for two",
      "₹300 for two",
      "₹400 for one",
      "₹750 for two",
      "₹600 for two",
      "₹350 for one",
      "350 for one",
      "₹400 for two",
      " ₹3000 for two",
      "₹450 for one",
      "₹3000 for two",
      " ₹2000 for two",
      "₹1500 for two",
      "₹2000 for two",
      "₹500 for one",
      "₹4000 for two",
      "₹2000 for two",
      "₹300 for one",
      "₹850 for two",
      " ₹1000 for two",
      "₹400 for two",
      "₹300 for two",
      "₹5000 for two",
      "₹1500 for one",
      "₹400 for one",
      "₹300 for two",
      "₹400 for two",
      "₹350 for two",
      "₹600 for two",
      " ₹1500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹2000 for two",
      "₹300 for one",
      "₹400 for two",
      "₹1500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹1500 for one",
      "₹1500 for two",
      "₹600 for one",
      "₹600 for two",
      "₹400 for one",
      "₹400 for two",
      "₹3000 for one",
      "₹400 for two",
      "₹500 for two",
      "₹1500 for one",
      "₹1000 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",
      "₹400 for two",
      "₹500 for two",
      "₹300 for one",

    ];

    const ratings = [4.2, 4.5, 4.0, 4.3, 3.5, 4.2, 3.9, 3.9, 4.0, 3.7, 3.5, 4.4, 4.1, 3.2, 3.8, 4.3, 4.1, 3.8, 3.5, 4.1, 4.2, 3.9, 3.2, 4.2, 2.5, 4.4,3.2, 4.4,  4.2, 4.8, 3.9, 3.0, 4.3, 3.9, 3.5, 3.0, 4.1, 3.4, 4.0, 4.3, 3.3, 4.4, 4.7, 4.6, 4.3, 4.0, 4.1, 4.0, 4.3, 3.8, 3.5, 3.8, 3.5, 4.1, 4.8, 4.1, 4.0, 3.5, 3.4, 4.0, 4.1, 3.8, 3.9, 4.1, 4.0, 4.0, 3.7, 3.9, 4.3, 3.9, 4.0, 4.3, 3.5, 3.0, 3.7, 3.5, 3.9, 3.6, 4.4, 4.2, 3.7, 3.8, 3.6, 4.3, 4.4, 4.5, 4.2, 4.4, 4.1, 4.4, 4.3, 4.2, 4.2, 4.5, 3.2, 4.3, 4.4, 4.2, 3.6, 3.5, 3.5, 3.2, 3.7, 3.8];

    return {
      ...restaurant,
      image: images[index % images.length],
      cuisine: cuisines[index % cuisines.length],
      price: prices[index % prices.length],
      rating: ratings[index % ratings.length],
      open: true
    };
  };

  /* Fetch restaurants safely */
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(

      (position) => {

        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        setUserLocation([lat, lng]);

        fetch(`http://127.0.0.1:5000/restaurants?lat=${lat}&lng=${lng}`)
          .then(res => res.json())
          .then(data => {

            const enriched = data.map(enrichRestaurant);
            setRestaurants(enriched);

          })
          .catch(() => {
            console.log("Using fallback location");
          });

      },

      () => {

        const lat = 19.076;
        const lng = 72.8777;

        setUserLocation([lat, lng]);

        fetch(`http://127.0.0.1:5000/restaurants?lat=${lat}&lng=${lng}`)
          .then(res => res.json())
          .then(data => {

            const enriched = data.map(enrichRestaurant);
            setRestaurants(enriched);

          });

      }

    );

  }, []);

  /* Filter restaurants */
  const filteredRestaurants = restaurants.filter((r) => {

    if (!userLocation) return true;

    const distance = getDistance(
      userLocation[0],
      userLocation[1],
      r.lat,
      r.lng
    );

    return (
      (r.name || "").toLowerCase().includes(search.toLowerCase()) &&
      distance <= maxDistance
    );

  });

  return (

    <div style={{ padding: "20px" }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(to right, orange, crimson)",
        padding: "20px",
        borderRadius: "10px",
        color: "white"
      }}>

        <h1>🍽 Cafe & Restaurant Finder</h1>

        <input
          placeholder="Search restaurants..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
            marginRight: "10px"
          }}
        />

        Max Distance:

        <select
          value={maxDistance}
          onChange={(e) => setMaxDistance(Number(e.target.value))}
        >
          <option value={1}>1 km</option>
          <option value={2}>2 km</option>
          <option value={5}>5 km</option>
          <option value={10}>10 km</option>
        </select>

      </div>

      {/* Map */}
      <MapContainer
        center={userLocation || [19.076, 72.8777]}
        zoom={13}
        style={{ height: "400px", marginTop: "20px" }}
      >

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {userLocation &&
          <Marker position={userLocation} icon={redIcon}>
            <Popup>You are here</Popup>
          </Marker>
        }

        {filteredRestaurants.map((r, index) => (

          <Marker
            key={index}
            position={[r.lat, r.lng]}
            icon={blueIcon}
          >

            <Popup>
              <b>{r.name}</b>
              <br />
              ⭐ {r.rating}
            </Popup>

          </Marker>

        ))}

      </MapContainer>

      {/* Restaurant List */}
      <h2 style={{ marginTop: "20px" }}>Restaurant List</h2>

      {filteredRestaurants.map((r, index) => {

        const distance = getDistance(
          userLocation[0],
          userLocation[1],
          r.lat,
          r.lng
        );

        const time = (distance / 30) * 60;

        return (

          <div key={index}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              margin: "10px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
            onClick={() =>
              setExpanded(expanded === index ? null : index)
            }
          >

            <h3>{r.name}</h3>

            <p>
              ⭐ {r.rating} | {distance.toFixed(2)} km
            </p>

            {/* Dropdown */}
            {expanded === index && (

              <div>

                <img
                  src={r.image}
                  alt="restaurant"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    borderRadius: "10px"
                  }}
                />

                <p>🍴 Cuisine: {r.cuisine}</p>

                <p>💰 Price: {r.price}</p>

                <p>📍 Distance: {distance.toFixed(2)} km</p>

                <p>🚗 Travel time: {time.toFixed(0)} mins</p>

                <p>🟢 Open now</p>

              </div>

            )}

          </div>

        );

      })}

    </div>

  );

}

export default App;