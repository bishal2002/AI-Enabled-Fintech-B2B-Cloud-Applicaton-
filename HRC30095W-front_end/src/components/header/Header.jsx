import React from "react";
import logo from "../../assets/logo.png";

const Header = () => {
  return (
    <header>
      <img src={logo} alt="logo" className="logo primary" />
      <img src={logo} alt="logo" className="logo secondary" />
    </header>
  );
};

export default Header;
