import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResult.css";

export const SearchResult = ({ result }: any) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";

  const navigate = useNavigate();

  const toMovie = (id: string) => {
    navigate("/detailspage/" + id);
  };

  const getImage = (result: any) =>
    `${BASE_URL}${result.poster_path || result.backdrop_path}` ||
    "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg";

  return (
    <div
      onDoubleClick={() => toMovie(result.id)}
      className="shortlist-container"
      style={{ backgroundImage: `url(${getImage(result)})` }}
    >
      <div className="shortlist-card">
        <div className="shortlist-grid">
          <h4 className="shortlist-title"> {result.original_title} </h4>
          <h5 className="shortlist-overview"> {result.overview} </h5>
        </div>
        {/* <Image preview={false}
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}` || "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg"
          }
          alt={"movie-shorlist-img"}
          className="shortlist-poster"
        ></Image> */}
      </div>
    </div>
  );
};
