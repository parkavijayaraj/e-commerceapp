import {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  cancelOrder,
} from "@/services/orderService";

import { verifyToken } from "@/middlewares/authMiddleware";
import { authorizeRole } from "@/middlewares/roleMiddleware";

// ✅ CREATE
export const create = async (req) => {
  try {
    const user = verifyToken(req);
    const body = await req.json();

    const order = await createOrder(body, user.id);

    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

// ✅ USER ORDERS (PAGINATION)
export const getMyOrders = async (req) => {
  try {
    const user = verifyToken(req);

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;

    const data = await getUserOrders(user.id, page);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

// ✅ ADMIN ALL ORDERS
export const getAll = async (req) => {
  try {
    const user = verifyToken(req);
    authorizeRole(user, "admin");

    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;

    const data = await getAllOrders(page);

    return Response.json(data);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

// ✅ UPDATE ORDER STATUS
export const updateStatus = async (req, { params }) => {
  try {
    const user = verifyToken(req);
    authorizeRole(user, "admin");

    const body = await req.json();

    const order = await updateOrderStatus(params.id, body.status);

    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

// ✅ PAYMENT STATUS
export const updatePayment = async (req, { params }) => {
  try {
    const user = verifyToken(req);
    authorizeRole(user, "admin");

    const body = await req.json();

    const order = await updatePaymentStatus(
      params.id,
      body.paymentStatus
    );

    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};

// ✅ CANCEL ORDER (USER)
export const cancel = async (req, { params }) => {
  try {
    const user = verifyToken(req);

    const order = await cancelOrder(params.id, user.id);

    return Response.json(order);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
};


