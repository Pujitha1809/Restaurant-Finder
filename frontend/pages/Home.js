import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {

  const navigate = useNavigate();

  return (
    <div style={{padding:"40px", textAlign:"center"}}>

      <h1>Welcome to Restaurant Finder</h1>

      <p>Find best restaurants near you</p>

      <button
        onClick={() => navigate("/finder")}
        style={{
          padding:"15px 30px",
          fontSize:"18px",
          background:"#ff4d4d",
          color:"white",
          border:"none",
          borderRadius:"10px",
          cursor:"pointer"
        }}
      >
        Find Restaurants
      </button>

    </div>
  );
}

export default Home;
