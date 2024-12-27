/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { loginUser } from "../API";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}
export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	const data = await loginUser({ email, password });

	if (data) {
		localStorage.setItem("isLoggedIn", true);
		throw redirect("/host");
	}
	return null;
}
export default function Login() {
	const message = useLoaderData();
	const navigate = useNavigate();

	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError(null);
			setStatus("submitting");

			navigate("/host", { replace: true });
		} catch (error) {
			setError(error.message);
		} finally {
			setStatus("idle");
		}
	}

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{error && <h3 className="red">{error}</h3>}
			<Form method="post" className="login-form" replace>
				<input name="email" type="email" placeholder="Email address" />
				<input name="password" type="password" placeholder="Password" />
				<button disabled={status === "submitting"}>
					{status === "submitting" ? "Loging in..." : "Log in"}
				</button>
			</Form>
		</div>
	);
}
