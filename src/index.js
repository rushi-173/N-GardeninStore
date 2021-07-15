import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./contexts/cart-context";
import { ProductsDataProvider } from "./contexts/products-data-context";
import { WishlistProvider } from "./contexts/wishlist-context";
import { ToastProvider } from "./contexts/toast-context";
import { AuthProvider } from "./contexts/auth-context";

ReactDOM.render(
	<React.StrictMode>
		<ToastProvider>
			<ProductsDataProvider>
				<WishlistProvider>
					<CartProvider>
						<AuthProvider>
							<App />
						</AuthProvider>
					</CartProvider>
				</WishlistProvider>
			</ProductsDataProvider>
		</ToastProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
