import { dbConnect } from "@/app/lib/dbConnect";
import Order from "@/app/models/Order";
import Product from "@/app/models/Product";
import { verifyToken } from "@/app/middlewares/authMiddleware"; // your existing middleware

export async function POST(req) {
  try {
    // 1️⃣ Connect to MongoDB
    await dbConnect();

    // 2️⃣ Get user from JWT
    const userPayload = verifyToken(req); // returns { id, role, ... }

    // 3️⃣ Parse request body
    const { products } = await req.json();
    if (!products || products.length === 0) {
      return new Response(JSON.stringify({ message: "No products in order" }), { status: 400 });
    }

    // 4️⃣ Map products to include current price from DB
    const productsWithPrice = await Promise.all(
      products.map(async (p) => {
        const product = await Product.findById(p.productId);
        if (!product) throw new Error(`Product not found: ${p.productId}`);
        return {
          productId: p.productId,
          quantity: p.quantity, // store quantity as-is
          price: product.price, // current price
        };
      })
    );

    // 5️⃣ Calculate total amount
    const totalAmount = productsWithPrice.reduce(
      (acc, p) => acc + p.price * p.quantity,
      0
    );

    // 6️⃣ Create order
    const order = await Order.create({
      user: userPayload.id,
      products: productsWithPrice,
      totalAmount,
      paymentStatus: "pending",
      orderStatus: "placed",
      statusHistory: [{ status: "placed" }],
    });

    return new Response(JSON.stringify(order), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}