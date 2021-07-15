import { useState, useEffect } from "react";
export function Toast({ title, message, type }) {
	let toastColor, toastDarkColor;
	const [show, setShow] = useState("flex");
	if (type === "error") {
		toastColor = "#ffcdd2";
		toastDarkColor = "#b71c1c";
	} else if (type === "success") {
		toastColor = "#C8E6C9";
		toastDarkColor = "#004D40";
	} else if (type === "warning") {
		toastColor = "#FFECB3";
		toastDarkColor = "#FFAB00";
	} else {
		toastColor = "white";
		toastDarkColor = "black";
	}

	useEffect(() => {
		setTimeout(() => {
			setShow("none");
		}, 2500);
	}, []);

	return (
		<div className="alert alert-success" style={{display: show, background: toastColor+'6c'}}>
			<div style={{display: "flex", flexDirection: "column",fontSize:"1rem"}}>
				<h3>{title}</h3>
				<p> {message}</p>
			</div>
			<button
				style={{
					height: "20px",
					borderColor: toastDarkColor,
					color: toastDarkColor,
				}}
				onClick={(e) => {
					setShow("none");
				}}
			>
				x
			</button>
		</div>
	);
}
