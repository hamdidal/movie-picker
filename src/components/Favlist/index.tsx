import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../../services/FirebaseAuth";
import {
  createFavlist,
  getFavlistForUserId,
} from "../../services/Movie/comment";
import { findMovieBydId } from "../../services/Movie/movie";
import "./FavList.css"

export const FavoriteMovie = ({ slugId }: any) => {
  const [movieTitle, setMovieTitle] = useState("");
  const [favorite, setFavorite] = useState({});
  const [userId, setUserId] = useState("");
  const [movieId, setMovieId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const data = await findMovieBydId(slugId.id);
      setMovieId(data.id);
      setUserId(getUser()?.uid || "");
      setMovieTitle(data.title);
      console.log("1", data, userId);
    };
    getData();
    console.log("2", userId, movieTitle, movieId);
  }, [movieId, movieTitle, slugId.id, userId]);

  const submitHandler = async (id: any) => {
    if (id === movieId)
      try {
        setLoading(true);
        const fav = {
          movieId: movieId,
          userId: userId,
          movieTitle: movieTitle,
        };
        await createFavlist(fav);
        const favlist: any = getFavlistForUserId(userId);
        console.log("3", favlist);
        setFavorite(favlist);
        console.log(favorite);
        setLoading(false);
        toast.success("fav posted!");
      } catch (error) {
        setLoading(false);
        toast.error("oh no!");
      }
  };
  return (
    <div className="fav-container">
      <button onClick={() => submitHandler(movieId)} className="fav-button">
        {favorite ? "add fav" : "already fav"}
      </button>
    </div>
  );
};
