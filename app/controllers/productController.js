import {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct
} from "@/services/productService";

import { verifyToken } from "@/middlewares/authMiddleware";
import { authorizeRole } from "@/middlewares/roleMiddleware";

export const create = async (req) => {
  const user = verifyToken(req);
  authorizeRole(user, "admin");

  const body = await req.json();

  const product = await createProduct(body, user.id);

  return Response.json(product);
};

export const getAll = async () => {
  const products = await getProducts();
  return Response.json(products);
};

export const update = async (req, { params }) => {
  const user = verifyToken(req);
  authorizeRole(user, "admin");

  const body = await req.json();

  const product = await updateProduct(params.id, body);

  return Response.json(product);
};

export const remove = async (req, { params }) => {
  const user = verifyToken(req);
  authorizeRole(user, "admin");

  await deleteProduct(params.id);

  return Response.json({ message: "Deleted successfully" });
};


