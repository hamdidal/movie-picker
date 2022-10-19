import { LoginOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUser, logout } from "../../services/FirebaseAuth";
import "./Header.css";
import { Button, Modal } from "antd";
import { Favlist } from "../Favlist/favlist";

export const Header = () => {
  const [userId, setUserId] = useState("");
  useEffect(() => {
    setUserId(getUser()?.uid || "");
  }, []);

  const location = useLocation;

  const navigate = useNavigate();

  const toHome = () => {
    if (!location.name.includes("/")) {
      navigate("/");
    }
  };
  const toOut = (values: any) => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-div">
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
            <div style={{ color: "black" }}>
              Favorite Movies <Favlist userId={userId} />
            </div>
          </div>
        </div>
      </div>
      <div className="title" onClick={toHome}>
        moviepicker
      </div>
      <div>
        <button className="out-btn-home" onClick={toOut}>
          <LoginOutlined className="out-icon" />
        </button>
      </div>
    </div>
  );
};
