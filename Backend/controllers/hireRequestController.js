const Order = require("../models/OrderModel");
const Product = require("../models/BikeModel");
const HireRequest = require("../models/HireRequest");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Hire /  book product
exports.book = catchAsyncErrors(async (req, res, next) => {
  let data = req.body;
  data.productId = req.params.id;

  const hireRequest = await HireRequest.create(data);

  if (!hireRequest) {
    return next(new ErrorHander("Cannot create hire request", 404));
  }

  res.status(200).json({
    success: true,
    hireRequest,
  });
});

//Hire /  book product

// Get specific request
exports.getRequest = catchAsyncErrors(async (req, res, next) => {
  //   res.json("hello");
  let id = req.params.id;
  const hireRequest = await HireRequest.findById(id);

  if (!hireRequest) {
    return next(new ErrorHander("Cannot find hire request", 404));
  }

  res.status(200).json({
    success: true,
    hireRequest,
  });
});
// Get specific request

// Get all request
exports.getAllRequest = catchAsyncErrors(async (req, res, next) => {
  const hireRequests = await HireRequest.find({});

  if (!hireRequests) {
    return next(new ErrorHander("Cannot find hire request", 404));
  }

  res.status(200).json({
    success: true,
    hireRequests,
  });
});
// Get all request

// Update reuest status
exports.approveRejectRequest = catchAsyncErrors(async (req, res, next) => {
  let id = req.params.id;
  const hireRequest = await HireRequest.findByIdAndUpdate(id, req.body);

  if (!hireRequest) {
    return next(new ErrorHander("Cannot find hire request", 404));
  }

  res.status(200).json({
    success: true,
    hireRequest,
  });
});
// Update reuest status
