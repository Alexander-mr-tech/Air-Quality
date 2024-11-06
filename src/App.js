import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

function App() {
  const [weatherPreferences, setWeatherPreferences] = useState({});
  const [fireHotSpotsChecked, setFireHotSpotsChecked] = useState(false);

  return (
    <div className="Main_Container">
      <Navbar />
      <Sidebar
        setFireHotSpotsChecked={setFireHotSpotsChecked}
        fireHotSpotsChecked={fireHotSpotsChecked}
        setWeatherPreferences={setWeatherPreferences}
      />
      <Map
        weatherPreferences={weatherPreferences}
        showMarkers={fireHotSpotsChecked}
      />
    </div>
  );
}

export default App;
