import { useState } from "react";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import api from "@/context/api/axios";

export default function ProductForm({ onProductAdded }: { onProductAdded: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageFile, setImageFile] = useState<File | null>(null);

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
    onProductAdded();
  };

  return (
    <div className="flex gap-4 items-end flex-wrap">
      <Input label="Nama Produk" value={name} onChange={(e) => setName(e.target.value)} />
      <Input type="number" label="Harga" value={price.toString()} onChange={(e) => setPrice(Number(e.target.value))} />
      <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
      <Button onPress={addProduct} color="success">
        Tambah
      </Button>
    </div>
  );
}
