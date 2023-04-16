const Service = require("../models/ServicingModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const cloudinary = require("cloudinary");
const ApiFeatures = require("../utils/api features");

exports.getAllService = catchAsyncErrors(async (req, res, next) => {
  const allService = await Service.find();

  res.status(200).json({
    success: true,
    allService,
  });
});

exports.createService = catchAsyncErrors(async (req, res, next) => {
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

  const service = await Service.create(req.body);

  res.status(201).json({
    success: true,
    service,
  });
});

exports.updateService = catchAsyncErrors(async (req, res, next) => {
  const updateService = await Service.findByIdAndUpdate(
    req.params.id,
    req.body
  );

  res.status(200).json({
    status: "success",
    updateService,
  });
});

exports.deleteService = catchAsyncErrors(async (req, res, next) => {
  const service = await Service.findById(req.params.id);

  if (!service) {
    return next(new ErrorHander("Service not found", 404));
  }

  //Deleting Images From Cloudinary

  for (let i = 0; i < service.images.length; i++) {
    await cloudinary.v2.uploader.destroy(service.images[i].public_id);
  }

  await service.remove();

  res.status(200).json({
    status: "success",
    message: "Service Deleted Successfully",
  });
});
