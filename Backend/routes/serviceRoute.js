const express = require("express");

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const {
  createService,
  getAllService,
  updateService,
  deleteService,
} = require("../controllers/servicingController");
const router = express.Router();

router.use(isAuthenticatedUser);

router.route("/service").get(authorizeRoles("admin"), getAllService);
router.route("/service").post(createService);
router
  .route("/service/:id")
  .post(updateService)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteService);

module.exports = router;
