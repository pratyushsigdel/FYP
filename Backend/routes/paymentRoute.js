const express = require("express");
const router = express.Router();
const {
  isAuthenticatedUser,
  sendKhaltiApiKey,
} = require("../middleware/autho");
// const {
//   processPayment,
sendKhaltiApiKey,
  // } = require("../controllers/paymentController");
  //

  //   .route("https://khalti.com/api/v2/payment/verify/%22)

  router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/KhaltiApiKey").get(isAuthenticatedUser, sendKhaltiApiKey);
module.exports = router;
