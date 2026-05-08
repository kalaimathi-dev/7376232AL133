import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import NotificationDetails from "./pages/NotificationDetails";
import { ensureAuthToken } from "./services/authService";
import { Log } from "./middleware/logger";

function App() {
  useEffect(() => {
    const initAuth = async () => {
      await ensureAuthToken();
      Log("frontend", "info", "page", "App loaded and auth checked");
    };

    initAuth();
  }, []);

  return (
    <div className="app-root">
      <Navbar />
      <Container maxWidth="lg" className="app-container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/notification/:id" element={<NotificationDetails />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
