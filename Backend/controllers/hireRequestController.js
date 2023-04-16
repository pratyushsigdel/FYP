// const Order = require("../models/OrderModel");
// const Product = require("../models/BikeModel");
// const HireRequest = require("../models/HireRequest");
// const ErrorHander = require("../utils/errorhander");
// const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// // Hire /  book product
// exports.book = catchAsyncErrors(async (req, res, next) => {
//   let data = req.body;
//   data.productId = req.params.id;

//   const hireRequest = await HireRequest.create(data);

//   if (!hireRequest) {
//     return next(new ErrorHander("Cannot create hire request", 404));
//   }

//   res.status(200).json({
//     success: true,
//     hireRequest,
//   });
// });

// //Hire /  book product

// // Get specific request
// exports.getRequest = catchAsyncErrors(async (req, res, next) => {
//   //   res.json("hello");
//   let id = req.params.id;
//   const hireRequest = await HireRequest.findById(id);

//   if (!hireRequest) {
//     return next(new ErrorHander("Cannot find hire request", 404));
//   }

//   res.status(200).json({
//     success: true,
//     hireRequest,
//   });
// });
// // Get specific request

// // Get all request
// exports.getAllRequest = catchAsyncErrors(async (req, res, next) => {
//   const hireRequests = await HireRequest.find({});

//   if (!hireRequests) {
//     return next(new ErrorHander("Cannot find hire request", 404));
//   }

//   res.status(200).json({
//     success: true,
//     hireRequests,
//   });
// });
// // Get all request

// // Update reuest status
// exports.approveRejectRequest = catchAsyncErrors(async (req, res, next) => {
//   let id = req.params.id;
//   const hireRequest = await HireRequest.findByIdAndUpdate(id, req.body);

//   if (!hireRequest) {
//     return next(new ErrorHander("Cannot find hire request", 404));
//   }

//   res.status(200).json({
//     success: true,
//     hireRequest,
//   });
// });
// // Update reuest status

const HireRequest = require("../models/hireRequest");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/api features");

// Create Hire Request --- User Route
exports.createHireRequest = catchAsyncErrors(async (req, res, next) => {
  let images = [];

  if (typeof req.body.images === "string") {
    images.push(req.body.images);
  } else {
    images = req.body.images;
  }

  const imagesLinks = [];

  for (let i = 0; i < images.length; i++) {
    const result = await cloudinary.v2.uploader.upload(images[i], {
      folder: "hire",
    });

    imagesLinks.push({
      public_id: result.public_id,
      url: result.secure_url,
    });
  }

  req.body.images = imagesLinks;
  req.body.username = req.user.name;
  req.body.email = req.user.email;

  const hireRequest = await HireRequest.create(req.body);

  res.status(201).json({
    success: true,
    hireRequest,
  });
});

// Get All Hire Requests (Admin)
exports.getAdminHireRequests = catchAsyncErrors(async (req, res, next) => {
  const hireRequests = await HireRequest.find();

  res.status(200).json({
    success: true,
    hireRequests,
  });
});

// Get User's Hire Requests
exports.getUserHireRequests = catchAsyncErrors(async (req, res, next) => {
  const userHireRequests = await HireRequest.find({ email: req.user.email });

  res.status(200).json({
    success: true,
    userHireRequests,
  });
});

// Get Hire Request Details
exports.getHireRequestDetails = catchAsyncErrors(async (req, res, next) => {
  const hireRequest = await HireRequest.findById(req.params.id);

  if (!hireRequest) {
    return next(new ErrorHander("Hire request not found", 404));
  }

  res.status(200).json({
    success: true,
    hireRequest,
  });
});

// Update Hire Request Status --- Admin Route
exports.updateHireRequestStatus = catchAsyncErrors(async (req, res, next) => {
  const hireRequest = await HireRequest.findByIdAndUpdate(req.params.id);

  if (!hireRequest) {
    return next(new ErrorHander("Hire request not found", 404));
  }

  hireRequest.status = req.body.status;

  await hireRequest.save();

  res.status(200).json({
    success: true,
    hireRequest,
  });
});

// Delete Hire Request --- Admin Route
exports.deleteHireRequest = catchAsyncErrors(async (req, res, next) => {
  const hireRequest = await HireRequest.findById(req.params.id);

  if (!hireRequest) {
    return next(new ErrorHander("Hire request not found", 404));
  }

  // Deleting images from Cloudinary
  for (let i = 0; i < hireRequest.images.length; i++) {
    const result = await cloudinary.v2.uploader.destroy(
      hireRequest.images[i].public_id
    );
  }

  await hireRequest.remove();

  res.status(200).json({
    success: true,
    message: "Hire request deleted successfully",
  });
});
