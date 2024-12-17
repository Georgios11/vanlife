import { BrowserRouter, Link, Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Header from "./components/Header";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
