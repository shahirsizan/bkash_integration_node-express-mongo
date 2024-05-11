import React from "react";
import axios from "axios";

const Home = () => {
	const pay = async () => {
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/bkash/payment/create",
				{ amount: 250 }
			);
			// At last, got { data } from paymentController.payment_create
			//console.log(data);
			window.location.href = data.bkashURL;
			// `bkashURL` A.K.A `data.bkashURL` will be directly put into the address bar of browser
		} catch (error) {
			// console.log(error.response.data);
		}
	};
	return (
		<div>
			<button onClick={pay}>Pay bkash</button>
		</div>
	);
};

export default Home;
