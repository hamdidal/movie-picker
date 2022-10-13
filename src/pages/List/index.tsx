import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Header } from '../../components/Header'
import { SearchResult } from '../../components/SearchResult'
import { MovieProps } from '../../models/movies'
import { searchMovie } from '../../services/movie'
import "./List.css"
import Loading from '../../components/Loading'

export const List = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false)

  const {search} = useParams()
  console.log(search)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      const data = await searchMovie(search);
      setLoading(false)
      setMovies(data.results);
    };
    setMovies([]);
    getData();
    console.log("s",search)
  }, [search]);
  

  return (
    <div className='list-page'>
      {loading && <Loading/>}
      <Header/>
      <div className='movie-list'>
      {movies.map((result: MovieProps) => {
              return <SearchResult result={result} key={result.id} />;
            })}
      </div>
    </div>
  )
}
