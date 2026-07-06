const Coupon = require("../models/Coupon");

const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (error) {
    res.status(500).json({
      message: "Create coupon failed",
      error: error.message,
    });
  }
};

const getCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
    active: true,
    expiresAt: { $gte: new Date() },
    }).sort({ createdAt: -1 });
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({
      message: "Fetch coupons failed",
    });
  }
};
const validateCoupon = async (req, res) => {
  try {
    const { code, total } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      active: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: "Invalid coupon" });
    }

    if (new Date(coupon.expiresAt) < new Date()) {
      return res.status(400).json({ message: "Coupon expired" });
    }

    const discountAmount = (Number(total) * coupon.discount) / 100;
    const finalTotal = Number(total) - discountAmount;

    res.status(200).json({
      message: "Coupon applied",
      discount: discountAmount,
      finalTotal,
      couponCode: coupon.code,
    });
  } catch (error) {
    res.status(500).json({ message: "Coupon validation failed" });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Coupon deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: "Delete coupon failed",
    });
  }
};

module.exports = {
  createCoupon,
  getCoupons,
  deleteCoupon,
  validateCoupon,
};