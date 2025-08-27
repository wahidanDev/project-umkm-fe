
import { Card, CardBody } from "@heroui/card";
import { FeaturedProducts } from "./featured-card";
import { CartButton } from "./card-button";

const categories = [
  {
    id: 1,
    name: "Sajadah & Karpet",
    image: "/sajadah.jpg",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    name: "Al-Quran & Buku",
    image: "/alquran.jpg",
    color: "from-blue-500 to-indigo-500",
  },
  {
    id: 3,
    name: "Tasbih & Dzikir",
    image: "/tasbih.jpg",
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    name: "Hijab & Mukena",
    image: "/hijab.jpg",
    color: "from-purple-500 to-pink-500",
  },
  {
    id: 5,
    name: "Parfum & Minyak Wangi",
    image: "/parfume.jpg",
    color: "from-rose-500 to-red-500",
  },
  {
    id: 6,
    name: "Peci & Kopiah",
    image: "/peci.jpg",
    color: "from-gray-600 to-gray-800",
  },
];

export function Categories() {
  return (
    <section className="py-20 relative overflow-hidden">
      <CartButton />
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-200/30 to-teal-200/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-200/30 to-purple-200/30 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
    
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Jelajahi Koleksi{" "}
            <span className="text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text">
              Perlengkapan Ibadah
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Pilih dari berbagai kategori perlengkapan ibadah berkualitas yang
            telah dipercaya ribuan muslimin dan muslimat
          </p>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Card
              key={category.id}
              isPressable
              shadow="lg"
              radius="lg"
              className="group border-0 bg-white/80 backdrop-blur-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-500 overflow-hidden"
            >
              <CardBody className="p-0 relative">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-bold text-lg mb-1 group-hover:text-emerald-300 transition-colors duration-300">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Hover overlay with additional info */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end"></div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
      <FeaturedProducts />
      
    </section>
  );
}
