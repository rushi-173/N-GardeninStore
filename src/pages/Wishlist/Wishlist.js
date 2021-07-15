import React, { useEffect } from "react";
import "./Wishlist.css";
import { ProductCard } from "../../components/index";
import { useWishlist } from "../../contexts/wishlist-context";
import { useCart } from "../../contexts/cart-context";
import { fetchCartData, fetchWishlistData } from "../../helpers";
import { useAuth } from "../../contexts/auth-context";

export function Wishlist() {
	const {  wishlist } = useWishlist();


	return (
		<div className="Wishlist">
			<h1>Wishlist</h1>
			<div class="container-column">
				<h3>Product Cards</h3>
				<br />
				<div class="product-cards-container">
					{wishlist.map((product) => {
						return <ProductCard product={product} />;
					})}
				</div>
			</div>
		</div>
	);
}
