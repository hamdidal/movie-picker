import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { FavlistPropsModel } from "../../models/movies";
import { getFavlistForUserId } from "../../services/Movie/comment";

export const Favlist = (userId: any) => {
  const [favs, setFavs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFav = async () => {
      try {
        const response = await getFavlistForUserId(userId.userId);
        let _favs: any = [];
        if (response) {
          _favs = response;
        }
        setFavs(_favs);
        setLoading(false);
      } catch (error) {}
    };
    getFav();
  }, [userId]);

  if (loading) return <div>loading...</div>;
  return (
    <div>
      {favs.map((favs: FavlistPropsModel, index) => {
        return (
          <div key={index}>
            <div> {favs.movieTitle} </div>
          </div>
        );
      })}
    </div>
  );
};
