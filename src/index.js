import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CartProvider } from "./contexts/cart-context";
import { ProductsDataProvider } from "./contexts/products-data-context";
import { WishlistProvider } from "./contexts/wishlist-context";
import { AuthProvider } from "./contexts/auth-context";
import { ToastProvider } from 'react-toast-notifications';
ReactDOM.render(
	<React.StrictMode>
		<ToastProvider autoDismiss
    autoDismissTimeout={5000}
    placement="bottom-left">
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
