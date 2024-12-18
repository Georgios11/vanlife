import React from "react";
import { useLocation, useOutletContext } from "react-router";

const HostVanPhotos = () => {
	const { van } = useOutletContext();

	return <img className="host-van-detail-image" src={van.imageUrl} alt="" />;
};

export default HostVanPhotos;
