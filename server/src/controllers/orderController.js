
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

// const placeOrder = async (req, res) => {
//   try {
//     const { address } = req.body;

//     const cart = await Cart.findOne({ user: req.user._id }).populate(
//       "items.product"
//     );

//     if (!cart || cart.items.length === 0) {
//       return res.status(400).json({ message: "Cart is empty" });
//     }

//     let totalAmount = 0;

//     const orderItems = cart.items.map((item) => {
//       totalAmount += item.product.price * item.quantity;

//       return {
//         product: item.product._id,
//         name: item.product.name,
//         price: item.product.price,
//         quantity: item.quantity,
//         image: item.product.image,
//       };
//     });

//     for (const item of cart.items) {
//       if (item.product.stock < item.quantity) {
//         return res.status(400).json({
//           message: `${item.product.name} does not have enough stock`,
//         });
//       }
//     }

//     const order = await Order.create({
//       user: req.user._id,
//       items: orderItems,
//       totalAmount,
//       address,
//     });

//     for (const item of cart.items) {
//       await Product.findByIdAndUpdate(item.product._id, {
//         $inc: { stock: -item.quantity },
//       });
//     }

//     cart.items = [];
//     await cart.save();

//     res.status(201).json({
//       message: "Order placed successfully",
//       order,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Place order failed", error: error.message });
//   }
// };

const placeOrder = async (req, res) => {
  try {
    const { address, items, couponCode = "", discount = 0, finalTotal = 0 } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          message: `${product.name} does not have enough stock`,
        });
      }

      totalAmount += product.price * item.quantity;

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: item.quantity,
        image: product.image,
      });
    }

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      address,
      couponCode,
      discount,
      finalTotal,
    });

    for (const item of orderItems) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Place order failed",
      error: error.message,
    });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Fetch my orders failed", error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Fetch all orders failed", error: error.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({ message: "Update order failed", error: error.message });
  }
};

const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (order.orderStatus !== "Pending") {
      return res.status(400).json({
        message: "Only pending orders can be cancelled",
      });
    }

    order.orderStatus = "Cancelled";
    await order.save();

    res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Cancel order failed",
      error: error.message,
    });
  }
};
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

module.exports = {
  placeOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
  cancelOrder,
  getOrderById,
};