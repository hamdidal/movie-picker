import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getUser } from "../../services/FirebaseAuth";
import {
  createFav,
  deleteFav,
  isFavoriteByMovieAndUserId,
} from "../../services/Movie/comment";
import Loading from "../Loading";
import "./FavList.css";

interface Props {
  movieId: number;
  movieTitle: string;
}

export const FavButton = (props: Props) => {
  const [favoriteId, setFaviroteId] = useState(undefined as string | undefined);
  const [loading, setLoading] = useState(false);

  const userId = getUser()?.uid || "";

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const data = await isFavoriteByMovieAndUserId(props.movieId, userId);
      setLoading(false);
      setFaviroteId(data.id);
    };
    getData();
  }, [props.movieId, userId]);

  const submitHandler = async () => {
    if (favoriteId == null) {
      setLoading(true);
      const fav = {
        movieId: props.movieId,
        movieTitle: props.movieTitle,
        userId: userId,
      };
      const createdFav = await createFav(fav);
      setFaviroteId(createdFav);
      setLoading(false);
      toast.success("fav posted!");
    } else {
      setLoading(true);
      await deleteFav(favoriteId);
      setFaviroteId(undefined);
      setLoading(false);
      toast.success("fav deleted!");
    }
  };
  return (
    <div>
      {loading && <Loading />}
      <div className="fav-container">
        <button onClick={() => submitHandler()} className="fav-button">
          {favoriteId == null ? "add fav" : "remove fav"}
        </button>
      </div>
    </div>
  );
};
