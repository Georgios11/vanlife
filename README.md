# Nested Routes

When we want to keep displaying some UI on the pate, but also want to display more.

## Fixing the Navbar with a Layout Route

[Layout Routes Docs ->](https://reactrouter.com/6.28.0/start/concepts#layout-routes)

It doesn't have a path of it's own. It's purpose is to layout the page

-   Challenge: set up the code so we can use a layout route!
    1. Create a folder called "components"
    2. Create 2 new component files: Layout.jsx and Header.jsx
    3. Move the <header> code below to the Header component file.
       (DON'T import that Header component here!)

**We create a Route that is not self-closing and we wrap our routes in it**

```javascript
<Routes>
	<Route element={<Layout />}>
		<Route path="/" element={<Home />} />
		<Route path="/about" element={<About />} />
		<Route path="/vans" element={<Vans />} />
		<Route path="/vans/:id" element={<VanDetail />} />
	</Route>
</Routes>
```

In Layout.jsx we use **Outlet**

```javascript
import React from "react";
import { Outlet } from "react-router";

const Layout = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default Layout;
```

## Bootstrap the Host pages

-   Challenge:

1.  Add a "Host" link to the Navbar that takes you to the "/host" path
2.  Create the following components in the pages/Host folder:
    a. Dashboard ("/host")
    b. Income ("/host/income")
    c. Reviews ("/host/reviews")
    These components can just have an h1 for now that says, e.g.
    "Host Dashboard here".
3.  Set up routes for each of these pages in the Routes below. FOR NOW,
    don't worry about nesting anything, you can just put them on the same
    level as the "/vans", etc. routes below.

-   Challenge:

1. Turn the "/host" path into a parent route and nest "/host/income" and "/host/reviews" as children routes. Then try entering "/host/income" in the URL and see what happens.
2. See if you can figure out why it did what it did.

```javascript
import React from "react";
import { Outlet } from "react-router";

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<Outlet />
		</div>
	);
};

export default Dashboard;
```

```javascript
<BrowserRouter>
	<Routes>
		<Route element={<Layout />}>
			<Route path="/" element={<Home />} />
			<Route path="/about" element={<About />} />
			<Route path="/vans" element={<Vans />} />
			<Route path="/vans/:id" element={<VanDetail />} />
			<Route path="/host" element={<Dashboard />}>
				<Route path="/host/income" element={<Income />} />
				<Route path="/host/reviews" element={<Reviews />} />
			</Route>
		</Route>
	</Routes>
</BrowserRouter>
```

-   Challenge: Make the HostLayout component!

    -   The HostLayout should use Links to navigate to the following
    -   routes:
        -                     Dashboard ("/host")
        -   -   Income ("/host/income")
        -   -   Reviews ("/host/reviews")
    -   Then replace the parent "/host" route's element below with the new HostLayout component you made.

-   NOTE: The dashboard route/page will be gone for now, but don't fret.
-   We'll be fixing that in the next lesson.

```javascript
import React from "react";
import { Link, Outlet } from "react-router";

const HostLayout = () => {
	return (
		<>
			<nav className="host-nav">
				<Link to="/host">Dashboard</Link>
				<Link to="/host/income">Income</Link>
				<Link to="/host/reviews">Reviews</Link>
			</nav>
			<Outlet />
		</>
	);
};

export default HostLayout;
```

## Relative Paths

When we start the route with / React Router thinks it is an absolute path. We can omit it for nested routes

[Index Routes Docs ->](https://reactrouter.com/6.28.0/start/concepts#index-routes)

Fixed with **index property**

```javascript
<BrowserRouter>
	<Routes>
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="about" element={<About />} />
			<Route path="vans" element={<Vans />} />
			<Route path="vans/:id" element={<VanDetail />} />
			<Route path="host" element={<HostLayout />}>
				<Route index element={<Dashboard />} />
				<Route path="income" element={<Income />} />
				<Route path="reviews" element={<Reviews />} />
			</Route>
		</Route>
	</Routes>
</BrowserRouter>
```
