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

\*We create a Route that is not self-closing and we wrap our routes in it\*\*

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
        -                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       Dashboard ("/host")
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

## To nest or not to nest?

## Quiz

1. What is the primary reason to use a nested route?
   Whenever we have some shared UI between routes in our app.

2. What is a "Layout Route"?
   It's the parent route of some nested routes that contains just
   the portion of the UI that will be shared. It will use an Outlet
   component.

3. What does the <Outlet /> component do? When do you use it?
   We use it anytime we have a parent Route that's wrapping
   children routes. It renders the matching child route's
   `element` prop given in its route definition

4. What is an "Index Route"?
   It's the "default route" we want to render when the path
   of the parent route matches. It gives us a chance to render
   an element inside the parent's <Outlet /> at the same path
   as the parent route.

-   Challenge: Add the footer to the site! Make a separate Footer component
    in the components folder, and just use this as the markup:

  <footer>&#169; 2022 #VANLIFE</footer>
  
  I'm mostly wanting to test your ability to find where the footer would
  be added, and don't care too much about getting the styling correct.
  But if you feel you need extra CSS practice, feel free to do the styling
  as well!

## NavLink

## Adding Host Vans Routes

-   Challenge: add the /host/vans and /host/vans/:id routes, as well
    as the "Vans" link in the Host navbar.

    -   For now, just create the stubbed-out version of the pages (i.e.
        components that just render an **h1**). Don't worry about adding
        navigation from /host/vans to /host/vans/:id yet - the link to
        /host/vans is enough for now.

    -   When deciding whether or not to use nested routes, keep in mind what will/won't be shared between these two pages. See the Figma design file (or the screenshots) to help guide your choice.

## Buildint out the Host Van Detail Page

-   Challenge (not optional!):
    -   build the shared UI portion of the Host Van Detail page. This is Optional portion: also style it to look like the design.
    -   For now, get the data from a request to `/api/host/vans/:id` and display the van image, name, price, type

```javascript
import React from "react";
import { NavLink, useParams } from "react-router";

const HostVansDetails = () => {
	const { id } = useParams();
	console.log(id);
	const [van, setVan] = React.useState(null);

	React.useEffect(() => {
		fetch(`/api/host/vans/${id}`)
			.then((res) => res.json())
			.then((data) => setVan(data.vans));
	}, [id]);
	console.log(van);
	if (!van) {
		return <h1>Loading...</h1>;
	}
	return (
		<>
			<div>
				<img src={van.imageUrl} width={150} />
				<h2>{van.name}</h2>
				<p>{van.price}</p>
				<p>{van.type}</p>
			</div>
			<nav className="host-van-detail-nav">
				<NavLink>Details</NavLink>
				<NavLink>Pricing</NavLink>
				<NavLink>Photos</NavLink>
			</nav>
		</>
	);
};
```

## Relative Links

```javascript
to = ".";
```

**Sometimes when we want to go back to relative path and NOT relative route**

```javascript
<Link to=".." relative="path" className="back-button">
	&larr; <span>Back to all vans</span>
</Link>
```

## Add /host/vans/:id Nested Route

-   Challenge: Add the routes necessary so we can access
    /host/vans/:id/pricing and /host/vans/:id/photos.

    -   Add stubbed-out components in separate files for
        these routes (e.g. <h2>Pricing view here</h2>). I already
        made the `HostVanInfo.jsx`, `HostVanPricing.jsx` and
        `HostVanPhotos.jsx` files for you, but they're empty.

    -   Don't forget: you'll need to use a special tool from
        React Router so we can keep the top info (and
        eventually the navbar we build) on the page while going
        from nested route to nested route. This will require some
        slight changes to HostVanDetail.jsx

    -   Since we don't have the navbar yet, you can test them
        by manually navigating to e.g. /host/vans/1/pricing.

## Outlet Context

We pass the Context to Outlet

```javascript
<Outlet context={{ van }} />
```

We use the Context

```javascript
const { van } = useOutletContext();
```

---

# Search/Query Params and Links

Search/Query Params can represent some kind of change in the UI
Used for sorting - filtering - pagination

**A single source of truth for certain application state**

-   Should the user be able to revisit or share the page just like it is?
    If yes, then we might consider **raising that state up** to the URL in a query parameter

-   Query Parameters
    -   Key/value pairs in the URL
    -   Begins with ?
        -   /vans?type=rugged
    -   Separated by &
        -   /vans?type=rugged&filteredBy=price

## useSearchParams

[useSearchParams docs ->](https://api.reactrouter.com/v7/functions/react_router.useSearchParams.html)

```javascript
const [searchParams, setSearchParams] = useSearchParams;

console.log(searchParams);
URLSearchParams {}
```

**We get an instance of the browser native URLSearchParams object**

-   It has a whole set of methods that we can use
    [URLSearchParams methods ->](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

-   Challenge: access the search params in this component 1. Using the hook from react-router-dom, set a variable
    called `searchParams`

2. Save the value of the `type` parameter (from the `searchParams` object) to a variable called `typeFilter`

3. Log the value of the `typeFilter` to the console

```javascript
const [searchParams, setSearchParams] = useSearchParams();
const typeFilter = searchParams.get("type");

console.log(typeFilter);
```

-   We manually type in the URL bar and see the result

### Filter the array with the search param

-   Challenge:

    -   filter the list of vans based on the `typeFilter` we created earlier. For now, just enter "simple", "luxury", or "rugged" into the search param in the URL to check your work.

````javascript
    const [searchParams, setSearchParams] = useSearchParams();
    const typeFilter = searchParams.get("type");
	const displayedVans = typeFilter
		? vans.filter((van) => van.type.toLowerCase() === typeFilter)
		: vans;
		```
````

### Using Links to add search params

-   Challenge: add links to filter the vans by type. Use a hard-coded `to` string like we just practiced. The types are "simple", "luxury", and "rugged".

        - add another Link that clears out the search params
        - For now, give the Links a className of `van-type simple` (and manually replace "simple" with "luxury" and "rugged" for the Links that filter by those types.)

        - Include a Link to clear the filters. Its className should be `van-type clear-filters`

```javascript
return (
	<div className="van-list-container">
		<h1>Explore our van options</h1>
		<div className="van-list-filter-buttons">
			<Link className="van-type luxury" to="?type=luxury">
				Luxury
			</Link>
			<Link className="van-type simple" to="?type=simple">
				Simple
			</Link>
			<Link className="van-type rugged" to="?type=rugged">
				Rugged
			</Link>
			<Link className="van-type clear-filters" to=".">
				Clear filters
			</Link>
		</div>
		<div className="van-list">{vanElements}</div>
	</div>
);
```

## Using setSearchParams setter function

-   Challenge: change the Links to buttons and use the setSearchParams function to set the search params when the buttons are clicked. Keep all the classNames the same.

```javascript
return (
	<div className="van-list-container">
		<h1>Explore our van options</h1>
		<div className="van-list-filter-buttons">
			<button
				onClick={() => {
					setSearchParams({ type: "luxury" });
				}}
			>
				Luxury
			</button>
			<button
				onClick={() => {
					setSearchParams({ type: "rugged" });
				}}
			>
				Rugged
			</button>
			<button
				onClick={() => {
					setSearchParams({ type: "simple" });
				}}
			>
				Simple
			</button>
			<button
				onClick={() => {
					setSearchParams({});
				}}
			>
				Clear filters
			</button>
		</div>
		<div className="van-list">{vanElements}</div>
	</div>
);
```

## Caveats to setting params

### Merging search params with Links

[LOOK INTO THIS ->](https://scrimba.com/learn-react-router-6-c06/~01o)

```javascript
const displayedCharacters = typeFilter
	? swCharacters.filter((char) => char.type.toLowerCase() === typeFilter)
	: swCharacters;

const charEls = displayedCharacters.map((char) => (
	<div key={char.name}>
		<h3
			style={{
				color: char.type.toLowerCase() === "jedi" ? "blue" : "red",
			}}
		>
			Name: {char.name}
		</h3>
		<p>Type: {char.type}</p>
		<hr />
	</div>
));

function genNewSearchParamString(key, value) {
	const sp = new URLSearchParams(searchParams);
	if (value === null) {
		sp.delete(key);
	} else {
		sp.set(key, value);
	}
	return `?${sp.toString()}`;
}

function handleFilterChange(key, value) {
	setSearchParams((prevParams) => {
		if (value === null) {
			prevParams.delete(key);
		} else {
			prevParams.set(key, value);
		}
		return prevParams;
	});
}

return (
	<main>
		<h2>Home</h2>
		<div>
			<Link to={genNewSearchParamString("type", "jedi")}>Jedi</Link>
			<Link to={genNewSearchParamString("type", "sith")}>Sith</Link>
			<Link to={genNewSearchParamString("type", null)}>Clear</Link>
		</div>
		<div>
			<button onClick={() => handleFilterChange("type", "jedi")}>
				Jedi
			</button>
			<button onClick={() => handleFilterChange("type", "sith")}>
				Sith
			</button>
			<button onClick={() => handleFilterChange("type", null)}>
				Clear
			</button>
		</div>
		<hr />
		{charEls}
	</main>
);
```

-   Challenges:

    1.  Conditionally render the "Clear filter" button only if there's a `type` filter currently applied in the search params

    2.  On just the 3 filter buttons (not the Clear filter button),conditionally render the className "selected" if the typeFilter value equals the value that button sets it to. (We don't have a variable for that, so it'll be a hard-coded string).

```javascript
{
	typeFilter ? (
		<button
			onClick={() => {
				setSearchParams({});
			}}
		>
			Clear filters
		</button>
	) : null;
}
```

```javascript
<div className="van-list-filter-buttons">
	<button
		className={`van-type luxury ${
			typeFilter === "luxury" ? "selected" : ""
		}`}
		onClick={() => {
			setSearchParams({ type: "luxury" });
		}}
	>
		Luxury
	</button>
	<button
		className={`van-type rugged ${
			typeFilter === "rugged" ? "selected" : ""
		}`}
		onClick={() => {
			setSearchParams({ type: "rugged" });
		}}
	>
		Rugged
	</button>
	<button
		className={`van-type simple ${
			typeFilter === "simple" ? "selected" : ""
		}`}
		onClick={() => {
			setSearchParams({ type: "simple" });
		}}
	>
		Simple
	</button>
	{typeFilter ? (
		<button
			className="van-type clear-filters"
			onClick={() => {
				setSearchParams({});
			}}
		>
			Clear filters
		</button>
	) : null}
</div>
```

## Fix remaining absolute paths

## Search Params and Links

When we click "back to all vans" we loose our filters. NOT GOOD

### History state

#### useLocation

-   Add state to Link

```javascript
	const [searchParams, setSearchParams] = useSearchParams();
	const typeFilter = searchParams.get("type");
	...
		<Link to={`${van.id}`} 	state={{ search: `?${searchParams.toString()}` }}>
```

-   Challenge: modify the Link `to` prop below to send the user back to the previous page with the searchParams included, if they exist. (Remember we may not have anything in that state if there were no filters applied before coming to this van detail page, so make sure to "code defensively" to handle that case.)

```javascript
const search = location.state?.search || "";

<Link to={`..${search}`} relative="path" className="back-button">
	&larr; <span>Back to all vans</span>
</Link>;
```

-   Challenge: When a filter is applied, change the text of the button to say "Back to luxury vans" (e.g.) instead of "Back to all vans". As usual, there's more than one way to solve this, so just give it your best shot

**We create an new instance of URLSearchParams and then we have access to methods like .get()**

**OR**
In Vans.jsx we pass the filterType in Link state

```javascript
		<Link
				to={`${van.id}`}
				state={{
					search: `?${searchParams.toString()}`,
					type: typeFilter,
				}}
			>
```

VanDetail.jsx

```javascript
	const type = location.state?.type || "all";

	return (
		<div className="van-detail-container">
			<Link to={`..${search}`} relative="path" className="back-button">
				&larr; <span>Back to {type} vans</span>
			</Link>
```

## 404 Page

### Catch all Route

-   Challenge: Create a 404 page.
    1.  Create a new component in the pages dir called "NotFound"
    2.  Add the elements from the design. Style it if you want.
    3.  Add a "catch-all " route as a nested route under the Route.
        (It doesn't matter where amongst the children it is.)
    4.  Use the NotFound component as the element for that catch-all route

```javascript
import React from "react";
import { Link } from "react-router";

const NotFound = () => {
	return (
		<div className="not-found-container">
			<h1>Sorry, the page you were looking for was not found</h1>
			<Link to="/" className="link-button">
				Return to home
			</Link>
		</div>
	);
};

export default NotFound;
```

## Happy Path vs. Sad Path

**Create API.js -> fetch logic**

```javascript
export async function getVans() {
	const res = await fetch("/api/vans");
	const data = await res.json();
	return data.vans;
}
```

```javascript
useEffect(() => {
	const fetchVans = async () => {
		try {
			const data = await getVans();

			setVans(data);
		} catch (error) {
			console.log(error);
		}
	};
	fetchVans();
}, []);
```

### Sad Path - Error handling

```javascript
export async function getVans() {
	const res = await fetch("/api/vans");
	if (!res.ok) {
		throw {
			message: "Failed to fetch vans",
			statusText: res.statusText,
			status: res.status,
		};
	}
	const data = await res.json();
	return data.vans;
}
```

## Accessibility Addition

```javascript
if (isLoading) return <h1 aria-live="polite">Loading...</h1>;
if (isError)
	return <h1 aria-live="assertive">There was an error {isError.message}</h1>;
```

# Data Layer APIs

## Loaders and Errors

**We change the structure of the app, we have to load Vans.jsx after fetching our data**

## Opt in to Data Layer APIs

[Choose a Router ->](https://medium.com/front-end-weekly/choosing-a-router-in-react-apps-85ae72fe9d78)

```javascript
import {
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,

	 const router = createBrowserRouter(createRoutesFromElements());

```

-   **Challenge: Change our router to a newer one that supports the data APIs!**

    1.  You'll need to import: RouterProvider, createBrowserRouter, and createRoutesFromElements
    2.  Create a `router` variable and use the functions you just imported to create a new browserRouter
    3.  Pass that router variable to the `router` prop on <RouterProvider />. It should end up being the only thing the App component renders.

```javascript
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
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
					<Route path="pricing" element={<HostVanPricing />} />
					<Route path="photos" element={<HostVanPhotos />} />
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Route>,
	),
);

function App() {
	return <RouterProvider router={router} />;
}
```

## Loaders

1. Export a **loader** function from the page that fetches the data the page will need
2. Pass a **loader** prop to the Route that renders that page and pass in the **loader** function

-   Challenge:

    1.  Export a loader function from this file. Have that loader function simply return the string "Vans data goes here"

    2.  Import that function in the index.jsx file, and set it as the value for the`loader` prop on the Route that controls this page.

```javascript
export function loader() {
	return "Vans data goes here";
}
```

```javascript
import Vans, { loader as vansLoader } from "./pages/Vans";

<Route path="vans" element={<Vans />} loader={vansLoader} />;
```

### useLoaderData

**\*React Router is making changes NOT to how the fetch occurs but WHEN the fetch occurs**

## Use loader data instead of useEffect

-   Challenge: Use the vans data that came in from useLoaderData instead of the state and useEffect

    1.  Comment out the entire useEffect block
    2.  Make whatever other changes you need so it all works again

```javascript
const vans = useLoaderData();
// const [vans, setVans] = useState([]);

// setVans(data);
// useEffect(() => {
// 	const fetchVans = async () => {
// 		setIsLoading(true);
// 		try {
// 			const data = await getVans();

// 			setVans(data);
// 		} catch (error) {
// 			console.log(error);
// 			setIsError(error);
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};
// 	fetchVans();
// }, []);
```

### Delete redundant code

-   We do not need isLoading any more. We see the page after the data arrive
-   We do not need state

## Loaders Quiz

1. When does the code in a loader function run?

Before the route change happens and the component for that route loads

2. What are some benefits of using a data loader function instead of fetching our data in a useEffect in a component?

    - Don't need to worry about handling loading state in the component
    - Don't need to have lengthy/confusing useEffect code in our component
    - Don't need to handle error state in the component

3. What change do we need to make to our BrowserRouter before we can use loaders (or any of the new data-layer API features) in our app?

Get rid of the BrowserRouter component and use createBrowserRouter() instead. Can use createRoutesFromElements() to make the transition a bit easier

4. What are the steps we need to take in order to use a loader on any given route?

    1. Define and export a loader function
    2. Import the loader and pass it to the route we're wanting
       to fetch data for
    3. Use the useLoaderData() hook to get the data from the loader
       function.

## Handling Errors

-   We provide errorElement prop on Route

-   Challenge: Add an errorElement to the vans Route.

    1.  This time, instead of just putting in an <h1> directly, you should make a new Error.jsx component in the components folder. (We'll learn something new bout this soon). For now, that new component can just render the <h1>An error occurred!</h1>
    2.  Import and use that new Error component as the errorElement
        on the /vans route.

```javascript
import React from "react";

const Error = () => {
	return <h1>An error occurred</h1>;
};

export default Error;
```

```javascript
<Route
	path="vans"
	element={<Vans />}
	loader={vansLoader}
	errorElement={<Error />}
/>
```

### We throw an Error in our mock server

```javascript
this.get("/vans", (schema, request) => {
	return new Response(400, {}, { error: "Error fetching data" });
	// return schema.vans.all();
});
```

## useRouteError

```javascript
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	console.log(error);
	return <h1>An error occurred</h1>;
};

export default Error;
```

-   Challenge: use the error object to display a more helpful
    error message below

```javascript
import React from "react";
import { useRouteError } from "react-router-dom";

const Error = () => {
	const error = useRouteError();
	// console.log(error);
	return (
		<>
			<h1>Error:</h1>
			<h3>
				{error.status} {error.message}
			</h3>
		</>
	);
};

export default Error;
```

# Actions and Protected Routes

## Protected Routes Quiz

1. How did we change our route definitions in order to
   "protect" certain routes from an un-logged-in user?

Wrapped the routes we wanted to protect in a Layout route
that contains logic to redirect someone if they're not logged
in

2. What component can we use to automatically send someone
   to a different route in our app?

**Navigate to="/login"**

3. What component can we render if the user IS logged in?

**Outlet**

## Protected routes with Loaders

**If we use a Loader to fetch data, the fetching begins before the route transition and the target component renders to the page**

-   That way we do not need to keep track of a loading state
-   We check for error state in a more declarative way in our Route definitions

**This way we avoid the waterfall and all of our fetch requests are run in parallel. All of the loaders for all nested routes will run as soon as we start the transition to that route, so we need a slightly different approach**

-   Approach:
    -   If the user isn't logged in, redirect to login page when protected route loaders run, before any route rendering happens

**Current downside:** It has to happen in every protected route's loader

-   Challenge: Add a loader to every host route. For now, just have them `return null` (don't worry about checking for authentication yet)

-   Challenge:
    -   Include the `await requireAuth()` everywhere it's needed!

**We add the loader to all routes except /host/vans and /host/vans/:id. These routes already have their loaders. We go to the components and convert their loaders to async functions, and call requireAuth from there**

```javascript
export async function loader() {
	await requireAuth();
	return getHostVans();
}
```

```javascript
export async function loader({ params }) {
	await requireAuth();
	return getHostVans(params.id);
}
```

```javascript

```

## Send login message prompt to login page

```javascript
import { redirect } from "react-router-dom";

export async function requireAuth() {
	const isLoggedIn = false;

	if (!isLoggedIn) {
		throw redirect("/login?message= you must login first");
	}
}
```

## Consume message from search param on login page

-   Think:
    How should we grab the search param from the url on the login page
    in order to display the message (if it exists)?
-   Solution 1:
    We use the native web searchParams object which has a method get()

```javascript
const [searchParams, setSearchParams] = useSearchParams();
console.log(searchParams.get("message"));
```

-   Solution 2:
    **Now that we are using the data router we can use those APIs that we get with the data router -> loader**

**The loader has access to the REQUEST OBJECT -> native web request object**

```javascript
export function loader({ request }) {
	return new URL(request.url).searchParams.get("message");
}
```

```javascript
export default function Login() {
	const message = useLoaderData();
	console.log(message);
```

-   Challenge:
    Grab the message being returned from the loader and display it on the Login page (anywhere) as an h2

```javascript
const message = useLoaderData();
{
	message && <h2>{message}</h2>;
}
<h1>Sign in to your account</h1>;
```

-   Challenge:
    Pass a message from the requireAuth function that says "You must log in first." and display that message in an <h2> BELOW the <h1>. Give it a classname of "red" for some quick styling - (I added the CSS already).

# Forms in React are BAD

-   Challenge: hook up our form so it (halfway) works.

1. Pull in the `loginUser` function from the api.js file
2. Call loginUser when the form is submitted and console.log
   the data that comes back. Use "b@b.com" as the username and
   "p123" as the password.
   NOTE: loginUser returns a promise, so you'll need
   a .then(data => {...}) to access the data, or use
   a separate aync function defined inside handleSubmit
3. TBA

```javascript
async function handleSubmit(e) {
	e.preventDefault();
	try {
		const response = await loginUser(loginFormData);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
}
```

-   Challenge: Code the sad path 🙁

3. Add a `status` state and default it to "idle". When the login form begins submitting, set it to "submitting". When it's done submitting (whether successful or not), set it to "idle" again.
4. Disable the button when the `status` state is "submitting" (this may require some Googling if you haven't done this before).
5. Add an `error` state and default it to `null`. When the form is submitted, reset the errors to `null`. If there's an error from `loginUser` (add a .catch(err => {...}) in the promise chain), set the error to the error that comes back.
6. Display the error.message below the `h1` if there's ever an error in state

```javascript
const [status, setStatus] = useState("idle");
async function handleSubmit(e) {
	e.preventDefault();
	try {
		setStatus("submitting");
		const response = await loginUser(loginFormData);
		console.log(response);
	} catch (error) {
		console.log(error);
	} finally {
		setStatus("idle");
	}
}

// BUTTON
<button disabled={status === "submitting"}>Log in</button>;
```

```javascript
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

{
	error && <h3>{error}</h3>;
}
```

# React Router Form Component

Import Form component from React instead of native HTML form

## Setting up the Action Function

-   Challenge: Start implementing actions to handle our form data

1. Replace <form> with <Form> from React Router
2. Add a `method` prop to the <Form>.
3. Create an action function in this file. It should just log "Action function" to the console and `return null` for now.
4. Register the action function on the <Route>

```javascript
<Form method="post" className="login-form">
//////


import Login, {
	loader as loginLoader,
	action as loginAction,
} from "./pages/Login";
//////
<Route
	path="login"
	element={<Login />}
	loader={loginLoader}
	action={loginAction}
/>;
//////////


```

[**Form Data Documentation ->**](https://developer.mozilla.org/en-US/docs/Web/API/FormData)

## Action function - Params

-   Params is referring to route parameters

## Action function - Request

-   Request object contains form data

```javascript
export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	// process this info however I wanted
	// pass the email and password to the loginUser function
	console.log(email, password);
	return null;
}
```

-   Challenge: save the logged in state to localStorage

1. When the user logs in, save a key called "loggedin" to localStorage, and set it to `true`.
2. In requireAuth, check if the value of "loggedin" in localStorage is `true` instead of hardcoding it like it is currently

```javascript
export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	// process this info however I wanted
	// pass the email and password to the loginUser function

	const data = await loginUser({ email, password });
	if (data) localStorage.setItem("isLoggedIn", true);
	console.log(data);

	return null;
}
////

import { redirect } from "react-router-dom";

export async function requireAuth() {
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	if (!isLoggedIn) {
		throw redirect("/login?message= you must login first");
	}
}
```

-   Challenge: figure out how to send the user to the /host route after they successfully log in

```javascript
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
```

## History Stack

-   The submission of a form is considered a NAVIGATION EVENT

**Replace attribute on Form**

```javascript
	<Form method="post" className="login-form" replace>
```

## useActionData

## Action error handling

-   Challenge: Remove error handling from the component state and and a try...catch to the action to better handle the errors, just like we just practiced.

```javascript
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
```

## Submitting and error state with useNavigation

[**useNavigation docs ->**](https://api.reactrouter.com/v7/functions/react_router.useNavigation.html)

-   useNavigation gives us an object that gives information about the current status of navigation in our app e.g a loader is loading

```javascript
{state: 'idle', location: undefined, formMethod: undefined, formAction: undefined, formEncType: undefined, …}
formAction: undefined
formData: undefined
formEncType: undefined
formMethod: undefined
location: undefined
state: "idle"
[[Prototype]]
:
Object
```

```javascript
const navigation = useNavigation();

<button disabled={navigation.state === "submitting"}>
	{navigation.state === "submitting" ? "Loging in..." : "Log in"}
</button>;
```

-   Challenge: Remove error handling from the component state
    and add a try...catch to the action to better handle the
    errors, just like we just practiced.

```javascript
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
```

## Get previous route pathname

## redirectTo - part1

## redirectTo - part2

-   Challenge: Implement the `redirectTo` feature we just learned about to VanLife!

1. Pass the request to all calls to `requireAuth` (this includes all inline loaders on /host routes as well as the loaders defined separately inside the component files of /host routes)
2. Receive the request in requireAuth and pass along a search param of `redirectTo`
3. You're on your own for the last part :) You can do it! 💪

```javascript
loader={async ({request}) => await requireAuth(request)}
///
export async function loader({ params,request }) {
	await requireAuth(request);
	return getHostVans(params.id);
}

export async function loader({ request }) {
	await requireAuth(request);
	return getHostVans();
}
```

-   Receive the request and extract pathname
-   Pass pathname to login component inside the url

```javascript
export async function requireAuth(request) {
	const pathname = new URL(request.url).pathname;
	console.log(pathname);
	const isLoggedIn = localStorage.getItem("isLoggedIn");

	if (!isLoggedIn) {
		throw redirect(
			`/login?message=You must login first&redirectTo=${pathname}`,
		);
	}
}
```

-   In Login.jsx receive pathname and redirect to it

```javascript
export async function action({ request }) {
	const formData = await request.formData();
	const email = formData.get("email");
	const password = formData.get("password");
	let err = null;
	const pathname =
		new URL(request.url).searchParams.get("redirectTo") || "/host";

	try {
		await loginUser({ email, password });
		localStorage.setItem("isLoggedIn", true);
		return redirect(pathname);
	} catch (error) {
		err = error.message;
		return err;
	}
}
```

# Deferred Data

-   Switching to the route immediately before kicking off the request in loader function

```javascript
import React from "react";
import {
	Link,
	useSearchParams,
	useLoaderData,
	defer,
	Await,
} from "react-router-dom";
import { getVans } from "../API";

export function loader() {
	return defer({ vans: getVans() });
}

function Vans() {
	const [searchParams, setSearchParams] = useSearchParams();
	const [error, setError] = React.useState(null);
	const dataPromise = useLoaderData();

	const typeFilter = searchParams.get("type");

	function handleFilterChange(key, value) {
		setSearchParams((prevParams) => {
			if (value === null) {
				prevParams.delete(key);
			} else {
				prevParams.set(key, value);
			}
			return prevParams;
		});
	}

	if (error) {
		return <h1>There was an error: {error.message}</h1>;
	}

	function renderVanElements(vans) {
		const displayedVans = typeFilter
			? vans.filter((van) => van.type === typeFilter)
			: vans;

		const vanElements = displayedVans.map((van) => (
			<div key={van.id} className="van-tile">
				<Link
					to={van.id}
					state={{
						search: `?${searchParams.toString()}`,
						type: typeFilter,
					}}
				>
					<img src={van.imageUrl} />
					<div className="van-info">
						<h3>{van.name}</h3>
						<p>
							${van.price}
							<span>/day</span>
						</p>
					</div>
					<i className={`van-type ${van.type} selected`}>
						{van.type}
					</i>
				</Link>
			</div>
		));
		return (
			<>
				<div className="van-list-filter-buttons">
					<button
						onClick={() => handleFilterChange("type", "simple")}
						className={`van-type simple 
                        ${typeFilter === "simple" ? "selected" : ""}`}
					>
						Simple
					</button>
					<button
						onClick={() => handleFilterChange("type", "luxury")}
						className={`van-type luxury 
                        ${typeFilter === "luxury" ? "selected" : ""}`}
					>
						Luxury
					</button>
					<button
						onClick={() => handleFilterChange("type", "rugged")}
						className={`van-type rugged 
                        ${typeFilter === "rugged" ? "selected" : ""}`}
					>
						Rugged
					</button>

					{typeFilter ? (
						<button
							onClick={() => handleFilterChange("type", null)}
							className="van-type clear-filters"
						>
							Clear filter
						</button>
					) : null}
				</div>
				<div className="van-list">{vanElements}</div>
			</>
		);
	}

	return (
		<div className="van-list-container">
			<h1>Explore our van options</h1>
			<Await resolve={dataPromise.vans}>{renderVanElements}</Await>
		</div>
	);
}
export default Vans;
```

## Suspense

[**React Suspense docs ->**](https://react.dev/reference/react/Suspense)

```javascript
return (
	<div className="van-list-container">
		<h1>Explore our van options</h1>
		<Suspense fallback={<h2>Loading vans...</h2>}>
			<Await resolve={dataPromise.vans}>{renderVanElements}</Await>
		</Suspense>
	</div>
);
```

-   **Challenge: Implement defer, Await, and Suspense in the /host/vans route.**

```javascript
import React, { Suspense } from "react";
import { Await, defer, Link, useLoaderData } from "react-router-dom";
import { getHostVans } from "../../API";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
	await requireAuth(request);
	return defer({ vans: getHostVans() });
}
export default function HostVans() {
	const dataPromise = useLoaderData();

	function renderVanElements(vans) {
		const hostVansEls = vans.map((van) => (
			<Link
				to={`${van.id}`}
				key={van.id}
				className="host-van-link-wrapper"
			>
				<div className="host-van-single" key={van.id}>
					<img src={van.imageUrl} alt={`Photo of ${van.name}`} />
					<div className="host-van-info">
						<h3>{van.name}</h3>
						<p>${van.price}/day</p>
					</div>
				</div>
			</Link>
		));
		return <div className="host-vans-list">{hostVansEls}</div>;
	}

	return (
		<section>
			<h1 className="host-vans-title">Your listed vans</h1>
			<Suspense fallback={<h2>Loading vans...</h2>}>
				<Await resolve={dataPromise.vans}>{renderVanElements}</Await>
			</Suspense>
		</section>
	);
}
```

-   Challenge: remove manual error handling code and any
    React state code we no longer need, as well as set up errorElement handling for the following routes:
    -   /vans
    -   /vans/:id
    -   /host/vans
    -   /host/vans/:id

Remember: we created an <Error /> component awhile back
that you should be able to reuse.

## Cloud Firestore Setup

```javascript
npm install firebase
```

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyD9deO6bH83PvQm85zKf7Alq2G8QX086GU",
	authDomain: "vanlife-geo.firebaseapp.com",
	projectId: "vanlife-geo",
	storageBucket: "vanlife-geo.firebasestorage.app",
	messagingSenderId: "1059387194222",
	appId: "1:1059387194222:web:7e06341e0f477c9d2adf7f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
```
