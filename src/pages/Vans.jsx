import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { getVans } from "../API";

const Vans = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");

	const [vans, setVans] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(null);
	useEffect(() => {
		const fetchVans = async () => {
			setIsLoading(true);
			try {
				const data = await getVans();

				setVans(data);
			} catch (error) {
				console.log(error);
				setIsError(error);
			} finally {
				setIsLoading(false);
			}
		};
		fetchVans();
	}, []);
	const displayedVans = typeFilter
		? vans.filter((van) => van.type.toLowerCase() === typeFilter)
		: vans;
	const vanElements = displayedVans.map((van) => (
		<div key={van.id} className="van-tile">
			<Link
				to={`${van.id}`}
				state={{
					search: `?${searchParams.toString()}`,
					type: typeFilter,
				}}
			>
				<img src={van.imageUrl} />
				<div className="van-info">
					<h3>{van.name}</h3>
					<p>
						${van.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`van-type ${van.type} selected`}>{van.type}</i>
			</Link>
		</div>
	));
	if (isLoading) return <h1 aria-live="polite">Loading...</h1>;
	if (isError)
		return (
			<h1 aria-live="assertive">There was an error {isError.message}</h1>
		);

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<div className="van-list-filter-buttons">
				<button
					className={`van-type luxury ${
						typeFilter === "luxury" ? "selected" : ""
					}`}
					onClick={() => {
						setSearchParams({ type: "luxury" });
					}}
				>
					Luxury
				</button>
				<button
					className={`van-type rugged ${
						typeFilter === "rugged" ? "selected" : ""
					}`}
					onClick={() => {
						setSearchParams({ type: "rugged" });
					}}
				>
					Rugged
				</button>
				<button
					className={`van-type simple ${
						typeFilter === "simple" ? "selected" : ""
					}`}
					onClick={() => {
						setSearchParams({ type: "simple" });
					}}
				>
					Simple
				</button>
				{typeFilter ? (
					<button
						className="van-type clear-filters"
						onClick={() => {
							setSearchParams({});
						}}
					>
						Clear filters
					</button>
				) : null}
			</div>
			<div className="van-list">{vanElements}</div>
		</div>
	);
};

export default Vans;
