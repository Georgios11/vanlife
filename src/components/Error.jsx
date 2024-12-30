import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	console.log(error);
	return (
		<>
			<h1>Error</h1>
			<pre>
				{error.status} - {error.statusText}
				{error.message && error.message}
			</pre>
		</>
	);
};

export default Error;
