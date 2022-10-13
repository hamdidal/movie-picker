import React from "react";
import "./App.css";
import "./services/firebase";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import { Details } from "./pages/Details";
import { List } from "./pages/List";
import Auth from "./Auth";

function App() {
  return (
    <Auth>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detailspage/:id" element={<Details />} />
          <Route path="/list/:search" element={<List />} />
        </Routes>
      </div>
    </Auth>
  );
}

export default App;
