import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { findMovieBydId } from "../../services/movie";
import "./Details.css";

export const Details = () => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const [movie, setMovie] = useState({
    title: "",
    original_language: "",
    original_title: "",
    overview: "",
    backdrop_path: "" || null,
    poster_path: "" || null,
    production_companies: {
      name: "",
      id: "",
      logo_path: "" || null,
      origin_country: "",
    },
    release_date: "",
    vote_average: "",
  });
  const id = useParams();

  console.log("id", id);

  useEffect(() => {
    const getData = async () => {
      const data = await findMovieBydId(id.id);
      setMovie(data);
      console.log("data", data);
    };
    getData();
  }, [id]);

  return (
    <div className="details-container">
      <Header />
      <div className="details-poster-div" >
        <img
          src={
            `${BASE_URL}${movie.backdrop_path || movie.poster_path}` ||
            "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg"
          }
          alt={"movie-shorlist-img"}
          className="details-poster"
        ></img>
      </div>
      <div className="movie-container">
        <div className="details-title">{movie.title}</div>
        <div className="details-org-title">{movie.original_title}</div>
        <div className="details-date">{movie.release_date}</div>
        <div className="details-overview">{movie.overview}</div>
        <div className="details-rate">{movie.vote_average}</div>
      </div>
    </div>
  );
};
