// const express = require("express");
// const {
//   book,
//   getRequest,
//   approveRejectRequest,
//   getAllRequest,
// } = require("../controllers/hireRequestController");
// const router = express.Router();

// const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// router.route("/hire-request/book/:id").post(isAuthenticatedUser, book);

// router
//   .route("/hire-request/get-request/:id")
//   .get(isAuthenticatedUser, getRequest);

// router
//   .route("/hire-request/get-all-requests")
//   .get(isAuthenticatedUser, getAllRequest);

// router
//   .route("/hire-request/approve-reject/:id")
//   .post(isAuthenticatedUser, approveRejectRequest);

// module.exports = router;

const express = require("express");
const {
  createHireRequest,
  getAdminHireRequests,
  getUserHireRequests,
  getHireRequestDetails,
  updateHireRequestStatus,
  deleteHireRequest,
} = require("../controllers/hireRequestController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// Create Hire Request - User Route
router.route("/hirerequest").post(isAuthenticatedUser, createHireRequest);

// Get All Hire Requests - Admin Route
router
  .route("/admin/hirerequests")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminHireRequests);

// Get User's Hire Requests - User Route
router
  .route("/user/hirerequests")
  .get(isAuthenticatedUser, getUserHireRequests);

// Get Hire Request Details - Admin Route
router
  .route("/admin/hirerequest/:id")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getHireRequestDetails);

// Update Hire Request Status - Admin Route
router
  .route("/admin/hirerequest/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateHireRequestStatus);

// Delete Hire Request - Admin Route
router
  .route("/admin/hirerequest/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteHireRequest);

module.exports = router;
