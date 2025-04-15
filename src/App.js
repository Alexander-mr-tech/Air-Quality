import { useState } from "react";
import "./App.css";
import Map from "./components/Map";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignInScreen from "./components/SignInScreen";
import SignUp from "./components/SignUpScreen"; // Assuming you have a SignUpScreen component
import Dashboard from "./components/UserDashBoard";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  const [weatherPreferences, setWeatherPreferences] = useState({});
  const [fireHotSpotsChecked, setFireHotSpotsChecked] = useState(false);

  return (
    <Router>
      <div className="Main_Container">
        <Navbar />
        <Routes>
          {/* Define routes */}
          <Route
            path="/"
            element={
              <>
                <Sidebar
                  setFireHotSpotsChecked={setFireHotSpotsChecked}
                  fireHotSpotsChecked={fireHotSpotsChecked}
                  setWeatherPreferences={setWeatherPreferences}
                />
                <Map
                  weatherPreferences={weatherPreferences}
                  showMarkers={fireHotSpotsChecked}
                />
              </>
            }
          />
          <Route path="/signin" element={<SignInScreen />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Route for Sign In */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
