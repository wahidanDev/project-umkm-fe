import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

interface Product {
  _id: string;
  name: string;
  price: number;
  category?: { name: string };
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  const addProduct = async () => {
    await axios.post("http://localhost:5000/api/products", { name, price });
    setName("");
    setPrice(0);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">📦 Kelola Produk</h1>
      <div className="flex gap-4">
        <Input label="Nama Produk" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" label="Harga" value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <Button onPress={addProduct} color="success">Tambah</Button>
      </div>

      <Table aria-label="Daftar Produk">
        <TableHeader>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>Rp {p.price.toLocaleString("id-ID")}</TableCell>
              <TableCell>
                <Button color="danger" size="sm" onPress={() => deleteProduct(p._id)}>Hapus</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
