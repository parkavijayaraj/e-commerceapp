"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchProduct } from "@/components/Productservice";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router  = useRouter();

  const [product, setProduct]   = useState(null);
  const [loading, setLoading]   = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded]       = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [tab, setTab]           = useState("description");

  useEffect(() => {
    fetchProduct(id)
      .then((res) => setProduct(res.data))
      .catch(() => router.push("/products"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleCart = () => {
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
    // dispatch to your cart context / Redux here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) return null;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Nav */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-500 hover:text-gray-800 transition text-sm flex items-center gap-1"
          >
            ← Back
          </button>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-500">{product.category}</span>
          <span className="text-gray-300">/</span>
          <span className="text-sm text-gray-800 font-medium truncate">{product.name}</span>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10">
          {/* Image */}
          <div className="bg-white rounded-3xl overflow-hidden border border-gray-100 aspect-square relative">
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {discount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                -{discount}% OFF
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-indigo-500 text-sm font-semibold uppercase tracking-widest mb-2">
              {product.category}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg
                      key={s}
                      className={`w-4 h-4 ${s <= Math.round(product.rating) ? "text-amber-400" : "text-gray-200"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-gray-900">
                ₹{product.price?.toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ₹{product.originalPrice?.toLocaleString("en-IN")}
                </span>
              )}
              {discount && (
                <span className="text-green-600 font-semibold text-sm">
                  Save ₹{(product.originalPrice - product.price).toLocaleString("en-IN")}
                </span>
              )}
            </div>

            {/* Stock */}
            <p className={`text-sm font-medium mb-6 ${product.stock > 0 ? "text-green-600" : "text-red-500"}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : "✗ Out of Stock"}
            </p>

            {/* Quantity */}
            {product.stock > 0 && (
              <div className="flex items-center gap-4 mb-6">
                <p className="text-sm text-gray-600 font-medium">Quantity</p>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg"
                  >
                    −
                  </button>
                  <span className="w-10 text-center font-semibold text-gray-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-50 transition text-lg"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleCart}
                disabled={product.stock === 0}
                className={`flex-1 py-3 rounded-2xl font-semibold text-sm transition-all duration-200 ${
                  product.stock === 0
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : added
                    ? "bg-green-500 text-white scale-95"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95"
                }`}
              >
                {product.stock === 0 ? "Out of Stock" : added ? "✓ Added to Cart!" : "Add to Cart"}
              </button>

              <button
                onClick={() => setWishlist((w) => !w)}
                className={`w-12 h-12 rounded-2xl border flex items-center justify-center transition-all ${
                  wishlist
                    ? "border-red-300 bg-red-50 text-red-500"
                    : "border-gray-200 text-gray-400 hover:border-gray-300"
                }`}
              >
                <svg className="w-5 h-5" fill={wishlist ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              </button>
            </div>

            {/* Trust badges */}
            <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs text-gray-500">
              {[
                { icon: "🚚", label: "Free Delivery", sub: "Orders above ₹499" },
                { icon: "↩️", label: "Easy Returns", sub: "7-day policy" },
                { icon: "🔒", label: "Secure Pay", sub: "100% safe" },
              ].map((b) => (
                <div key={b.label} className="bg-gray-50 rounded-xl p-3">
                  <p className="text-lg mb-1">{b.icon}</p>
                  <p className="font-semibold text-gray-700">{b.label}</p>
                  <p>{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-100 overflow-hidden">
          <div className="flex border-b border-gray-100">
            {["description", "specifications", "reviews"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-4 text-sm font-medium capitalize transition ${
                  tab === t
                    ? "text-indigo-600 border-b-2 border-indigo-600"
                    : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className="p-6 text-sm text-gray-600 leading-relaxed">
            {tab === "description" && (
              <p>{product.description || "No description available for this product."}</p>
            )}
            {tab === "specifications" && (
              <table className="w-full text-sm">
                <tbody>
                  {[
                    ["Category", product.category],
                    ["Stock", product.stock],
                    ["Rating", `${product.rating} / 5`],
                    ["Reviews", product.reviewCount],
                  ].map(([k, v]) => (
                    <tr key={k} className="border-b border-gray-50">
                      <td className="py-2 pr-4 font-medium text-gray-500 w-32">{k}</td>
                      <td className="py-2 text-gray-800">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {tab === "reviews" && (
              <p className="text-gray-400 text-center py-8">No reviews yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


