// components/OrderService.js

export const fetchOrders = async () => {
  const res = await fetch("/api/orders");

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Failed to fetch orders");
  }

  return data;
};


