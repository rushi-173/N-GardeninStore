import {
	useState,
	createContext,
	useContext,
	useEffect,
	useReducer,
} from "react";
// import { productsDB } from "../productData";

const productsDataContext = createContext();

export function ProductsDataProvider({ children }) {
	// const [productsData, setProductsData] = useState(productsDB);
	// console.log(productsData);
	const [products, setProducts] = useState([]);
	// const apiUrl = "https://gardenin-store-backend-v030.rushi173.repl.co/"

	// useEffect(() => {
	// 	// (async function getData() {
	// 	// 	const response = await axios.get(`${apiUrl}/products`);
	// 	// 	setProducts(response.data.products);
	// 	// })();
	// 	setProducts(productsDB.reverse());
	// }, []);
	function initializeData(data){
		setProducts(data);
	}

	const [
		{ showInventoryAll, showFastDeliveryOnly, sortBy, maxValue },
		dispatch,
	] = useReducer(
		function reducer(state, action) {
			switch (action.type) {
				case "TOGGLE_INVENTORY":
					return (state = {
						...state,
						showInventoryAll: !state.showInventoryAll,
					});

				case "TOGGLE_DELIVERY":
					return (state = {
						...state,
						showFastDeliveryOnly: !state.showFastDeliveryOnly,
					});
				case "SORT":
					return {
						...state,
						sortBy: action.payload,
					};
				case "TOGGLE_PRICE_RANGE":
					return {
						...state,
						maxValue: action.payload,
					};
				default:
					return state;
			}
		},
		{
			showInventoryAll: false,
			showFastDeliveryOnly: false,
			sortBy: null,
			maxValue: 1000,
		}
	);

	function getSortedData(productList, sortBy) {
		if (sortBy && sortBy === "PRICE_HIGH_TO_LOW") {
			return productList.slice(0).sort((a, b) => b["price"] - a["price"]);
		}

		if (sortBy && sortBy === "PRICE_LOW_TO_HIGH") {
			return productList.slice(0).sort((a, b) => a["price"] - b["price"]);
		}
		return productList;
	}

	function getFilteredData(
		productList,
		{ showFastDeliveryOnly, showInventoryAll, maxValue }
	) {
		return productList
			.filter(({ fastDelivery }) =>
				showFastDeliveryOnly ? fastDelivery : true
			)
			.filter(({ inStock }) => (showInventoryAll ? true : inStock))
			.filter((item) => parseInt(item.price) <= maxValue);
	}

	const sortedData = getSortedData(products, sortBy);
	console.log(sortedData)
	const filteredData = getFilteredData(sortedData, {
		showFastDeliveryOnly,
		showInventoryAll,
		maxValue,
	});

	function getProductDataById(id){
		return products.find((product)=> product._id == id)
	}

	return (
		<productsDataContext.Provider
			value={{
				dispatch,
				maxValue,
				filteredData,
				showInventoryAll,
				showFastDeliveryOnly,
				sortBy,
				getProductDataById,
				initializeData
			}}
		>
			{children}
		</productsDataContext.Provider>
	);
}

export const useProductsData = () => useContext(productsDataContext);
