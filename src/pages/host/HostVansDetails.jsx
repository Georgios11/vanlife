import React from "react";
import { Link, NavLink, useParams } from "react-router";

const HostVansDetails = () => {
	const { id } = useParams();
	console.log(id);
	const [van, setVan] = React.useState(null);

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
					<Link>Details</Link>
					<Link>Pricing</Link>
					<Link>Photos</Link>
				</nav>
			</div>
		</section>
	);
};

export default HostVansDetails;
