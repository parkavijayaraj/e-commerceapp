// app/api/product/route.js
import { create , getAll } from "@/app/controllers/productController";

export async function POST(req) {
  return create(req);
}

export async function GET() {
  return getAll();
}

