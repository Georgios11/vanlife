import React from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
	return (
		<header>
			<Link className="site-logo" to="/">
				#VanLife
			</Link>
			<nav>
				<NavLink to="about">About</NavLink>
				<NavLink to="/">Home</NavLink>
			</nav>
		</header>
	);
}
