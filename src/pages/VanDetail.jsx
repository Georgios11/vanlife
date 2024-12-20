import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";

const VanDetail = () => {
	const { id } = useParams();
	const [van, setVan] = useState(null);
	const location = useLocation();
	console.log(location.state.search);
	useEffect(() => {
		const getVan = async () => {
			try {
				const response = await fetch(`/api/vans/${id}`);
				const data = await response.json();
				setVan(data.vans);
			} catch (error) {
				console.log(error);
			}
		};
		getVan();
	}, [id]);
	const search = location.state?.search || "";
	const type = location.state?.type || "all";

	return (
		<div className="van-detail-container">
			<Link to={`..${search}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>
			{van ? (
				<div className="van-detail">
					<img src={van.imageUrl} />
					<i className={`van-type ${van.type} selected`}>
						{van.type}
					</i>
					<h2>{van.name}</h2>
					<p className="van-price">
						<span>${van.price}</span>/day
					</p>
					<p>{van.description}</p>
					<button className="link-button">Rent this van</button>
				</div>
			) : (
				<h2>Loading...</h2>
			)}
		</div>
	);
};

export default VanDetail;
