import React, { useState } from "react";
import "./Cart.css";
import { useCart } from "./../../contexts/cart-context";
import { CartCartButtonGroup } from "./CartCardButtonGroup";
import logo from "../../assets/gardenin-icon.png";
import StripeCheckout from "react-stripe-checkout";
import axios  from 'axios';
import { useAuth } from "../../contexts/auth-context";
import { useToasts } from "react-toast-notifications";
export function Cart() {
	const { cart, setCart, totalCartAmount } = useCart();
	const {auth} = useAuth();
	console.log(auth);
	const [isLoading, setIsLoading] = useState(false);
	const { addToast } = useToasts();

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

	async function resetCartHandler() {
		console.log(cart);
		setIsLoading(true);
		try {
			const res = await axios.post(
				"https://Gardenin-Store-Backend-v030.rushi173.repl.co/cart",
				{
					cart: [],
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
			addToast(`Something error occurred`, {
				appearance: "error"
			});
		}
		setIsLoading(false);
	}


	function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }

    async function displayRazorpay() {
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }

        const result = await axios.post("https://Gardenin-Store-Backend-v030.rushi173.repl.co/order");
		console.log(result);
        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;
		console.log(amount, order_id, currency);

        const options = {
            key: "rzp_test_ZqxAGtPw9oLQFa", // Enter the Key ID generated from the Dashboard
            amount: totalCartAmount,
            currency: currency,
            name: "Soumya Corp.",
            description: "Test Transaction",
            image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                };

                const result = await axios.post("https://Gardenin-Store-Backend-v030.rushi173.repl.co/order/success", data);

                if(result.status === 200){
					//success 
					console.log(result);
					resetCartHandler();
					addToast(`Order Placed Successfully`, {
						appearance: "success"
					});
				}
				
            },
            prefill: {
                name: auth.user.name,
                email: auth.user.email,
                contact: "",
            },
            notes: {
                address: "",
            },
            theme: {
                color: "#51c84d",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

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
							<div className="cart-product-card" key={product._id}>
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

			<br/><br/><br/><br/>
			<h4>Total Amount : {totalCartAmount}</h4>
			
			{ totalCartAmount? <button className="btn btn-primary" onClick={displayRazorpay}>Checkout</button> : <></>}
			{/* <StripeCheckout
				token={onToken}
				stripeKey="my_PUBLISHABLE_stripekey"
				shippingAddress
				billingAddress={false}
			/> */}
		</div>
	);
}
