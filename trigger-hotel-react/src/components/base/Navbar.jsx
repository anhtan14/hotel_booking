import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import APIService from "../../service/APIService";

function Navbar() {
  const isAuthenticated = APIService.isAuthenticated();
    const isAdmin = APIService.isAdmin();
    const isUser = APIService.isUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        const isLogout = window.confirm('Are you sure you want to logout this user?');
        if (isLogout) {
            APIService.logout();
            navigate('/home');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/home">Phegon Hotel</NavLink>
            </div>
            <ul className="navbar-ul">
                <li><NavLink to="/home" activeclassname="active">Home</NavLink></li>
                <li><NavLink to="/rooms" activeclassname="active">Rooms</NavLink></li>
                <li><NavLink to="/find-booking" activeclassname="active">Find my Booking</NavLink></li>

                {isUser && <li><NavLink to="/profile" activeclassname="active">Profile</NavLink></li>}
                {isAdmin && <li><NavLink to="/admin" activeclassname="active">Admin</NavLink></li>}

                {!isAuthenticated &&<li><NavLink to="/login" activeclassname="active">Login</NavLink></li>}
                {!isAuthenticated &&<li><NavLink to="/register" activeclassname="active">Register</NavLink></li>}
                {isAuthenticated && <li onClick={handleLogout}>Logout</li>}
            </ul>
        </nav>
    );
}

export default Navbar;
