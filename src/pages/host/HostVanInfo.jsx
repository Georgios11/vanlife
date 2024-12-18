import React, { useState } from "react";
import { useLocation, useParams } from "react-router";

const HostVanInfo = () => {
	const { id } = useParams();
	const [van, setVan] = useState(null);
	React.useEffect(() => {
		fetch(`/api/host/vans/${id}`)
			.then((res) => res.json())
			.then((data) => setVan(data.vans));
	}, [id]);
	console.log(van);
	if (!van) return <h1>Loading...</h1>;
	return (
		<div className="host-van-detail-info">
			<h4>
				Name: <span>{van.name}</span>
			</h4>
			<h4>
				Category: <span>{van.type}</span>
			</h4>

			<h4>
				Description: <span>{van.description}</span>
			</h4>
			<h4>
				Visibility: <span>Public</span>
			</h4>
		</div>
	);
};

export default HostVanInfo;
