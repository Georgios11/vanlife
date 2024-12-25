/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
	const isLoggedIn = false; // Replace with actual logic

	if (!isLoggedIn) {
		return <Navigate to="/login" />;
	}

	return children;
}
export default RequireAuth;
