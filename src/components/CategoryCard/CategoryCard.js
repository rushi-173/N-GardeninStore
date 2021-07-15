// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CategoryCard.css";
// import {ProductCard} from '../index';

export function CategoryCard({imageUrl = "https://www.polhill.co.uk/wp-content/uploads/2018/09/garden-guides.jpg", title ="New Cat", categoryUrl= "/products" }) {
	return (
		
		<div class="category_card 1">
			
			<div class="category_card_image">
				<img src={imageUrl}/>
			</div> <Link to={`/products?category=${title}`}>
			<div class="category_card_title title-white"  >
				<p>{title}</p>
			</div></Link>
			
		
		</div>
	);
}
