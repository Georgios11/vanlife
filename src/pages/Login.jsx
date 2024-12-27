/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useLoaderData, useSearchParams } from "react-router-dom";
import { loginUser } from "../API";

export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}
export default function Login() {
	const message = useLoaderData();

	const [loginFormData, setLoginFormData] = useState({
		email: "",
		password: "",
	});
	const [status, setStatus] = useState("idle");
	const [error, setError] = useState(null);
	async function handleSubmit(e) {
		e.preventDefault();
		try {
			setError(null);
			setStatus("submitting");
			const response = await loginUser(loginFormData);
			console.log(response);
		} catch (error) {
			setError(error.message);
		} finally {
			setStatus("idle");
		}
	}

	function handleChange(e) {
		const { name, value } = e.target;
		setLoginFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	}

	return (
		<div className="login-container">
			<h1>Sign in to your account</h1>
			{message && <h3 className="red">{message}</h3>}
			{error && <h3 className="red">{error}</h3>}
			<form onSubmit={handleSubmit} className="login-form">
				<input
					name="email"
					onChange={handleChange}
					type="email"
					placeholder="Email address"
					value={loginFormData.email}
				/>
				<input
					name="password"
					onChange={handleChange}
					type="password"
					placeholder="Password"
					value={loginFormData.password}
				/>
				<button disabled={status === "submitting"}>
					{status === "submitting" ? "Loging in..." : "Log in"}
				</button>
			</form>
		</div>
	);
}
