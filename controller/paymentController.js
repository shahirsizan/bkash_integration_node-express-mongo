const axios = require("axios");
const paymentModel = require("../model/paymentModel");
const globals = require("node-global-storage");
const { v4: uuidv4 } = require("uuid");

class paymentController {
	bkash_headers = async () => {
		return {
			"Content-Type": "application/json",
			Accept: "application/json",
			authorization: globals.get("id_token"),
			"x-app-key": process.env.bkash_api_key,
		};
	};
	payment_create = async (req, res) => {
		console.log("hello from payment_create first lineee");
		const { amount } = req.body;

		try {
			const { data } = await axios.post(
				process.env.bkash_create_payment_url,
				{
					mode: "0011",
					payerReference: " ",
					callbackURL:
						"http://localhost:5000/api/bkash/payment/callback",
					amount: amount,
					currency: "BDT",
					intent: "sale",
					merchantInvoiceNumber: "Inv" + uuidv4().substring(0, 5),
				},
				{ headers: await this.bkash_headers() }
			);

			return res.status(200).json({ bkashURL: data.bkashURL });
			// Finally, `bkashURL` will be sent the {Home} component.
			// this `bkashURL` will trigger the bkash UI where user will enter theri phone number, passwords and OTP and confirm
		} catch (error) {
			return res.status(401).json({ error: error.message });
		}
	};

	call_back = async (req, res) => {
		const { paymentID, status } = req.query;

		if (status === "cancel" || status === "failure") {
			return res.redirect(
				`http://localhost:5173/error?message=${status}`
				// `redirect` is used for react components.
				// as react is running on `http://localhost:5173/` url.
				// reference - frontend/src/app.jsx
			);
		}
		if (status === "success") {
			try {
				const { data } = await axios.post(
					process.env.bkash_execute_payment_url,
					{ paymentID },
					{
						headers: await this.bkash_headers(),
					}
				);
				//
				//
				// AT THIS POINT, TRANSACTION IS COMPLETE.
				// FROM THIS POINT ONWARDS, WE HAVE TO DEAL WITH OUR LOCAL DATABASE TO SAVE THE TrxID AND OTHER INFO
				//
				//

				if (data && data.statusCode === "0000") {
					//const userId = globals.get('userId')
					await paymentModel.create({
						userId: Math.random() * 10 + 1,
						paymentID,
						trxID: data.trxID,
						date: data.paymentExecuteTime,
						amount: parseInt(data.amount),
					});

					return res.redirect(`http://localhost:5173/success`);
				} else {
					return res.redirect(
						`http://localhost:5173/error?message=${data.statusMessage}`
						// `redirect` is used for react components.
						// as react is running on `http://localhost:5173/` url.
						// reference - frontend/src/app.jsx
					);
				}
			} catch (error) {
				console.log(error);
				return res.redirect(
					`http://localhost:5173/error?message=${error.message}`
					// `redirect` is used for react components.
					// as react is running on `http://localhost:5173/` url.
					// reference - frontend/src/app.jsx
				);
			}
		}
	};

	refund = async (req, res) => {
		const { trxID } = req.params;

		try {
			const payment = await paymentModel.findOne({ trxID });

			const { data } = await axios.post(
				process.env.bkash_refund_transaction_url,
				{
					paymentID: payment.paymentID,
					amount: payment.amount,
					trxID,
					sku: "payment",
					reason: "cashback",
				},
				{
					headers: await this.bkash_headers(),
				}
			);

			if (data && data.statusCode === "0000") {
				return res.status(200).json({ message: "refund success" });
			} else {
				return res.status(404).json({ error: "refund failed" });
			}
		} catch (error) {
			return res.status(404).json({ error: "refund failed" });
		}
	};
}

module.exports = new paymentController();
