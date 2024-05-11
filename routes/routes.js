const router = require("express").Router();
const paymentController = require("../controller/paymentController");
const middleware = require("../middleware/middleware");

router.post(
	"/bkash/payment/create",
	middleware.bkash_auth,
	// (_req, _res) => {
	// 	console.log("hello from azaira");
	// 	next();
	// },
	paymentController.payment_create
);

module.exports = router;
