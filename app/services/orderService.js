import Order from "../models/Order";
import Product from "../models/Product";
import { dbConnect } from "../lib/dbConnect";

// ✅ AUTO CALCULATE TOTAL
export const createOrder = async (data, userId) => {
  await dbConnect();

  let total = 0;

  const productsWithPrice = await Promise.all(
    data.products.map(async (item) => {
      const product = await Product.findById(item.productId);

      if (!product) throw new Error("Product not found");

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    })
  );

  return await Order.create({
    user: userId,
    products: productsWithPrice,
    totalAmount: total,
    statusHistory: [{ status: "placed" }],
  });
};

// ✅ USER ORDERS WITH PAGINATION
export const getUserOrders = async (userId, page = 1, limit = 5) => {
  await dbConnect();

  const skip = (page - 1) * limit;

  const orders = await Order.find({ user: userId })
    .populate("products.productId")
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments({ user: userId });

  return {
    orders,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// ✅ ADMIN GET ALL
export const getAllOrders = async (page = 1, limit = 5) => {
  await dbConnect();

  const skip = (page - 1) * limit;

  const orders = await Order.find()
    .populate("user")
    .populate("products.productId")
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments();

  return {
    orders,
    total,
    page,
    pages: Math.ceil(total / limit),
  };
};

// ✅ UPDATE STATUS + TRACKING
export const updateOrderStatus = async (id, status) => {
  await dbConnect();

  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  order.orderStatus = status;

  order.statusHistory.push({ status });

  return await order.save();
};

// ✅ PAYMENT UPDATE
export const updatePaymentStatus = async (id, paymentStatus) => {
  await dbConnect();

  return await Order.findByIdAndUpdate(
    id,
    { paymentStatus },
    { new: true }
  );
};

// ✅ CANCEL ORDER
export const cancelOrder = async (id, userId) => {
  await dbConnect();

  const order = await Order.findById(id);

  if (!order) throw new Error("Order not found");

  if (order.user.toString() !== userId) {
    throw new Error("Not authorized");
  }

  if (order.orderStatus === "delivered") {
    throw new Error("Cannot cancel delivered order");
  }

  order.orderStatus = "cancelled";
  order.statusHistory.push({ status: "cancelled" });

  return await order.save();
};




