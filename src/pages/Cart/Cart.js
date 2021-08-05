import React from "react";
import "./Cart.css";
import { useCart } from "./../../contexts/cart-context";
import { CartCartButtonGroup } from "./CartCardButtonGroup";

import StripeCheckout from "react-stripe-checkout";
export function Cart() {
	const { cart } = useCart();

	const onToken = (token) => {
		fetch("/save-stripe-token", {
			method: "POST",
			body: JSON.stringify(token),
		}).then((response) => {
			response.json().then((data) => {
				alert(`We are in business, ${data.email}`);
			});
		});
	};

	return (
		<div className="Cart container">
			<center>
				<h1>Cart</h1>
			</center>
			<div class="container-column">
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
									<div>
										<CartCartButtonGroup product={product} />
									</div>
								</div>
							</div>
						);
					}
					return <></>;
				})}
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
