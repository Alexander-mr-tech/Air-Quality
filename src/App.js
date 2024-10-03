// import React from "react";
// import "./App.css";
// import Map from "./components/Map";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <div className="Main_Container">
//       <Navbar />
//       <Map />
//     </div>
//   );
// }

// export default App;

import React, { Component } from "react";
import "./App.css";
import Map from "./components/Map";
import Navbar from "./components/Navbar";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary: ", error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div className="Main_Container">
      <ErrorBoundary>
        <Navbar />
      </ErrorBoundary>
      <ErrorBoundary>
        <Map />
      </ErrorBoundary>
    </div>
  );
}

export default App;
