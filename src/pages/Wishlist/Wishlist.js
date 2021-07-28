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
			<center><h1>Wishlist</h1></center>
			<div class="container-column">
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
