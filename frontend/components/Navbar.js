import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div style={{
      padding: "15px",
      background: "#ff4d4d",
      color: "white",
      display: "flex",
      justifyContent: "space-between"
    }}>
      <h2>Restaurant Finder</h2>

      <div>
        <Link to="/" style={{color:"white", marginRight:"20px"}}>Home</Link>
        <Link to="/finder" style={{color:"white"}}>Find Restaurants</Link>
      </div>
    </div>
  );
}

export default Navbar;
