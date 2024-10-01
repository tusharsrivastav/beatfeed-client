import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Layout from "./pages/layout.jsx";
import Home from "./pages/home.jsx";
import Signup from "./pages/signup.jsx";
import Login from "./pages/login.jsx";
import Artists from "./pages/artists.jsx";
import { SearchContextProvider } from "./context/SearchContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthContextProvider>
        <SearchContextProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route path="" element={<Home />} />
              <Route path="artists" element={<Artists />} />
              <Route path="followed-artists" element={<Artists />} />
              <Route path="signup" element={<Signup />} />
              <Route path="login" element={<Login />} />
            </Route>
          </Routes>
        </SearchContextProvider>
      </AuthContextProvider>
    </Router>
  </React.StrictMode>
);
