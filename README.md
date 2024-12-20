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
        -                                                                                                                                                                                                                                                                                   Dashboard ("/host")
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
