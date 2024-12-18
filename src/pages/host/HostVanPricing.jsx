import React from "react";
import { useLocation, useOutletContext } from "react-router";

const HostVanPricing = () => {
	const { van } = useOutletContext();
	return (
		<h3 className="host-van-price">
			${van.price}
			<span>/day</span>
		</h3>
	);
};

export default HostVanPricing;
