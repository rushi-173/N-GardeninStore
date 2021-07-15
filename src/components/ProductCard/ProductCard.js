import { useCart } from "../../contexts/cart-context";
import { useWishlist } from "../../contexts/wishlist-context";
import "./ProductCard.css";
import { Link, useNavigate, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import { useToast } from "../../contexts/toast-context";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";

const AddToCartButton = ({ product }) => {
	const { addToCart, isInCart, cart, setCart } = useCart();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [statusInCart, setStatusInCart] = useState();
	useEffect(() => {
		setStatusInCart(isInCart(product._id));
	}, [cart]);

	const [isLoading, setIsLoading] = useState(false);

	// if(!auth.user){
	// 	return  <Navigate to="/login" state={{ from: location.pathname }} />
	// }
	async function addToCartHandler(product) {
		console.log(cart);
		setIsLoading(true);
		try {
			const res = await axios.post(
				"https://Gardenin-Store-Backend-v030.rushi173.repl.co/cart",
				{
					cart: addToCart(product),
				},
				{
					headers: {
						Token: auth.token,
					},
				}
			);
			console.log(res);
			setCart(res.data.cart);
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	}

	// if (statusInCart) {
	// 	return (
	// 		<Link to="/cart">
	// 			{" "}

	// 			<button class="btn btn-warning btn-addtocart" style={{ width: "100%" }}>
	// 				Go to Cart
	// 			</button>
	// 		</Link>
	// 	);
	// } else
	// {
	return (
		<>
			{isLoading ? (
				// <Loader />
				<button class="btn btn-primary btn-addtocart" style={{ width: "100%" }}>
					<Loader
						type="TailSpin"
						color="#fff"
						height={10}
						width={10}
						color="white"
					/>
				</button>
			) : (
				<button
					class="btn btn-primary btn-addtocart"
					style={{ width: "100%" }}
					onClick={() => {
						if (!auth.user) {
							navigate("/login");
						} else {
							addToCartHandler(product);
						}
					}}
				>
					Add to Cart
				</button>
			)}
		</>
	);
	// }
};
const AddToWishlistButton = ({ product }) => {
	const { isInWishlist, toggleWishlist, setWishlist } = useWishlist();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);

	async function toggleWishlistHandler(product) {
		setIsLoading(true);
		try {
			const res = await axios.post(
				"https://Gardenin-Store-Backend-v030.rushi173.repl.co/wishlist",
				{
					wishlist: toggleWishlist(product),
				},
				{
					headers: {
						Token: auth.token,
					},
				}
			);
			console.log(res);
			setWishlist(res.data.wishlist);
		} catch (err) {
			console.log(err);
		}
		setIsLoading(false);
	}

	// if(!auth.user){
	// 	return  <Navigate to="/login" state={{ from: location.pathname }} />
	// }

	return (
		<>
			{isLoading ? (
				// <Loader />
				<button class="btn btn-wishlist">
					<Loader
						type="TailSpin"
						color="#fff"
						height={20}
						width={20}
						color="#51c84d"
					/>
				</button>
			) : (
				<button
					class="btn btn-wishlist wished"
					onClick={() => {
						if (!auth.user) {
							navigate("/login");
						} else {
							toggleWishlistHandler(product);
						}
					}}
				>
					<i
						class={isInWishlist(product._id) ? "fa fa-heart" : "fa fa-heart-o"}
					></i>
				</button>
			)}
		</>
	);
};
export const ProductCard = ({ product }) => {
	// const toggleWishlistHandler = async (product) => {
	// 	try {
	// 		if(isInWishlist(product._id)){
	// 			const temp = wishlist.filter((item) => (item._id !== product._id));
	// 			const data = axios.post("https://gardenin-store-backend-v030.rushi173.repl.co/wishlist", {
	// 				wishlist: temp
	// 			})

	// 		}
	// 	  } catch (error) {
	// 		console.log(error);
	// 	  }
	// };

	return (
		<div class="card-product" key={product._id}>
			<div class="card-img-container">
				<Link to={`/products/${product._id}`}>
					<img
						class="responsive-img"
						src={product.imageUrl}
						alt={product.name}
					/>
				</Link>

				<span
					class="card-badge"
					style={{ display: product.isNew ? "initial" : "none" }}
				>
					NEW
				</span>
				<span
					class="card-discount-badge"
					style={{
						display:
							Math.floor(100 - (product.price / product.mrp) * 100) > 0
								? "initial"
								: "none",
					}}
				>
					{Math.floor(100 - (product.price / product.mrp) * 100)}% OFF
				</span>
			</div>
			<div class="card-description">
				<div class="brand-wishlish-wrapper">
					<p class="product-brand">{product.storeName}</p>
					<AddToWishlistButton product={product} />
				</div>
				<Link to={`/products/${product._id}`}>
					<small class="product-name">{product.name}</small>
					<div class="price">
						<p class="discounted-price">
							<strong>Rs.{product.price} </strong>
						</p>
						<p
							class="mrp"
							style={{
								display:
									Math.floor(100 - (product.price / product.mrp) * 100) > 0
										? "initial"
										: "none",
							}}
						>
							Rs.{product.mrp}
						</p>
					</div>
				</Link>

				{/* <div class="brand-wishlish-wrapper">
					<div class="stock-warning">
						<strong>Only few left!</strong>
					</div>

					<button
						class="btn btn-cart-plus btn-addtocart-icon"
						onClick={() => {
							addToCart(product);
						}}
					><Link to="/cart">
						<i class="fa fa-cart-plus"></i></Link>
					</button>
				</div>*/}
				<AddToCartButton product={product} />
			</div>

			<div
				style={{
					display: product.inStock ? "none" : "flex",
					position: "absolute",
					top: "0",
					left: "0",
					zIndex: "1000",
					background: "#ffffff8c",
					height: "100%",
					width: "100%",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<h4 className=" btn btn-outline-danger">Out Of Stock</h4>
			</div>
		</div>
	);
};
