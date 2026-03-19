// app/api/product/[id]/route.js
import { update, remove } from "@/controllers/productController";

export async function PUT(req, context) {
  return update(req, context);
}

export async function DELETE(req, context) {
  return remove(req, context);
}


