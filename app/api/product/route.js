//import { getAllProducts, createProduct } from "@/controllers/productController";

import { getAllProducts, createProduct } from "@/app/controllers/productController";

export async function GET(request) {
  return getAllProducts(request);
}

export async function POST(request) {
  return createProduct(request);
}


