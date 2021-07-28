import React from "react";
import { useCart } from "../../contexts/cart-context";
import { useWishlist } from "../../contexts/wishlist-context";
import "./ProductDescription.css";
import {
	Link,
	useNavigate,
	Navigate,
	useLocation,
	useParams,
} from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/auth-context";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import ReactImageMagnify from "react-image-magnify";
import { useProductsData } from "../../contexts/products-data-context";
import { useToasts } from "react-toast-notifications";

const AddToCartButton = ({ product }) => {
	const { addToCart, isInCart, cart, setCart } = useCart();
	const { auth } = useAuth();
	const navigate = useNavigate();
	const [statusInCart, setStatusInCart] = useState();
	useEffect(() => {
		setStatusInCart(isInCart(product._id));
	}, [cart]);
	const {addToast} = useToasts();

	const [isLoading, setIsLoading] = useState(false);

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
			addToast(`Updated the Cart`, {
				appearance: "success"
			});
		} catch (err) {
			console.log(err);
			addToast(`Something error occurred`, {
				appearance: "error"
			});
		}
		setIsLoading(false);
	}

	return (
		<>
			{isLoading ? (
				// <Loader />
				<button className="btn btn-primary" style={{ width: "100%" }}>
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
					className="btn btn-primary"
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
	const {addToast} = useToasts();

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
			addToast(`Updated the Wishlist`, {
				appearance: "success"
			});
		} catch (err) {
			console.log(err);
			addToast(`Something error occurred`, {
				appearance: "error"
			});
		}
		setIsLoading(false);
	}

	return (
		<>
			{isLoading ? (
				// <Loader />
				<button className="btn btn-info" style={{width:"100%"}}>
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
					className="btn btn-outline-danger"
					style={{width:"100%"}}
					onClick={() => {
						if (!auth.user) {
							navigate("/login");
						} else {
							toggleWishlistHandler(product);
						}
					}}
				>
					<i
						className={isInWishlist(product._id) ? "fa fa-heart" : "fa fa-heart-o"}
					></i>
				</button>
			)}
		</>
	);
};

export function ProductDescription() {
	const { id } = useParams();
	const { getProductDataById,products } = useProductsData();
	const [product, setProduct] = useState(getProductDataById(id));
	console.log("got this product",product);
	useEffect(()=>{
		setProduct(getProductDataById(id));
	},[products])
	return product._id ? (
		<div className="ProductDescription">
			<div className="container-column">
				<h3>Product Description</h3>
				<br />
				<div className="product-description-container">
					<div className="product-desc-image">
						<Link to="/products"><ul>Go Back</ul></Link>
						<ReactImageMagnify
							enlargedImagePosition="over"
							{...{
								smallImage: {
									isFluidWidth: false,
									src: product.imageUrl,
									width: 400,
									height: 400
								},
								largeImage: {
									src: product.imageUrl,
									width: 600,
									height: 600
								},
							}}
						/>
					</div>
					<div className="product-info-container">
						<h1>{product.name}</h1>
						<div className="price">
						<h3 className="discounted-price">
							<strong>Rs.{product.price} </strong>
						</h3>
						<h3
							className="mrp"
							style={{
								display:
									Math.floor(100 - (product.price / product.mrp) * 100) > 0
										? "initial"
										: "none",
							}}
						>
							Rs.{product.mrp}
						</h3></div>
						<p>{product.description}</p>
						<AddToCartButton product={product}/><AddToWishlistButton product={product}/>
					</div>
				</div>
			</div>
		</div>): (<></>)
	
}
