// src/App.js
import React from "react";
import "./App.css";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <div className="Main_Container">
      <Sidebar />
      <div className="left-Conitainer">
        <div className="App">
          <h1>
            The "Forest Fire Prediction & Spread Visualization" project uses
            predictive models to forecast fire risk and visualize potential fire
            spread, aiding in proactive response and mitigation efforts.
          </h1>
        </div>
        <Map />
      </div>
    </div>
  );
}

export default App;
