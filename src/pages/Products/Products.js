import React, { useState, useEffect, useRef } from "react";
import {useLocation} from "react-router-dom";
import "./Products.css";
import { ProductCard } from "../../components/index";
import { useProductsData } from "../../contexts/products-data-context";
import { useToasts } from "react-toast-notifications";

function useQuery() {
	return new URLSearchParams(useLocation().search);
  }

export function Products() {
	const [searchText, setSearchText] = useState("");
	const [result, setResult] = useState([]);
	const [categories, setCategories] = useState([]);
	const searchInput = useRef(null);
	const query = useQuery();
	const {addToast}  = useToasts();
	
	
	// const [products, setProducts] = useState([]);

	const {
		dispatch,
		filteredData,
		maxValue,
		showInventoryAll,
		showFastDeliveryOnly,
	} = useProductsData();

	useEffect(() => {
		searchInput.current.focus();
	}, []);

	useEffect(() => {
		setResult(
			filteredData.filter((item) => {
				return item.name.toUpperCase().includes(searchText.trim().toUpperCase());
			})
		);
	}, [searchText, filteredData]);


	return (
		<div className="Products">
			<div class="container-column">
				<div
					className="container search-container"
					style={{ flexWrap: "nowrap" }}
					id="search"
				>
					<div class="input-group" style={{ width: "100%", margin: "0" }}>
						<input
							id="name"
							type="search"
							value={searchText}
							class="input-area"
							style={{ borderRadius: "0px" }}
							onChange={(e) => {
								setSearchText(e.target.value);
							}}
							ref={searchInput}
						/>
						<label for="name" style={{visibility: searchText===""?"visible":"hidden",}}>Search</label>
					</div>
					<button
						className="btn btn-primary"
						style={{ width: "20%", margin: "0", borderRadius: "0px" }}
					>
						<i class="fa fa-search" aria-hidden="true"></i>
					</button>
				</div>

				<div className="container-sort-filter-wrapper">
					<div className="container container-sort">
						<label htmlFor="sort" className="container-title">Sort By:</label>
						<select
							onChange={(e) =>
								dispatch({ type: "SORT", payload: e.target.value })
							}
							name="sort"
							id="sort"
						>
							<option value="">Newest First</option>
							<option value="PRICE_HIGH_TO_LOW">Price high to low</option>
							<option value="PRICE_LOW_TO_HIGH">Price low to high</option>
						</select>
					</div>
					<div className="container container-filter">
						<p className="container-title">Filter By -</p>
						<label >
							
							<input
								type="checkbox"
								className="checkbox"
								checked={showInventoryAll}
								onChange={() => dispatch({ type: "TOGGLE_INVENTORY" })}
							/>
							<span class="checkmark"></span>
							Include Out of Stock
						</label>
						<label>
							
							<input
								type="checkbox"
								className="checkbox"
								checked={showFastDeliveryOnly}
								onChange={() => dispatch({ type: "TOGGLE_DELIVERY" })}
							/>
							<span class="checkmark"></span>
							Fast Delivery Only
						</label>
					</div>
					<div class="container container-slider">
					<p className="container-title">Price Range -</p>
						<input
							type="range"
							min="50"
							max="1000"
							value={maxValue}
							className="slider"
							id="myRange"
							onChange={(e) => {
								dispatch({
									type: "TOGGLE_PRICE_RANGE",
									payload: e.target.value,
								});
							}}
						/>
						<p>
							Value: <span id="demo">₹{maxValue}</span>
						</p>
					</div>
				</div>

				<h3>Products {query.get("category")}</h3>
				<br />
				<div class="product-cards-container">
					{ searchText === "" ? filteredData.map((product) => {
						return <ProductCard product={product} />;
					}) : result.map((product) => {
						return <ProductCard product={product} />;
					})
					}
				</div>
			</div>
		</div>
	);
}
