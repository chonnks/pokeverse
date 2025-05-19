import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Help from "./pages/Help";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar is rendered on every page */}
      <Navbar />

      {/* Main Content Area */}
      <div className="main-content">
        <Routes>
          {/* Home Page Route - Includes PokemonList */}
          <Route path="/" element={<Home />} />

          {/* About Page Route */}
          <Route path="/about" element={<About />} />

          {/* Help Page Route */}
          <Route path="/help" element={<Help />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
