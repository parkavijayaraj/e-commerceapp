// app/api/order/admin/route.js
import { getAll } from "@/controllers/orderController";

export async function GET(req) {
  return getAll(req);
}


