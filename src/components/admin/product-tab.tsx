import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/table";

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
}

interface ProductTabProps {
  products: Product[];
  name: string;
  setName: (name: string) => void;
  price: number;
  setPrice: (price: number) => void;
  imageFile: File | null;
  setImageFile: (file: File | null) => void;
  addProduct: () => void;
  deleteProduct: (id: string) => void;
}

export default function ProductTab({
  products,
  name,
  setName,
  price,
  setPrice,
  imageFile,
  setImageFile,
  addProduct,
  deleteProduct,
}: ProductTabProps) {
  return (
    <div>
      <div className="flex gap-4 items-end flex-wrap mb-4">
        <Input label="Nama Produk" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="number" label="Harga" value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <Button onPress={addProduct} color="success">Tambah</Button>
      </div>

      <Table aria-label="Daftar Produk">
        <TableHeader>
          <TableColumn>Gambar</TableColumn>
          <TableColumn>Nama</TableColumn>
          <TableColumn>Harga</TableColumn>
          <TableColumn>Aksi</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow key={p._id}>
              <TableCell>{p.image ? <img src={p.image} alt={p.name} className="w-16 h-16 object-cover mx-auto" /> : "—"}</TableCell>
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
