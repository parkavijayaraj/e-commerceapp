// app/api/product/route.js
import { create, getAll } from "@/controllers/productController";

export async function POST(req) {
  return create(req);
}

export async function GET() {
  return getAll();
}

