import axios from "axios";
const apiUrl = "https://gardenin-store-backend-v030.rushi173.repl.co";

export const fetchData = async (initializeData) => {
	try {
		const response = await axios.get(`${apiUrl}/products`);
		  console.log(response)
		initializeData(response.data);
	} catch (error) {
		console.log(error);
	}
};


export const fetchCartData = async (auth, initializeCart) => {
    if (auth) {
        try {
            const res = await axios.get(
                "https://gardenin-store-backend-v030.rushi173.repl.co/cart",
                {
                    headers: {
                        "Token": auth.token,
                    },
                }
            );
            console.log("carts initialize", res.data);
            res.data && initializeCart(res.data.cart);
        } catch (err) {
            console.log(err);
        }
    }
};

export const fetchWishlistData = async (auth, initializeWishlist) => {
    if (auth) {
        try {
            const res = await axios.get(
                "https://gardenin-store-backend-v030.rushi173.repl.co/wishlist",
                {
                    headers: {
                        "Token": auth.token,
                    },
                }
            );
            console.log("wishes initialize", res);
            res.data && initializeWishlist(res.data.wishlist);
        } catch (err) {
            console.log(err);
        }
    }
};
