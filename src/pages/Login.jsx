/* eslint-disable react/prop-types */
import React, { useState } from "react";
import {
	Form,
	redirect,
	useActionData,
	useLoaderData,
	useNavigate,
	useNavigation,
} from "react-router-dom";
import { loginUser } from "../API";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	let err = null;
	try {
		await loginUser({ email, password });
		localStorage.setItem("isLoggedIn", true);
		return redirect("/host");
	} catch (error) {
		err = error.message;
		return err;
	}
}

export default function Login() {
	const message = useLoaderData();

	const errorMessage = useActionData();
	const navigation = useNavigation();

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{errorMessage && <h3 className="red">{errorMessage}</h3>}
			<Form method="post" className="login-form" replace={true}>
				<input name="email" type="email" placeholder="Email address" />
				<input name="password" type="password" placeholder="Password" />
				<button disabled={navigation.state === "submitting"}>
					{navigation.state === "submitting"
						? "Loging in..."
						: "Log in"}
				</button>
			</Form>
		</div>
	);
}
