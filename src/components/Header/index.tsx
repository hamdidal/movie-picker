import { LoginOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/FirebaseAuth";
import "./Header.css";

export const Header = () => {
  const navigate = useNavigate();

  const toHome = () => {
    navigate("/");
  };
  const toOut = (values: any) => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-div">
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
