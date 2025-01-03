import React, { Suspense, useEffect, useState } from "react";
import {
	Await,
	defer,
	Link,
	useLoaderData,
	useLocation,
	useParams,
} from "react-router-dom";
import { getVans } from "../API";
export function loader({ params }) {
	return defer({ van: getVans(params.id) });
}
const VanDetail = () => {
	const { id } = useParams();

	const location = useLocation();

	const dataPromise = useLoaderData();
	function renderVanElement(van) {
		const vanElement = (
			<div className="van-detail">
				<img src={van.imageUrl} />
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
				<h2>{van.name}</h2>
				<p className="van-price">
					<span>${van.price}</span>/day
				</p>
				<p>{van.description}</p>
				<button className="link-button">Rent this van</button>
			</div>
		);
		return vanElement;
	}
	const search = location.state?.search || "";
	const type = location.state?.type || "all";

	return (
		<div className="van-detail-container">
			<Link to={`..${search}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>
			<Suspense fallback={<h2>Loading van details...</h2>}>
				<Await resolve={dataPromise.van}>{renderVanElement}</Await>
			</Suspense>
		</div>
	);
};

export default VanDetail;
