const router = require("express").Router();
const paymentController = require("../controller/paymentController");
const middleware = require("../middleware/middleware");

router.post(
	"/bkash/payment/create",
	middleware.bkash_auth,
	paymentController.payment_create
);

module.exports = router;
