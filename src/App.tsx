import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import ProdukPage from "@/pages/product";
import AdminPage from "@/pages/admin";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProdukPage />} path="/produk" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<AdminPage />} path="/admin" />
    </Routes>
  );
}

export default App;
