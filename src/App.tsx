import React from "react";
import "./App.css";
import "./services/firebase";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import { Home } from "./pages/Home";
import Register from "./pages/Register";
import { Details } from "./pages/Details";
import { List } from "./pages/List";
import { GlobalContextProvider } from "./context";
import Auth from "./components/Auth";

function App() {
  return (
    <div className="App">
      <GlobalContextProvider>
        <Routes>
          <Route
            path="/login"
            element={
              <Auth>
                <Login />
              </Auth>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/detailspage" element={<Details />} />
          <Route path="/movielist" element={<List />} />
        </Routes>
      </GlobalContextProvider>
    </div>
  );
}

export default App;
