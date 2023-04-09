const express = require("express");
const {
  book,
  getRequest,
  approveRejectRequest,
  getAllRequest,
} = require("../controllers/hireRequestController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/hire-request/book/:id").post(isAuthenticatedUser, book);

router
  .route("/hire-request/get-request/:id")
  .get(isAuthenticatedUser, getRequest);

router
  .route("/hire-request/get-all-requests")
  .get(isAuthenticatedUser, getAllRequest);

router
  .route("/hire-request/approve-reject/:id")
  .post(isAuthenticatedUser, approveRejectRequest);

module.exports = router;
