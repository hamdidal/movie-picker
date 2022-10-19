import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { findMovieBydId } from "../../services/Movie/movie";
import "./Details.css";
import { SendEmail } from "../../components/SendEmail";
import { CommentForm } from "../../components/Comments";
import CommentList from "../../components/Comments/list";
import { FavoriteMovie } from "../../components/Favlist";

export const Details = () => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const notFound = "wwemzKWzjKYJFfCeiB57q3r4Bcm.svg";
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
      logo_path: "",
      origin_country: "",
    },
    release_date: "",
    vote_average: "",
  });

  const id = useParams();

  useEffect(() => {
    const getData = async () => {
      const data = await findMovieBydId(id.id);
      setMovie(data);
    };
    getData();
  }, [id]);

  return (
    <>
      <Header />
      <div className="details-container">
        <div className="details-poster-div">
          <img
            src={`${BASE_URL}${
              movie.backdrop_path || movie.poster_path || notFound
            }`}
            alt={"movie-shorlist-img"}
            className="details-poster"
          ></img>
        </div>
        <div className="movie-container">
          <div className="movie-container-left">
            <div className="details-title">{movie.title}</div>
            <div className="details-org-title">
              Original Title {movie.original_title}
            </div>
            <div className="details-overview">{movie.overview}</div>
          </div>
          <div className="movie-container-right">
            <div className="details-date">
              Release Date: {movie.release_date}
            </div>
            <div className="details-rate">IMdB Rate: {movie.vote_average}</div>
          </div>
        </div>
        <div className="fav-box">
          <FavoriteMovie slugId={id} />
        </div>
        <div className="email-box">
          <SendEmail title={movie.title} />
        </div>
        <div className="comment-box">
          <CommentForm slugId={id} />
          <CommentList slugId={id} />
        </div>
      </div>
    </>
  );
};
