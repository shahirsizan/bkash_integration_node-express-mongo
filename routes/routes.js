const router = require("express").Router();
const paymentController = require("../controller/paymentController");

router.post("/bkash/payment/create", paymentController.payment_create);

module.exports = router;
