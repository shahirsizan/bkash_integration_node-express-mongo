import axios from "axios";

const Home = () => {
	const pay = async () => {
		try {
			const { data } = await axios.post(
				"http://localhost:5000/api/bkash/payment/create",
				{ amount: 100, orderId: 1 },
				{ withCredentials: true }
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<div>
			<button onClick={pay}>Pay bkash</button>
		</div>
	);
};

export default Home;
