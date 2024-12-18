import React from "react";
import { useLocation, useOutletContext } from "react-router";

const HostVanPricing = () => {
	const { van } = useOutletContext();
	return (
		<div>
			<span className="host-van-price">${van.price}.00</span>/day
		</div>
	);
};

export default HostVanPricing;
