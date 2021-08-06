import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../../contexts/wishlist-context";
import { useCart } from "../../contexts/cart-context";

export const Navbar = () => {
	const [hamburgerStyles, setHamburgerStyles] = useState(
		"hamburger-menu pointer"
	);
	const [menuStyles, setMenuStyles] = useState("menu hide-menu");
	const { cart } = useCart();
	const {wishlist } = useWishlist();

	const cartCount = cart.reduce((acc, curr)=>{
		return acc + curr.quantity;
	},0)


	const hamburgerClickHandler = () => {
		if (hamburgerStyles.includes("click")) {
			setHamburgerStyles("hamburger-menu pointer");
			setMenuStyles("menu hide-menu");
		} else {
			setHamburgerStyles("hamburger-menu pointer click");
			setMenuStyles("menu show-menu");
		}
	};

	const menuHandler = () => {
		setHamburgerStyles("hamburger-menu pointer");
		setMenuStyles("menu hide-menu");
	};

	return (
		<nav className="navbar">
			<div className="container-center">
				<div
					className={hamburgerStyles}
					onClick={hamburgerClickHandler}
					id="menu-open-button"
					role="button"
				>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
					<span className="hamburger-menu-line"></span>
				</div>

				<Link to="/" className="container-center brand-logo">
					<p className="brand-name">
						Gardenin <span>Store</span>
					</p>
				</Link> 
			</div>
			<div className="container-center">
				
				<Link to="/products" className="nav-icon-label-container" hash="#search">
					<div className="avatar-badge-container" role="button">
						<div
							className="avatar-noborder container-center"
							style={{ fontSize: "0.6rem", width: "2rem" }}
						>
							<i className="fa fa-search" aria-hidden="true"></i>
						</div>
					</div>
					<p className="nav-icon-label">Search</p>
				</Link>
				<Link to="/wishlist" className="nav-icon-label-container">
					<div className="avatar-badge-container" role="button">
						<div
							className="avatar-noborder container-center"
							style={{ fontSize: "0.6rem", width: "2rem" }}
						>
							<i className="fa fa-heart-o" aria-hidden="true"></i>
						</div>
						<div className="icon-badge-top container-center" style={{ right: "0" }}>
							<span>{wishlist.length}</span>
						</div>
					</div>
					<p className="nav-icon-label">Wishlist</p>
				</Link>
				<Link to="/cart" className="nav-icon-label-container">
					<div className="avatar-badge-container" role="button">
						<div
							className="avatar-noborder container-center"
							style={{
								fontSize: "0.6rem",
								width: "2rem",
								margin: "0rem 0.1rem",
							}}
						>
							<i
								className="fa fa-shopping-cart"
								aria-hidden="true"
								style={{ right: "0" }}
							></i>
						</div>
						<div className="icon-badge-top container-center">
							<span>{cartCount}</span>
						</div>
					</div>
					<p className="nav-icon-label">Cart</p>
				</Link>
			</div>

			<ul className={menuStyles} onClick={menuHandler} id="menu">
				<li className="menu-item">
					<b>
						<Link to="/">Home</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/products" className="link-to">Products</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/offers">Special Offers</Link> 
					</b>
				</li>
				{/* <li className="menu-item">
					<b>
						<Link to="/knowplants">Know Plants</Link> 
					</b>
				</li> */}
				<li className="menu-item">
					<b>
						<Link to="/wishlist">My Wishlist</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/profile">Profile</Link> 
					</b>
				</li>
				<li className="menu-item">
					<b>
						<Link to="/settings">Settings</Link> 
					</b>
				</li>
			</ul>
		</nav>
	);
};

// export default Navbar;
