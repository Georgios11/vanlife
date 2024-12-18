import React, { useState } from "react";
import { useLocation, useParams, useOutletContext } from "react-router";

const HostVanInfo = () => {
	const { van } = useOutletContext();
	if (!van) return <h1>Loading...</h1>;
	return (
		<section className="host-van-detail-info">
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
		</section>
	);
};

export default HostVanInfo;
