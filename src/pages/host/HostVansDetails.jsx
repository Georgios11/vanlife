import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router";

const HostVansDetails = () => {
	const { id } = useParams();

	const [van, setVan] = React.useState(null);
	const activeStyles = {
		fontWeight: "bold",
		textDecoration: "underline",
		color: "#161616",
	};
	React.useEffect(() => {
		fetch(`/api/host/vans/${id}`)
			.then((res) => res.json())
			.then((data) => setVan(data.vans));
	}, [id]);

	if (!van) {
		return <h1>Loading...</h1>;
	}

	return (
		<section>
			<Link to=".." relative="path" className="back-button">
				&larr; <span>Back to all vans</span>
			</Link>
			<div className="host-van-detail-layout-container">
				<div className="host-van-detail">
					<img src={van.imageUrl} />
					<div className="host-van-detail-info-text">
						<i className={`van-type van-type-${van.type}`}>
							{van.type}
						</i>
						<h3>{van.name}</h3>
						<h4>${van.price}/day</h4>
					</div>
				</div>
				<nav className="host-van-detail-nav ">
					<NavLink
						to="."
						end
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Details
					</NavLink>
					<NavLink
						to="pricing"
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Pricing
					</NavLink>
					<NavLink
						to="photos"
						style={({ isActive }) =>
							isActive ? activeStyles : null
						}
					>
						Photos
					</NavLink>
				</nav>
				<Outlet context={{ van }} />
			</div>
		</section>
	);
};

export default HostVansDetails;
