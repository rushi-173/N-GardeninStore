import "./App.css";
import { Navbar } from "./components";
import {
	Home,
	Cart,
	Wishlist,
	Products,
	KnowPlants,
	ProductDescription,
	Login,
	Signup,
	Profile,
	PageNotFound,
} from "./pages";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
	useNavigate,
	useParams,
	useLocation,
} from "react-router-dom";
import { fetchData, fetchCartData, fetchWishlistData} from "./helpers";
import { useProductsData } from "./contexts/products-data-context";
import { useAuth } from "./contexts/auth-context";
import { useEffect } from "react";
import { useCart } from "./contexts/cart-context";
import { useWishlist } from "./contexts/wishlist-context";

function App() {
	const { productsData, initializeData } = useProductsData();
	const { auth } = useAuth();
	const {initializeCart} = useCart();
	const {initializeWishlist} = useWishlist();

	useEffect(() => {
	 fetchData(initializeData);

		
	}, []);

	useEffect(() => {
	fetchCartData(auth,initializeCart);
	
	fetchWishlistData(auth, initializeWishlist);
		
	}, [auth]);

	const PrivateRoute = ({ path, element, children }) => {
		if (auth) {
			return element || children;
		} else {
			return <Navigate to="/login" state={{ from: path }} />;
		}
	};

	return (
		<div className="App">
			<Router>
				<Navbar />
				<Routes>
					<PrivateRoute path="/cart">
						<Cart />
					</PrivateRoute>
					<PrivateRoute path="/wishlist">
						<Wishlist />
					</PrivateRoute>
					<PrivateRoute path="/profile">
						<Profile />
					</PrivateRoute>
					<Route exact path="/products">
						<Products />
					</Route>
					<Route path="/products/:id">
						<ProductDescription />
					</Route>
					<Route path="/knowplants">
						<KnowPlants />
					</Route>
					<Route exact path="/">
						<Home productsData={productsData} />
					</Route>

					<Route exact path="/login" element={<Login />} />
					<Route exact path="/signup" element={<Signup />} />
        <Route path="*" element={<PageNotFound/>} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
