import React, { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import Button from "./Button";
import FormLogin from "./FormLogin";

import { useHistory } from "react-router-dom";
import { userService } from "../service/userService";

const classes = {
  navbar:
    "flex  relative justify-between items-center text-lg font-quicksand select-none text-grey-900 bg-gray-400 h-20 p-10 sticky top-0 z-20",

  menuLarge: "hidden sm:flex space-x-10 items-center h-10  ",
  logoLink: "flex space-x-3 items-baseline text-2xl font-bold",
  menuItem: "",
  menuLink: "text-white cursor-pointer hover:text-blue-200  ",
  menuButton: "",
  menuIcon: "flex cursor-pointer text-2xl text-white sm:hidden ",
  menuMobile: (click) =>
    `${
      click
        ? "flex flex-col bg-gray-400  space-y-10 py-5 items-center absolute top-20 left-0 h-screen w-full z-10 sm:hidden"
        : "hidden"
    }`,
  modalLoginForm: (openLogin) =>
    `${
      openLogin
        ? "bg-black bg-opacity-50 absolute inset-0 h-screen w-full z-40 "
        : "hidden"
    }`,
  wrapperForm:
    "flex h-full bg-gray-800 rounded-lg flex-col justify-center items-center ",
  closeIcon:
    "bg-gray-500 rounded-full h-8 w-8 text-red-500 hover:text-red-800 cursor-pointer mt-2 ",
  // closeModal: "flex bg-blue-800 justify-center items-center w-full h-20 -mb-30",
  formContact: "",
};

function Navigation() {
  const [showMenuMobile, setShowMenuMobile] = useState(false);
  const handleClick = () => setShowMenuMobile(!showMenuMobile);
  const closeMobileMenu = () => setShowMenuMobile(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);

  let history = useHistory();
  useEffect(() => {
    // showLargeMenu();
  }, []);

  return (
    <>
      <div className={classes.navbar}>
        <Link
          to="/comiteList"
          className={classes.logoLink}
          onClick={closeMobileMenu}
        >
          <img className="w-30 h-20" src="/images/logo_pudc.jpeg" alt="logo" />
          <h4 className="text-green-700"> </h4>
        </Link>
        <div className={classes.menuIcon} onClick={handleClick}>
          {showMenuMobile ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={classes.menuMobile(showMenuMobile)}>
          <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/comiteList" className={classes.menuLink}>
              {" "}
              Comite
            </Link>
          </li>
          <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/equipement-all" className={classes.menuLink}>
              {" "}
              Equipement
            </Link>
          </li>
          <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/panne-all" className={classes.menuLink}>
              {" "}
              Panne
            </Link>
          </li>

          <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/formation-all" className={classes.menuLink}>
              {" "}
             Formation
            </Link>
          </li>
          {/* <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/menu" className={classes.menuLink}>
              {" "}
              Menu
            </Link>
          </li>
          <li className={classes.menuItem} onClick={closeMobileMenu}>
            <Link to="/commande" className={classes.menuLink}>
              {" "}
              Commande
            </Link>
          </li> */}
          <li className={classes.menuButton} onClick={closeMobileMenu}>
            <Button
              primary={true}
              large={true}
              onClick={() => {
                userService.logout();
                setOpenLogout(false);
                history.push("/");
              }}
            >
              Déconnexion
            </Button>
          </li>
        </ul>

        <ul className={classes.menuLarge}>
          <li className={classes.menuItem}>
            <Link to="/comiteList" className={classes.menuLink}>
              Comite
            </Link>
          </li>
          <li className={classes.menuItem}>
            <Link to="/equipement-all" className={classes.menuLink}>
              Equipement
            </Link>
          </li>
          <li className={classes.menuItem}>
            <Link to="/panne-all" className={classes.menuLink}>
              Panne
            </Link>
          </li>
          <li className={classes.menuItem}>
            <Link to="/formation-all" className={classes.menuLink}>
            Formation
            </Link>
          </li>
          {/* <li className={classes.menuItem}>
            <Link to="/menu" className={classes.menuLink}>
              Menu
            </Link>
          </li>
          <li className={classes.menuItem}>
            <Link to="/commande" className={classes.menuLink}>
              Commande
            </Link>
          </li> */}
          <span>
            <svg
              onClick={() => {
                setOpenLogout(!openLogout);
              }}
              className="h-8 w-8  text-white rounded-full cursor-pointer "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </ul>
        <ul
          className={`${
            openLogout
              ? "bg-gray-400 text-gray-700 border-t-4 absolute top-20 right-1 p-2 rounded-b-lg  hidden sm:flex flex-col"
              : "hidden"
          }`}
        >
          <button
            onClick={() => {
              userService.logout();
              setOpenLogout(false);
              history.push("/");
            }}
          >
            Déconnexion
          </button>
        </ul>
      </div>
    </>
  );
}
export default Navigation;
