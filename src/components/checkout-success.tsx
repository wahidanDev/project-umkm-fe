// src/pages/CheckoutSuccess.tsx
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CheckoutSuccess() {
  const { cart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Jika cart kosong (misalnya akses langsung) redirect ke home
  useEffect(() => {
    if (cart.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  // Hitung total pembayaran
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-emerald-600 mb-4">
          Terimakasih sudah memesan 🙏
        </h1>
        <p className="text-gray-700 mb-6">
          Pesanan anda akan segera kami kirim ke alamat tujuan.
        </p>

        {/* Invoice */}
        <div className="border rounded-lg p-4 text-left mb-6">
          <h2 className="font-semibold mb-2">Invoice</h2>
          {cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between text-sm border-b py-1"
            >
              <span>{item.name}</span>
              <span>Rp {item.price.toLocaleString("id-ID")}</span>
            </div>
          ))}
          <div className="flex justify-between font-semibold mt-2">
            <span>Total</span>
            <span>Rp {total.toLocaleString("id-ID")}</span>
          </div>
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full bg-emerald-600 text-white py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          Kembali ke Home
        </button>
      </div>
    </div>
  );
}
