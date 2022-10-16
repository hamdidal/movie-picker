import React, { useEffect, useState } from "react";
import "./Home.css";
import { SearchOutlined } from "@ant-design/icons";
import { Header } from "../../components/Header";
import { searchMovie } from "../../services/Movie/movie";
import { SearchResult } from "../../components/SearchResult";
import { MovieProps } from "../../models/movies";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  const navigate = useNavigate();

  const handleChange = (e: any) => {
    setSearch(e);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await searchMovie({ query: search, page: 1 });
      setMovies(data.results);
      setTimeout(() => {}, 1000);
    };
    setMovies([]);
    getData();
  }, [search]);

  const toList = (search: string) => {
    navigate("/list/" + search);
  };

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
        {movies.length !== 0 && (
          <>
            <div className="movies-shortlist">
              {movies
                .filter((p, i) => i < 2)
                .map((result: MovieProps) => {
                  return <SearchResult result={result} key={result.id} />;
                })}
            </div>
            <button
              className={`more-button ${movies.length === 0 && " hide"}`}
              onClick={() => toList(search)}
            >
              SHOW MORE MOVIES
            </button>
          </>
        )}
      </div>
    </div>
  );
};
