// import { ArrowRight, Sparkles } from "lucide-react";
// import { Button } from "@heroui/button";
// import { ProductCard } from "./product-card";

// const featuredProducts = [
//   {
//     id: "1",
//     name: "Sajadah Premium",
//     price: 150000,
//     originalPrice: 200000,
//     rating: 4.8,
//     image: "/sajadah.jpg",
//     category: "Sajadah",
//     isNew: true,
//     discount: 25,
//   },
//   {
//     id: "2",
//     name: "Al-Quran Terjemahan Deluxe dengan Tafsir",
//     price: 85000,
//     originalPrice: 120000,
//     rating: 4.9,
//     image: "/alquran.jpg",
//     category: "Al-Quran",
//     discount: 29,
//   },
//   {
//     id: "3",
//     name: "Tasbih Kayu Kokka 99 Butir Premium",
//     price: 45000,
//     rating: 4.7,
//     image: "/tasbih.jpg",
//     category: "Tasbih",
//   },
//   {
//     id: "4",
//     name: "Hijab Voal Premium Motif Elegan",
//     price: 35000,
//     originalPrice: 50000,
//     rating: 4.6,
//     image: "/hijab.jpg",
//     category: "Hijab",
//     discount: 30,
//   },
//   {
//     id: "5",
//     name: "Mukena Katun Jepang Bordir Eksklusif",
//     price: 125000,
//     originalPrice: 175000,
//     rating: 4.8,
//     image: "/mukena.jpg",
//     category: "Mukena",
//     isNew: true,
//     discount: 29,
//   },
//   {
//     id: "6",
//     name: "Peci Songket Sumatera Motif Tradisional",
//     price: 65000,
//     rating: 4.5,
//     image: "/peci.jpg",
//     category: "Peci",
//   },
//   {
//     id: "6",
//     name: "Gamis Culture",
//     price: 115000,
//     rating: 4.8,
//     image: "/gamis.jpg",
//     category: "gamis",
//   },
// ];

// export function FeaturedProducts() {
//   return (
//     <section className="py-20 bg-white relative overflow-hidden">
//       {/* Background decorations */}
//       <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl" />
//       <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tr from-blue-200/20 to-purple-200/20 rounded-full blur-3xl" />

//       <div className="container mx-auto px-4 relative z-10">
//         {/* Section header */}
//         <div className="text-center mb-16">
//           <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/50 rounded-full shadow-sm mb-6">
//             <Sparkles className="w-4 h-4 text-emerald-600 mr-2" />
//             <span className="text-emerald-700 text-sm font-medium">
//               Produk Terpilih
//             </span>
//           </div>

//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
//             Koleksi{" "}
//             <span className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
//               Produk Unggulan
//             </span>
//           </h2>

//           <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//             Produk-produk pilihan berkualitas tinggi dengan harga terjangkau,
//             dipercaya ribuan pelanggan di seluruh Indonesia
//           </p>
//         </div>

//         {/* Products grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {featuredProducts.map((product) => (
//             <ProductCard key={product.id} {...product} />
//           ))}
//         </div>

//         {/* CTA Section */}
//         <div className="text-center mt-20">
//           <div className="relative inline-block">
//             <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl blur-lg opacity-30" />
//             <Button
//               size="lg"
//               className="relative bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-10 py-6 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-2xl font-semibold text-lg"
//               endContent={<ArrowRight className="w-5 h-5" />}
//             >
//               🛍️ Lihat Semua Produk
//             </Button>
//           </div>
//           <p className="text-gray-500 mt-4 text-sm">
//             Temukan lebih dari 500+ produk perlengkapan ibadah berkualitas
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }



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
  category: Category; // bukan string
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
