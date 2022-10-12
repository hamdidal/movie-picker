import { Image } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./SearchResult.css"

const SearchResult = ({ result }: any) => {
  const BASE_URL = "https://image.tmdb.org/t/p/original/";
  console.log("a", result["poster_path"]);

  const navigate = useNavigate();

  const toMovie = (id: string) => {
    navigate("/detailspage/" + id);
  };
  return (
    <div onDoubleClick={() => toMovie(result.id)} className="shortlist-container" >
    <div className="shortlist-card">
    <div className="shortlist-grid"> 
        <h4 className="shortlist-title"> {result.original_title} </h4>
        <h5 className="shortlist-overview"> {result.overview} </h5>
        <h6 className="shortlist-date"> Release Date {result.release_date} </h6>
        <h6 className="shortlist-vote"> IMdB Rate {result.vote_average} </h6>
      </div>
      <Image preview={false}
          src={
            `${BASE_URL}${result.backdrop_path || result.poster_path}` ||
            `${BASE_URL}${result.poster_path}` || "https://lightning.od-cdn.com/static/img/no-cover_en_US.a8920a302274ea37cfaecb7cf318890e.jpg"
          }
          alt={"movie-shorlist-img"}
          className="shortlist-poster"
        ></Image>
    </div>
    </div>
  );
};

export default SearchResult;
