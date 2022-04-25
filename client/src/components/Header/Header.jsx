import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ReactComponent as HeaderLogo } from "../../assets/icons/robot-logo.svg";
import "./Header.scss";
import HeaderButton from "./HeaderButton/HeaderButton";

export default function Header() {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className="header">
      <div className="hero">
        <HeaderLogo className="hero__logo" />
        <h1 className="hero__text">CopyBot.xyz</h1>
      </div>
      <div className="header__left"></div>
      <div className="header__right">
        <HeaderButton
          className={`${pathname === "/" ? "selected" : ""}`}
          onClick={() => {
            history.push("/");
          }}
        >
          Home
        </HeaderButton>
        <HeaderButton
          className={`${pathname === "/" ? "selected" : ""}`}
          onClick={() => {
            history.push("/");
          }}
        >
          Build
        </HeaderButton>
      </div>
    </div>
  );
}
