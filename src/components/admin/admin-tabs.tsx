import { Tabs, Tab } from "@heroui/tabs";
import ProductForm from "./product-form";
import ProductTable from "./product-table";
import SalesChart from "./sales-chart"; 

export default function AdminTabs({ products, refresh }: { products: any[]; refresh: () => void }) {
  return (
    <Tabs aria-label="Dashboard Admin" color="primary" variant="underlined">
      <Tab key="add" title="Tambah Produk">
        <ProductForm onProductAdded={refresh} />
        <ProductTable products={products} refresh={refresh} />
      </Tab>

      <Tab key="sales" title="Penjualan">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart />
        </div>
      </Tab>

      <Tab key="top" title="Top Produk">
        <p>🏆 Top 5 produk terlaris tampil di sini...</p>
      </Tab>
    </Tabs>
  );
}
