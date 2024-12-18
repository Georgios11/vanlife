import React from "react";
import { useLocation } from "react-router";

const HostVanPhotos = () => {
	const location = useLocation();
	console.log(location.state);
	return (
		<div>
			<img
				className="host-van-detail-image"
				src={location.state}
				alt=""
			/>
		</div>
	);
};

export default HostVanPhotos;
