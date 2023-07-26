import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate()

  const handleDeleteToken = () => {
    localStorage.clear("token");
    navigate("/about");
  };

  return (
    <navbar>
      <Link to={"/about"} className="nav-link">
        <p className="about">About</p>
      </Link>
      <Link to={"/checker"} className="nav-link">
        <p className="checker">Checker</p>
      </Link>
      {token ? (
        <>
          <Link to={"/user"} className="nav-link">
            <p className="user">Profile</p>
          </Link>
          <p className="sign-out" onClick={handleDeleteToken}>
            Log out
          </p>
        </>
      ) : (
        <>
          <Link to={"/login"} className="nav-link">
            <p className="sign-in">Sign in</p>
          </Link>
          <Link to={"/register"} className="nav-link">
            <p className="sign-up">Sign up</p>
              </Link>
        </>
        )}
    </navbar>
  );
};
export default Navbar;

