const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const khalti = require("khalti")(process.env.KHALTI_SECRET_KEY);

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const myPayment = await khalti.paymentIntents.create({
//     amount: req.body.amount,
//     token: req.body.token,
//     metadata: {
//       company: "KK Shopping",
//     },
//   });

//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// });

// exports.sendKhaltiApiKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({ KhaltiApiKey: process.env.STRIPE_API_KEY });
// });

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

// require("dotenv").config();
// const axios = require("axios");
// const catchAsyncErrors = require("../middleware/catchAsyncError");

// exports.processPayment = catchAsyncErrors(async (req, res, next) => {
//   const { token, amount } = req.body;
//   const paymentUrl = "https://khalti.com/api/v2/payment/verify/";

//   const headers = {
//     Authorization: Key ${process.env.KHALTI_SECRET_KEY},
//   };

//   try {
//     const response = await axios.post(
//       paymentUrl,
//       { token, amount },
//       { headers }
//     );
//     console.log(response.data);
//     res.status(200).json({
//       success: true,
//       message: "Payment successful",
//       data: response.data,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       success: false,
//       message: "Payment failed",
//       data: error.response.data,
//     });
//   }
// });
