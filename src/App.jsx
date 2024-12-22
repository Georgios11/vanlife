import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
	BrowserRouter,
	Link,
	Route,
	Routes,
	redirect,
} from "react-router-dom";
import About from "./pages/About";
import Home from "./pages/Home";
import "./server";
import Vans, { loader as vansLoader } from "./pages/Vans";
import VanDetail from "./pages/VanDetail";
import Layout from "./components/Layout";
import Dashboard from "./pages/host/Dashboard";
import Income from "./pages/host/Income";
import Reviews from "./pages/host/Reviews";
import HostLayout from "./components/HostLayout";
import HostVansDetails from "./pages/host/HostVansDetails";
import HostVans from "./pages/host/HostVans";
import HostVanPricing from "./pages/host/HostVanPricing";
import HostVanPhotos from "./pages/host/HostVanPhotos";
import HostVanInfo from "./pages/host/HostVanInfo";
import NotFound from "./pages/NotFound";
import Error from "./pages/Error";
import Login from "./pages/Login";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="login" element={<Login />} />
			<Route
				path="vans"
				element={<Vans />}
				loader={vansLoader}
				errorElement={<Error />}
			/>
			<Route path="vans/:id" element={<VanDetail />} />

			<Route path="host" element={<HostLayout />}>
				<Route
					index
					element={<Dashboard />}
					loader={async () => {
						return null;
					}}
				/>
				<Route
					path="income"
					element={<Income />}
					loader={async () => {
						return null;
					}}
				/>
				<Route
					path="reviews"
					element={<Reviews />}
					loader={async () => {
						return null;
					}}
				/>
				<Route
					path="vans"
					element={<HostVans />}
					loader={async () => {
						return null;
					}}
				/>
				<Route
					path="vans/:id"
					element={<HostVansDetails />}
					loader={async () => {
						return null;
					}}
				>
					<Route
						index
						element={<HostVanInfo />}
						loader={async () => {
							return null;
						}}
					/>
					<Route
						path="pricing"
						element={<HostVanPricing />}
						loader={async () => {
							return null;
						}}
					/>
					<Route
						path="photos"
						element={<HostVanPhotos />}
						loader={async () => {
							return null;
						}}
					/>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Route>,
	),
);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
