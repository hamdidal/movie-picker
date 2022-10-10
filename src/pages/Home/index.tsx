import React, { useEffect } from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import { Header } from "../../components/Header";
import HttpClient from "../../services/HttpClient";

export const Home = () => {
  useEffect(() => {
    const getData = async () => {
      const data = await HttpClient.get("trending/all/week", {});
      console.log(data);
    };
    getData();
  }, []);

  return (
    <>
      <div className="header">
        <Header />
      </div>
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
