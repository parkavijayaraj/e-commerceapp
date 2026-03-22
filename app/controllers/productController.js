import Product from "../models/Product";
import { dbConnect } from "../lib/dbConnect";

// ─── Helper ───────────────────────────────────────────────────────────────────

function sendResponse(data = null, message = "Success", status = 200) {
  return Response.json({ success: true, message, data }, { status });
}

function sendError(message = "Server Error", status = 500) {
  return Response.json({ success: false, message, data: null }, { status });
}

// ─── GET all products ─────────────────────────────────────────────────────────

export async function getAllProducts(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    // Filtering
    const filter = {};
    const category = searchParams.get("category");
    const inStock   = searchParams.get("inStock");
    const search    = searchParams.get("search");

    if (category) filter.category = category;
    if (inStock === "true") filter.stock = { $gt: 0 };
    if (search) filter.name = { $regex: search, $options: "i" };

    // Sorting
    const sortField = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("order") === "asc" ? 1 : -1;

    // Pagination
    const page  = parseInt(searchParams.get("page")  || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip  = (page - 1) * limit;

    const [products, total] = await Promise.all([
      Product.find(filter).sort({ [sortField]: sortOrder }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return sendResponse(
      { products, total, page, totalPages: Math.ceil(total / limit) },
      "Products fetched"
    );
  } catch (err) {
    return sendError(err.message);
  }
}

// ─── GET single product ───────────────────────────────────────────────────────

export async function getProductById(id) {
  try {
    await dbConnect();
    const product = await Product.findById(id);
    if (!product) return sendError("Product not found", 404);
    return sendResponse(product, "Product fetched");
  } catch (err) {
    return sendError(err.message);
  }
}

// ─── CREATE product ───────────────────────────────────────────────────────────

export async function createProduct(request) {
  try {
    await dbConnect();
    const body = await request.json();

    const product = await Product.create(body);
    return sendResponse(product, "Product created", 201);
  } catch (err) {
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return sendError(messages.join(", "), 400);
    }
    return sendError(err.message);
  }
}

// ─── UPDATE product ───────────────────────────────────────────────────────────

export async function updateProduct(id, request) {
  await dbConnect();
  try {
    const body = await request.json(); // parse PUT request body
    const updated = await Product.findByIdAndUpdate(
      id,
      { name: body.name, price: body.price, stock: body.stock },
      { runValidators: true, returnDocument: "after" } // fixes Mongoose warning
    );

    if (!updated) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }
    return new Response(JSON.stringify(updated), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to update product" }), { status: 500 });
  }
}

// ─── DELETE product ───────────────────────────────────────────────────────────

export async function deleteProduct(id) {
  await dbConnect();
  try {
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return new Response(JSON.stringify({ error: "Product not found" }), { status: 404 });
    }
    return new Response(JSON.stringify({ message: "Product deleted" }), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to delete product" }), { status: 500 });
  }
}





