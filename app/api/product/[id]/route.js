import { getProductById, updateProduct, deleteProduct } from "@/app/controllers/productController";

export async function GET(request, { params }) {
  return getProductById(params.id);
}

export async function PUT(request, { params }) {
  const { id } = await params;
  return updateProduct(id, request);
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  return deleteProduct(id);
}





