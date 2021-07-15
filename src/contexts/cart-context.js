import { useState, createContext, useContext, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const [cart, setCart] = useState([]);
	const [cartProductsIds, setCartProductsIds] = useState([]);

	useEffect(() => {
		setCartProductsIds(cart.map((item) => item._id));
	}, [cart]);
	// const [cartCount, setCartCount] = useState(0);

	// useEffect(() => {
	// 	setCartCount(cart.reduce((acc,curr)=>{
	// 		return acc + curr.quantity
	// 	},0))
	// }, [cart])
	function isInCart(productId) {
		return cartProductsIds.includes(productId);
	}

	function initializeCart(cart) {
		setCart(cart);
	}

	function addToCart(product) {
		let flag = 1;
		const result = cart.map((item) => {
			if (item._id === product._id) {
				flag = 0;
				return { ...item, quantity: item.quantity + 1, showFlag: 1 };
			}
			return item;
		});

		if (flag) {
			return [...cart, { ...product, quantity: 1, showFlag: 1 }];
		}
		return result;
	}
	function removeFromCart(product) {
		return cart.map((item) => {
			if (item._id === product._id) {
				if (item.quantity > 1) {
					return { ...item, quantity: item.quantity - 1 };
				} else {
					return { ...item, quantity: 0, showFlag: 0 };
				}
			}
			return item;
		});
	}
	function deleteFromCart(product) {
		return cart.map((item) => {
			if (item._id === product._id) {
				return { ...item, quantity: 0, showFlag: 0 };
			}
			return item;
		});
	}

	return (
		<CartContext.Provider
			value={{
				cart,
				addToCart,
				removeFromCart,
				deleteFromCart,
				setCart,
				isInCart,
				initializeCart,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
