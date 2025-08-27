import { Card, CardHeader, CardBody } from "@heroui/card";
import { DollarSign, ShoppingCart, Package, TrendingUp, TrendingDown } from "lucide-react";

interface Stats {
  totalSales: number;
  totalOrders: number;
  productsSold: number;
}

export default function StatsCards({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* Total Penjualan */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex items-center justify-between pb-2">
          <h4 className="text-sm font-medium text-gray-500">Total Penjualan</h4>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            Rp {stats.totalSales.toLocaleString("id-ID")}
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
            <span className="text-emerald-600 font-medium">+14.2%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </CardBody>
      </Card>

      {/* Total Pesanan */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex items-center justify-between pb-2">
          <h4 className="text-sm font-medium text-gray-500">Total Pesanan</h4>
          <ShoppingCart className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.totalOrders.toLocaleString("id-ID")}
          </div>
          <div className="flex items-center text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-600 mr-1" />
            <span className="text-emerald-600 font-medium">+8.5%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </CardBody>
      </Card>

      {/* Produk Terjual */}
      <Card shadow="sm" className="p-4">
        <CardHeader className="flex items-center justify-between pb-2">
          <h4 className="text-sm font-medium text-gray-500">Produk Terjual</h4>
          <Package className="h-4 w-4 text-gray-400" />
        </CardHeader>
        <CardBody>
          <div className="text-2xl font-bold text-gray-800 mb-1">
            {stats.productsSold.toLocaleString("id-ID")}
          </div>
          <div className="flex items-center text-sm">
            <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
            <span className="text-red-600 font-medium">-2.1%</span>
            <span className="text-gray-500 ml-1">dari bulan lalu</span>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
