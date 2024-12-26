import { redirect } from "react-router-dom";

export async function requireAuth() {
	const isLoggedIn = false; // Replace this with real authentication logic
	console.log("Checking authentication..."); // Debug log

	if (!isLoggedIn) {
		console.log("User not authenticated. Redirecting to /login");
		throw redirect("/login");
	}

	console.log("User authenticated");
}
