import React from "react";
import { useLocation, useOutletContext } from "react-router";

const HostVanPhotos = () => {
	const { van } = useOutletContext();

	return (
		<div>
			<img className="host-van-detail-image" src={van.imageUrl} alt="" />
		</div>
	);
};

export default HostVanPhotos;
