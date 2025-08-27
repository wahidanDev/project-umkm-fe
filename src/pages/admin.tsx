import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import {
  DollarSign,
  ShoppingCart,
  Package,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Tabs, Tab } from "@heroui/tabs";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useAuth } from "@/context/AuthContext";
import api from "@/context/api/axios";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category?: { name: string };
}

export default function AdminPage() {
  const { user, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    productsSold: 0,
    salesGrowth: 0,
    ordersGrowth: 0,
    productsGrowth: 0,
  });

  useEffect(() => {
    fetchProducts();
    fetchStats();
  }, []);

  const fetchProducts = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  const fetchStats = async () => {
    const res = await api.get("/stats/monthly"); // backend harus siapkan API ini
    setStats(res.data);
  };

  const addProduct = async () => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    if (imageFile) formData.append("image", imageFile);

    await api.post("/products", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setName("");
    setPrice(0);
    setImageFile(null);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await api.delete(`/products/${id}`);
    fetchProducts();
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-6xl w-full text-center justify-center">
        <div className="p-8 space-y-6">
          {/* Header admin */}
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">📊 Dashboard Admin</h1>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">
                👋 {user?.username || "Admin"}
              </span>
              <Button onPress={logout} color="danger" variant="flat">
                Logout
              </Button>
            </div>
          </div>

          {/* Statistik Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Total Penjualan */}
            <Card shadow="sm" className="p-4">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h4 className="text-sm font-medium text-gray-500">
                  Total Penjualan
                </h4>
                <DollarSign className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  Rp 513.2M
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
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h4 className="text-sm font-medium text-gray-500">
                  Total Pesanan
                </h4>
                <ShoppingCart className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  1,847
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
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <h4 className="text-sm font-medium text-gray-500">
                  Produk Terjual
                </h4>
                <Package className="h-4 w-4 text-gray-400" />
              </CardHeader>
              <CardBody>
                <div className="text-2xl font-bold text-gray-800 mb-1">
                  3,264
                </div>
                <div className="flex items-center text-sm">
                  <TrendingDown className="w-4 h-4 text-red-600 mr-1" />
                  <span className="text-red-600 font-medium">-2.1%</span>
                  <span className="text-gray-500 ml-1">dari bulan lalu</span>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Tabs */}
          <Tabs
            aria-label="Dashboard Admin"
            color="primary"
            variant="underlined"
          >
            <Tab key="add" title="Tambah Produk">
              <div className="flex gap-4 items-end flex-wrap">
                <Input
                  label="Nama Produk"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  type="number"
                  label="Harga"
                  value={price.toString()}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                />
                <Button onPress={addProduct} color="success">
                  Tambah
                </Button>
              </div>

              {/* Table Produk */}
              <Table aria-label="Daftar Produk" className="mt-6">
                <TableHeader>
                  <TableColumn>Gambar</TableColumn>
                  <TableColumn>Nama</TableColumn>
                  <TableColumn>Harga</TableColumn>
                  <TableColumn>Aksi</TableColumn>
                </TableHeader>
                <TableBody>
                  {products.map((p) => (
                    <TableRow key={p._id}>
                      <TableCell>
                        {p.image ? (
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-16 h-16 object-cover mx-auto"
                          />
                        ) : (
                          "—"
                        )}
                      </TableCell>
                      <TableCell>{p.name}</TableCell>
                      <TableCell>
                        Rp {p.price.toLocaleString("id-ID")}
                      </TableCell>
                      <TableCell>
                        <Button
                          color="danger"
                          size="sm"
                          onPress={() => deleteProduct(p._id)}
                        >
                          Hapus
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Tab>

            <Tab key="sales" title="Penjualan">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card shadow="sm" className="p-4">
                  <CardHeader>
                    <h3 className="text-lg font-semibold">
                      Trend Penjualan Bulanan
                    </h3>
                  </CardHeader>
                  <CardBody>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart
                        data={[
                          { month: "Jan", penjualan: 1200000 },
                          { month: "Feb", penjualan: 1500000 },
                          { month: "Mar", penjualan: 1100000 },
                          { month: "Apr", penjualan: 1800000 },
                          { month: "Mei", penjualan: 2000000 },
                          { month: "Jun", penjualan: 1700000 },
                          { month: "Jul", penjualan: 2100000 },
                          { month: "Agu", penjualan: 1900000 },
                          { month: "Sep", penjualan: 2200000 },
                          { month: "Okt", penjualan: 2400000 },
                          { month: "Nov", penjualan: 2300000 },
                          { month: "Des", penjualan: 2500000 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip
                          formatter={(value) =>
                            `Rp ${(value as number).toLocaleString("id-ID")}`
                          }
                        />
                        <Area
                          type="monotone"
                          dataKey="penjualan"
                          stroke="#10b981"
                          fill="#10b981"
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </CardBody>
                </Card>
              </div>
            </Tab>

            

            <Tab key="top" title="Top Produk">
              <p>
                🏆 Top 5 produk terlaris tampil di sini dengan jumlah terjual &
                total penjualan
              </p>
            </Tab>
          </Tabs>
        </div>
      </div>
    </section>
  );
}