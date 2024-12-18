import React from "react";
import { useLocation } from "react-router";

const HostVanPricing = () => {
	const location = useLocation();
	console.log(location.state);
	return (
		<div>
			<span className="host-van-price">${location.state}.00</span>/day
		</div>
	);
};

export default HostVanPricing;
