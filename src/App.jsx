import { BrowserRouter, Link, Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./server";
import Vans from "./pages/Vans";
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
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="*" element={<NotFound />} />
					<Route index element={<Home />} />
					<Route path="about" element={<About />} />
					<Route path="vans" element={<Vans />} />
					<Route path="vans/:id" element={<VanDetail />} />

					<Route path="host" element={<HostLayout />}>
						<Route index element={<Dashboard />} />
						<Route path="income" element={<Income />} />
						<Route path="reviews" element={<Reviews />} />
						<Route path="vans" element={<HostVans />} />
						<Route path="vans/:id" element={<HostVansDetails />}>
							<Route index element={<HostVanInfo />} />
							<Route
								path="pricing"
								element={<HostVanPricing />}
							/>
							<Route path="photos" element={<HostVanPhotos />} />
						</Route>
					</Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
export default App;
