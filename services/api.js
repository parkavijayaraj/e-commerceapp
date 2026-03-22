const BASE_URL = "http://localhost:3000/api";

export async function loginUser(data) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function registerUser(data) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/product`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${BASE_URL}/product/${id}`);
  return res.json();
}


export async function createOrder(data) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${BASE_URL}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // 🔥 IMPORTANT
    },
    body: JSON.stringify(data),
  });

  return res.json();
}

export async function createProduct(data) {
  const token = localStorage.getItem("token"); 
  const res = await fetch("/api/product", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
       "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });

  // ✅ check response first
  if (!res.ok) {
    const errorText = await res.text();
    console.error("API ERROR:", errorText);
    throw new Error("Failed to create product");
  }

  // ✅ safe json parse
  return res.json();
}

