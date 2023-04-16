import React from "react";
import { ReactNavbar } from "overlay-navbar";
import logo from "../../../images/logo.jpg";
import { FaUserAlt, FaCartPlus, FaSearch } from "react-icons/fa";

const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "20vmax",
  navColor1: "white",
  logoHoverSize: "10px",
  logoHoverColor: "#eb4034",
  link1Text: "Home",
  link2Text: "Bikes",
  link3Text: "Contact",
  link4Text: "About",
  link5Text: "Rental",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/Contact",
  link4Url: "/About",
  link5Url: "/Rental",
  link1Size: "1.3vmax",
  link1Color: "rgba(35,35,35,0.8)",
  nav1justifycontent: "flex-end",
  nav2justifycontent: "flex-end",
  nav3justifycontent: "flex-start",
  nav4justifycontent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Margin: "1vmax",
  profileIconColor: "rgba(35,35,35,0.8)",
  searchIconColor: "rgba(35,35,35,0.8)",
  cartIconColor: "rgba(35,35,35,0.8)",
  profileIconColorHover: "#eb4034",
  searchIconColorHover: "#eb4034",
  cartIconColorHover: "#eb4034",
  cartIconMargin: "1vmax",
  profileIcon: true,
  ProfileIconElement: FaUserAlt,
  cartIcon: true,
  CartIconElement: FaCartPlus,
  searchIcon: true,
  SearchIconElement: FaSearch,
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
