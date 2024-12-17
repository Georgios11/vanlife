import { BrowserRouter, Link, Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";
import "./server";
import Vans from "./pages/Vans";
import VanDetail from "./pages/VanDetail";
function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/vans" element={<Vans />} />
				<Route path="/vans/:id" element={<VanDetail />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
