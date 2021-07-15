import React, { useEffect, useState } from "react";
import "./Banner.css";
// import {ProductCard} from '../index';

export function Banner() {
	const [frontClass, setFrontClass] = useState("card__side card__side--front front-1");
	const [backClass, setBackClass] = useState("card__side card__side--back back-1");
	// const [flipCheck, setFlipCheck]= useState(0);
    let flipCheck = 1;
    function rotateCards() {
        if (flipCheck === 0) {
            setFrontClass("card__side card__side--front showGreen");
            setBackClass("card__side card__side--back showRed");
            // setFlipCheck(1)
            flipCheck = 1;

        } else {
            setFrontClass("card__side card__side--front");
            setBackClass("card__side card__side--back");
            // setFlipCheck(0)
            flipCheck = 0;
        }
        setTimeout(rotateCards,3500);
    }
	

	useEffect(() => {
		rotateCards();
	}, []);

	return (
		<div className="banner-card">
			<div className={frontClass} id="front-1">
				<div className="text-box">
					<h3 className="text-box-top">HAPPINESS</h3>
					<h1 className="text-box-middle">is turning your space into a</h1>
					<h3 className="text-box-lower">---Garden---</h3>
				</div>
			</div>
			<div className={backClass} id="back-1">
				<div className="text-box">
					<h3 className="text-box-top">HAPPINESS</h3>
					<h1 className="text-box-middle">is having more and more</h1>
					<h3 className="text-box-lower">---Plants---</h3>
				</div>
			</div>
		</div>
	);
}
