import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const Vans = () => {
	const [vans, setVans] = useState([]);
	useEffect(() => {
		const fetchVans = async () => {
			try {
				const response = await fetch("/api/vans");
				const data = await response.json();

				setVans(data.vans);
			} catch (error) {
				console.log(error);
			}
		};
		fetchVans();
	}, []);
	const vanElements = vans.map((van) => (
		<div key={van.id} className="van-tile">
			<Link
				to={`/vans/${van.id}`}
				aria-label={`View details for ${van.name}, 
                             priced at $${van.price} per day`}
			>
				<img src={van.imageUrl} alt={`Image of ${van.name}`} />
				<div className="van-info">
					<h2>{van.name}</h2>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</Link>
		</div>
	));
	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list">{vanElements}</div>
		</div>
	);
};

export default Vans;
