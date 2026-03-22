// import {
//   getProductById,
//   updateProduct,
//   deleteProduct,
// } from "@/controllers/productController";

import { getProductById, updateProduct, deleteProduct } from "@/app/controllers/productController";

export async function GET(request, { params }) {
  return getProductById(params.id);
}

export async function PUT(request, { params }) {
  return updateProduct(params.id, request);
}

export async function DELETE(request, { params }) {
  return deleteProduct(params.id);
}

