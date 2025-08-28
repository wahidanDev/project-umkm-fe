import { Star, ShoppingCart, Heart, Eye } from "lucide-react";
import { Button } from "@heroui/button";
import { Badge } from "@heroui/badge";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  image: string;
  category: { _id: string; name: string }; 
  isNew?: boolean;
  discount?: number;
}

export function ProductCard({
  _id,
  name,
  price,
  originalPrice,
  rating,
  image,
  category,
  isNew = false,
  discount,
}: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <Card
      isHoverable
      shadow="sm"
      className="group transition-all duration-500 overflow-hidden border-0 bg-white/80 backdrop-blur-sm hover:-translate-y-2"
    >
      {/* Gambar + overlay + action */}
      <div className="relative aspect-square overflow-hidden">
        <img
          alt={name}
          src={image}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <Badge color="success" variant="solid" className="shadow-lg">
              ✨ Baru
            </Badge>
          )}
          {discount && (
            <Badge
              color="danger"
              variant="shadow"
              className="shadow-lg animate-pulse"
            >
              -{discount}% OFF
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-white/90 backdrop-blur-sm text-gray-700 hover:text-emerald-600 shadow-lg rounded-full"
          >
            <Heart className="w-4 h-4" />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant="flat"
            className="bg-white/90 backdrop-blur-sm text-gray-700 hover:text-emerald-600 shadow-lg rounded-full"
          >
            <Eye className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick add to cart */}
        <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
          <Button
            fullWidth
            onPress={() =>
              addToCart({ _id, name, price, image })
            }
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg rounded-xl"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Tambah ke Keranjang
          </Button>
        </div>
      </div>

      {/* Konten card */}
      <CardBody className="p-6 space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <Badge
              variant="flat"
              color="success"
              className="text-xs font-medium"
            >
              {category?.name}
            </Badge>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm text-gray-600 font-medium">
                {rating}
              </span>
              <span className="text-xs text-gray-400">(120)</span>
            </div>
          </div>
          <h3 className="text-gray-900 group-hover:text-emerald-600 transition-colors duration-300 font-semibold leading-snug">
            {name}
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold text-gray-900">
              Rp {price.toLocaleString("id-ID")}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                Rp {originalPrice.toLocaleString("id-ID")}
              </span>
            )}
          </div>
          <Button
            size="sm"
            color="success"
            className="text-white rounded-xl shadow-md hover:shadow-lg"
            onClick={() =>
              addToCart({ _id, name, price, image })
            }
          >
            Beli
          </Button>
        </div>
      </CardBody>

      <CardFooter className="flex items-center justify-between pt-2 border-t border-gray-100 text-xs text-gray-500">
        <div className="flex items-center">🚚 Gratis Ongkir</div>
        <div className="flex items-center">✅ Garansi Original</div>
      </CardFooter>
    </Card>
  );
}
