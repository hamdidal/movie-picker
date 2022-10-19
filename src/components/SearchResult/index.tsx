import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }: any) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  const notFound = "kwwemzKWzjKYJFfCeiB57q3r4Bcm.svg";

  const navigate = useNavigate();

  const toMovie = (id: string) => {
    navigate("/detailspage/" + id);
  };

  const getImage = (result: any) =>
    `${BASE_URL}${result.poster_path || result.backdrop_path || notFound}`;

  return (
    <div
      onClick={() => toMovie(result.id)}
      className="shortlist-container"
      style={{ backgroundImage: `url(${getImage(result)})` }}
    >
      <div className="shortlist-card">
        <div className="shortlist-grid">
          <h4 className="shortlist-title"> {result.original_title} </h4>
          <h5 className="shortlist-overview"> {result.overview} </h5>
        </div>
      </div>
    </div>
  );
};
