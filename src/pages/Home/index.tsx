import React, {  useEffect, useState } from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import { Header } from "../../components/Header";
import { searchMovie } from "../../services/movie";
import SearchResult from "../../components/SearchResult";
import { MovieProps } from "../../models/movies";


export const Home = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  
  const handleChange = (e: any) => {
    setSearch(e);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await searchMovie(`${search}`);
      setMovies(data.results);
      console.log(data);
      setTimeout(() => {
    
      }, 1000);
    };
    setMovies([]);
    getData();
  }, [search]);
  return (
    <div className="home-page">
      <Header />
      <div className="search-div">
        <div className="search-box">
          <button className="search-button">
            <SearchOutlined />
          </button>
          <input
            className="search-input"
            type="text"
            placeholder="search movie"
            onChange={(e) => {
              handleChange(e.target.value);
            }}
          />
        </div>
        <div className="movies-shortlist">
          {movies
            .filter((p, i) => i < 2)
            .map((result:MovieProps) => {
              return <SearchResult result={result} key={result.id} />;
            })}
        </div>
      </div>
    </div>
  );
};
