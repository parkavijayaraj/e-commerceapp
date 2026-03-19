import { create, getMyOrders } from "@/controllers/orderController";

export async function POST(req) {
  return create(req);
}

export async function GET(req) {
  return getMyOrders(req);
}