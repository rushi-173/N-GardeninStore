import { useState, createContext, useContext, useEffect } from "react";

export const wishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
	const [wishlist, setWishlist] = useState([]);
	const [wishlistProductsIds, setWishlistProductsIds] = useState([]);

	useEffect(() => {
		setWishlistProductsIds(wishlist.map((item) => item._id));
	}, [wishlist]);

	function initializeWishlist(wishlist) {
		setWishlist(wishlist);
	}

	function addToWishlist(product) {
		return [...wishlist, product];
	}

	function removeFromWishlist(product) {
		return wishlist.filter((item) => item._id !== product._id);
	}

	function toggleWishlist(product) {
		if (isInWishlist(product._id)) {
			return removeFromWishlist(product);
		} else {
			return addToWishlist(product);
		}
	}

	function isInWishlist(productId) {
		return wishlistProductsIds.includes(productId);
	}

	return (
		<wishlistContext.Provider
			value={{
				wishlist,
				setWishlist,
				isInWishlist,
				toggleWishlist,
				initializeWishlist,
			}}
		>
			{children}
		</wishlistContext.Provider>
	);
};

export const useWishlist = () => useContext(wishlistContext);
