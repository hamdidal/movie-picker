import { LoginOutlined } from "@ant-design/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth";
import "./Header.css";

export const Header = () => {

  const navigate = useNavigate()

  const toOut = (values: any) => {
      logout()
      navigate('/login')
      console.log(toOut)
  }

  return (
    <div className="home-div">
      <div className="title">moviepicker</div>
      <div>
        <button className="out-btn-home" onClick={toOut}>
          <LoginOutlined className="out-icon" />
          Logout
        </button>
      </div>
    </div>
  );
};
