import { LoginOutlined } from "@ant-design/icons";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import "./Header.css";

export const Header = () => {

  const location = useLocation

  const navigate = useNavigate()

  const toHome = () => {
    if (!location.name.includes('/')) {
      navigate('/')
  }
  }
  const toOut = (values: any) => {
      logout()
      navigate('/login')
      console.log(toOut)
  }

  return (
    <div className="home-div">
      <div className="title" onClick={toHome}>moviepicker</div>
      <div>
        <button className="out-btn-home" onClick={toOut}>
          <LoginOutlined className="out-icon" />
        </button>
      </div>
    </div>
  );
};
