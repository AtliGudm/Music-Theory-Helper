import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav>
        <ul>
            <li>
            <NavLink to="/">Home</NavLink>
            </li>
            <li>
                <NavLink to="/Page_1">Page 1</NavLink>
            </li>
            <li>
                <NavLink to="/ScaleFinder">Scale Finder</NavLink>
            </li>
        </ul>
        </nav>
    );
}

export default Navbar;