const BASE = "/api/product";

// ─── Fetch all products with optional filters ─────────────────────────────────

export async function fetchProducts({
  page = 1,
  limit = 12,
  category = "",
  search = "",
  sortBy = "createdAt",
  order = "desc",
  inStock = false,
} = {}) {
  const params = new URLSearchParams({ page, limit, sortBy, order });
  if (category) params.set("category", category);
  if (search)   params.set("search", search);
  if (inStock)  params.set("inStock", "true");

  const res = await fetch(`${BASE}?${params}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// ─── Fetch single product ─────────────────────────────────────────────────────

export async function fetchProduct(id) {
  const res = await fetch(`${BASE}/${id}`);
  if (!res.ok) throw new Error("Product not found");
  return res.json();
}

// ─── Create product ───────────────────────────────────────────────────────────

export async function createProduct(data) {
  const res = await fetch(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to create product");
  }
  return res.json();
}

// ─── Update product ───────────────────────────────────────────────────────────

export async function updateProduct(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "Failed to update product");
  }
  return res.json();
}

// ─── Delete product ───────────────────────────────────────────────────────────

export async function deleteProduct(id) {
  const res = await fetch(`${BASE}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

