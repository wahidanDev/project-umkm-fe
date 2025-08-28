import { Button } from "@heroui/button";
import { ProductCard } from "./product-card";
import axios from "axios";
import { useEffect, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";


type Category = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: Category;
  isNew?: boolean;
  discount?: number;
};


export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("Gagal fetch products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-full shadow-sm mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
            <span className="text-emerald-700 text-sm font-medium">
              Produk Terpilih
            </span>
          </div>

          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Koleksi{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
              Produk Unggulan
            </span>
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Produk-produk pilihan berkualitas tinggi dengan harga terjangkau,
            dipercaya ribuan pelanggan di seluruh Indonesia
          </p>
        </div>

        {/* Products grid */}
        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product._id} {...product} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">
            Belum ada produk tersedia.
          </p>
        )}

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-30" />
            <Button
              size="lg"
              className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl font-semibold text-lg"
              endContent={<ArrowRight className="w-5 h-5" />}
            >
              🛍️ Lihat Semua Produk
            </Button>
          </div>
          <p className="text-gray-500 mt-4 text-sm">
            Temukan lebih dari 500+ produk perlengkapan ibadah berkualitas
          </p>
        </div>
      </div>
    </section>
  );
}
