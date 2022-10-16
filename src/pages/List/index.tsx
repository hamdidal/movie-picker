import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../components/Header";
import { SearchResult } from "../../components/SearchResult";
import { MovieProps } from "../../models/movies";
import { searchMovie } from "../../services/Movie/movie";
import "./List.css";
import InfiniteScroll from "react-infinite-scroll-component";

export const List = () => {
  const [movies, setMovies] = useState([] as any[]);
  const [page, setPage] = useState(1);

  const { search } = useParams();
  const fetchMoreData = () => {
    setPage(page + 1);
    setTimeout(() => {
      movies.concat(Array.from({ length: 20 }));
    });
  };

  useEffect(() => {
    const getData = async () => {
      const data = await searchMovie({ query: search, page });
      setMovies([...movies, ...data.results]);
    };
    setMovies([movies]);
    getData();
  }, [page]);

  return (
    <div className="list-page">
      <Header />
      <div className="movie-list">
        <InfiniteScroll
          dataLength={movies.length}
          next={fetchMoreData}
          hasMore={true}
          loader={<h3>Loading</h3>}
        >
          {movies.map((result: MovieProps, index) => {
            return <SearchResult result={result} key={index} />;
          })}
        </InfiniteScroll>
      </div>
    </div>
  );
};
