import React, { useEffect, useState } from "react";
import "./Cart.css";
import { useCart } from "./../../contexts/cart-context";
import { useWishlist } from "./../../contexts/wishlist-context";
import { useAuth } from "../../contexts/auth-context";
import axios from "axios";
import {CartCartButtonGroup} from "./CartCardButtonGroup";

import StripeCheckout from 'react-stripe-checkout';
export function Cart() {
	const {
		cart,
		setCart,
		addToCart,
		removeFromCart,
		deleteFromCart,
		initializeCartData,
	} = useCart();
	const {
		isInWishlist,
		toggleWishlist,
		initializeWishlistData,
	} = useWishlist();
	const { auth } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	async function addToCartHandler(product) {
		console.log(cart);

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
	async function removeFromCartHandler(product) {
		console.log(cart);
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
	async function deleteFromCartHandler(product) {
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

	// async function addToCartHandler(product) {
	// 	console.log(cart);
	// 	try {
	// 		const res = await axios.post(
	// 			"https://Gardenin-Store-Backend-v030.rushi173.repl.co/cart",
	// 			{
	// 				product
	// 			},
	// 			{
	// 				headers: {
	// 					Token: auth.token,
	// 				},
	// 			}
	// 		);
	// 		console.log(res);
	// 		setCart(res.data.cart);
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }
	const onToken = (token) => {
		fetch('/save-stripe-token', {
		  method: 'POST',
		  body: JSON.stringify(token),
		}).then(response => {
		  response.json().then(data => {
			alert(`We are in business, ${data.email}`);
		  });
		});
	  }

	return (
		<div className="Cart container">
			<h1>Cart</h1>
			<div class="container-column">
				<h3>Product Cards</h3>
				<br />
				{cart.length === 0 ? <p>Your Cart is Empty</p> : <></>}
				{cart.map((product) => {
					if (product.showFlag) {
						return (
							<div className="cart-product-card">
								<img src={product.imageUrl} alt={product.name + "-img"} />
								<div className="cart-card-description">
									<p className="product-name">{product.name}</p>
									<p className="product-brand">
										Product from {product.storeName}
									</p>
									<p className="discounted-price">
										Rs. <b>{product.price}</b> /qty
									</p>
									{/* <p>{product.storeName}</p>
								<a href={product.link}>Link</a> */}
									<div>
										<CartCartButtonGroup product={product} />
										{/* <div className="buy-img-btn-wrapper" style={{height:"2rem", width: "190px", border: "2px solid red"}}>
										<img src={product.imageUrl}/>
										<p><b className>Buy</b></p>

									</div> */}
										{/* <a
											target="_blank"
											rel="noreferrer"
											href={product.link}
											className="badge bg-primary"
											style={{
												display: "block",
												marginTop: "10px",
												borderRadius: "0",
											}}
										>
											Buy from {product.storeName}{" "}
											<i class="fa fa-angle-double-right"></i>
											<i class="fa fa-angle-double-right"></i>
											<i class="fa fa-angle-double-right"></i>
										</a> */}
									</div>
								</div>
								
							</div>
						);
					}
					return <></>;
				})}
				{/* <table>
					<tr>
						<th>Product Name</th>
						<th>Price</th>
						<th>Quantity</th>
						<th>Buy Online</th>
					</tr>
				</table>
				<div class="product-cards-container">
					{cart.map((product) => {
						<tr>
							<td>Product Name</td>
							<td>Price</td>
							<td>Quantity</td>
							<td>Buy Online</td>
						</tr>;
					})}
				</div> */}
			</div>
			<StripeCheckout
        token={onToken}
        stripeKey="my_PUBLISHABLE_stripekey"
		shippingAddress
  billingAddress={false}
      />
		</div>
	);
}
