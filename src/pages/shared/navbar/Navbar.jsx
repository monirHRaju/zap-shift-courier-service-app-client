import React from "react";
import Logo from "../../../components/logo/Logo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../Hooks/useAuth";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate()
  const {user, logOut} = useAuth()
  const handleLogout = () => {
    logOut()
    .then(() =>
      {
        navigate('/')
       setTimeout(() => {
          toast.success('logged out successfully!.')
        }, 1000)
      }
    )
    .catch(e => console.log(e))
  }
  const links = (
    <>
      <li><NavLink to={'/'}>Home</NavLink></li>
      <li><NavLink to={'/coverage'}>Coverage</NavLink></li>
      <li><NavLink to={'/services'}>Services</NavLink></li>
      <li><NavLink to={'/about'}>About</NavLink></li>
      <li><NavLink to={'/contact'}>Contact</NavLink></li>

    </>
  );
  return (
    <div className="navbar bg-secondary text-primary shadow-sm rounded-2xl p-5">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <a className="cursor-pointer text-xl">
          <Logo></Logo>
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {links}
        </ul>
      </div>
      <div className="navbar-end">
        {
          user
          ? <a onClick={handleLogout} className="btn btn-primary text-secondary">Logout</a>
          : <Link to={'/login'}>Login</Link>
        }
        <Link to={'/be-a-rider'} className="btn btn-primary text-secondary mx-3">Be a Rider</Link>
      </div>
    </div>
  );
};

export default Navbar;
