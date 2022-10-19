import React, { useEffect, useState } from "react";
import { getUser } from "../../services/FirebaseAuth";
import { Favlist } from "./favlist";
import "../Header/Header.css";

export const FavModal = () => {
  const [userId, setUserId] = useState("");

  useEffect(() => {
    setUserId(getUser()?.uid || "");
  }, []);
  return (
    <div>
      <div className="section">
        <input
          className="modal-btn"
          type="checkbox"
          id="modal-btn"
          name="modal-btn"
        />
        <label htmlFor="modal-btn">Favorite Movies</label>
        <div className="modal">
          <div className="modal-wrap">
            <div className="modal-box">
              <span className="modal-title">Favorite Movies</span> <Favlist userId={userId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
