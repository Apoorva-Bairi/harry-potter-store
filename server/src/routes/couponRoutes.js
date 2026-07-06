const express = require("express");
const {
  createCoupon,
  getCoupons,
  deleteCoupon,
  validateCoupon,
} = require("../controllers/couponController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, createCoupon);
router.get("/", protect,  getCoupons);
router.delete("/:id", protect,adminOnly, deleteCoupon);
router.post("/validate", protect, validateCoupon);

module.exports = router;