const axios = require("axios");
const globals = require("node-global-storage");
const { v4: uuidv4 } = require("uuid");

class paymentController {
	payment_create = async (req, res) => {
		console.log("hello from payment_create first line");
		const { amount } = req.body;

		bkash_headers = async () => {
			return {
				"Content-Type": "application/json",
				Accept: "application/json",
				authorization: globals.get("id_token"),
				"x-app-key": process.env.bkash_api_key,
			};
		};

		// try {
		// 	const { data } = await axios.post(
		// 		process.env.bkash_create_payment_url,
		// 		{
		// 			mode: "0011",
		// 			payerReference: " ",
		// 			callbackURL:
		// 				"http://localhost:5000/api/bkash/payment/callback",
		// 			amount: amount,
		// 			currency: "BDT",
		// 			intent: "sale",
		// 			merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
		// 		},
		// 		{ headers: await bkash_headers() }
		// 	);
		// 	//return res.status(200).json({ bkashURL: data.bkashURL });

		// 	// here `bkashURL` is the URL where the customer will be forwarded to enter his wallet number, OTP and wallet PIN.
		// } catch (error) {}
	};
}

module.exports = new paymentController();
