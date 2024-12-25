import { redirect } from "react-router-dom";

export async function requireAuth() {
	const isLoggedIn = true;
	console.log("auth check start");
	if (!isLoggedIn) {
		console.log("redirect");
		throw redirect("/login");
	}
	console.log("auth check pass");
	return null;
}
