import React from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import { Header } from "../../components/Header";

export const Home = () => {
  return (
    <>
      <div className="header"><Header /></div>
      <div className="container">
        <div className="searchBox">
          <button className="searchButton">
            <SearchOutlined />
          </button>
          <input
            className="searchInput"
            type="text"
            placeholder="search movie"
          />
        </div>
      </div>
    </>
  );
};
