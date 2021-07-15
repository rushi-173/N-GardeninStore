import React, { useEffect, useState } from "react";
import { useCart } from "./../../contexts/cart-context";
import { useWishlist } from "./../../contexts/wishlist-context";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import Loader from "react-loader-spinner";

export function CartCartButtonGroup({ product }) {
	const {
		cart,
		setCart,
		addToCart,
		removeFromCart,
		deleteFromCart,
	} = useCart();
	const { isInWishlist, toggleWishlist, setWishlist } = useWishlist();
	const { auth } = useAuth();

	function AddToCartButton({ product }) {
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
			} catch (err) {
				console.log(err);
			}
		}
		return  (
			<button
				className="badge bg-primary"
				onClick={() => {
					addToCartHandler(product);
				}}
			>{isLoading ? (
                "w"
            ) : (
                <b>+</b>
            )}
			</button>
		);
	}
	function RemoveFromCartButton({ product }) {
		const [isLoading, setIsLoading] = useState(false);
		async function removeFromCartHandler(product) {
			console.log(cart);
			setIsLoading(true);

			try {
				const res = await axios.post(
					"https://Gardenin-Store-Backend-v030.rushi173.repl.co/cart",
					{
						cart: removeFromCart(product),
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
		}
		return  (
			<button
				className="badge bg-primary"
				onClick={() => {
					removeFromCartHandler(product);
				}}
			>{isLoading ? (
                "w"
            ) : (
                <b>-</b>
            )}
				
			</button>
		);
	}
	function DeleteFromCartButton({ product }) {
		const [isLoading, setIsLoading] = useState(false);
		async function deleteFromCartHandler(product) {
			setIsLoading(true);
			console.log(cart);
			try {
				const res = await axios.post(
					"https://Gardenin-Store-Backend-v030.rushi173.repl.co/cart",
					{
						cart: deleteFromCart(product),
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
		}
		return (
			<button
				className="btn btn-wishlist"
				onClick={() => {
					!isLoading && deleteFromCartHandler(product);
				}}
				style={{ fontSize: "1.5rem" }}
			>
				{isLoading ? (
					"w"
				) : (
					<i className="fa fa-trash wished"></i>
				)}
			</button>
		);
	}
	function AddToWishlistButton({ product }) {
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
		return  (
			<button
				className="btn btn-wishlist"
				style={{ fontSize: "1.5rem" }}
				onClick={() => {
					toggleWishlistHandler(product);
				}}
			>
                {isLoading ? (
                "w"
            ) : (
                <i
					className={
						isInWishlist(product._id) ? "fa fa-heart wished" : "fa fa-heart-o"
					}
				></i>
            )}
				
			</button>
		);
	}
	return (
		<div
			className="container-space-between"
			style={{ height: "2rem", maxWidth: "180px" }}
		>
			<DeleteFromCartButton product={product} />
			<RemoveFromCartButton product={product} />
			<b>{product.quantity}</b>
			<AddToCartButton product={product} />
			<AddToWishlistButton product={product} />
		</div>
	);
}
