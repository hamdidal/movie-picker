import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SearchResult } from "../../components/SearchResult";
import { MovieProps } from "../../models/movies";
import { searchMovie } from "../../services/Movie/movie";
import "./List.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUser } from "../../services/FirebaseAuth";

export const List = () => {
  const [movies, setMovies] = useState([] as any[]);
  const [userId, setUserId] = useState("");
  const [page, setPage] = useState(1);

  const { search } = useParams();
  const fetchMoreData = async () => {
    setPage(page + 1);
    const data = await searchMovie({ query: search, page });
    setMovies([...movies, ...data.results]);
  };

  useEffect(() => {
    const getData = async () => {
      setUserId(getUser()?.uid || "");
      const data = await searchMovie({ query: search, page: 1 });
      setMovies([...data.results]);
    };
    getData();
  }, [search]);

  return (
    <div className="list-page">
      <Header />
      <div className="movie-list">
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={true}
          loader={false}
        >
          {movies.map((result: MovieProps, index) => {
            return <SearchResult result={result} key={index} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};
