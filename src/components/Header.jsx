import React from "react";
import { Link, NavLink } from "react-router-dom";
import imageUrl from "../assets/images/avatar-icon.png";
export default function Header() {
	return (
		<header>
			<Link className="site-logo" to="/">
				#VanLife
			</Link>
			<nav>
				<NavLink to="/host">Host</NavLink>
				<NavLink to="/about">About</NavLink>
				<NavLink to="/vans">Vans</NavLink>
				<NavLink to="/">Home</NavLink>
				<Link to="login" className="login-link">
					<img src={imageUrl} className="login-icon" alt="login" />
				</Link>
			</nav>
		</header>
	);
}
