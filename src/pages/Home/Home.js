import React from "react";
import "./Home.css";
import {Link} from "react-router-dom";
import { ProductCard, Banner, CategoryCard } from "../../components/index";
import { useProductsData } from "../../contexts/products-data-context";

export function Home() {
	const { filteredData } = useProductsData();

	return (
		<div className="container-column Home">
			<Banner/>
			<div
				className="container-center container-column offer-banner"
				style={{height:"auto", padding:"0.5rem", background:"#BFDBFE", color:"#1F2937"}}
			>
				<h2>Get some best products for Gardening specially curated by us from top online ecommerce platforms. </h2>
				<Link to="/products"><button className="btn btn-danger">Explore</button></Link>
			</div>
			<br/><br/>

			<h2>Featured Categories</h2>
			<div className="category-card-list">
				<CategoryCard title="Pot" imageUrl="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-planters-3-1-inch-8-cm-square-plastic-planter-with-rounded-edges-blue-16968456831116_600x600.jpg"/>
				<CategoryCard title="Indoor Plant" imageUrl="https://images-na.ssl-images-amazon.com/images/I/71ElgO40I0L._SL1500_.jpg"/>
				<CategoryCard title="Air Purifier" imageUrl="https://images-na.ssl-images-amazon.com/images/I/61w0c0qeqXL._SL1500_.jpg"/>
				<CategoryCard title="Fruit Plant" imageUrl="https://cdn.shopify.com/s/files/1/0047/9730/0847/products/nurserylive-plants-fig-tree-anjeer-fruit-common-fig-fruit-plant-16968860139660_600x600.jpg"/>
			</div>
			<br/><br/>

			

			<div
				className="container-center container-column offer-banner"
				
			>
				<h1 className="offer-title">Special Holi Sale</h1>
				<h2>UpTo 50% Off</h2>
				<Link to="/products"><button className="btn btn-danger">Explore</button></Link>
			</div>
				
			<div class="container-column " >
			<br/><br/>
				<h2>Featured Products</h2>
				
				<div class="product-cards-container">
					{filteredData.slice(0,5).map((product) => {
						return <ProductCard product={product} />;
					})}
					<Link to="/products" className="card-product container-center view-more-card">
					<div className="">
				
						<h3>View All Products</h3>
					</div></Link>
				</div>

			</div>
			
		</div>
	);
}
