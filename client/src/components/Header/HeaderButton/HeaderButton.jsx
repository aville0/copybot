import React from "react";
import "./HeaderButton.scss";

export default function HeaderButton({ children, className, onClick }) {
  return (
    <button className={`header__button ${className || ""}`} onClick={onClick}>
      {children}
    </button>
  );
}
