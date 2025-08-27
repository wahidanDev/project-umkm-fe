import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import LoginPage from "@/pages/login";
import ProdukPage from "@/pages/product";
import AdminPage from "@/pages/admin";
import ProtectedRoute from "./components/protectedRoute";
import CheckoutSuccess from "./components/checkout-success";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<ProdukPage />} path="/produk" />
      <Route element={<AboutPage />} path="/about" />
      {/* Admin hanya bisa diakses jika login & role=admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="admin">
            <AdminPage />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/checkout-success" element={<CheckoutSuccess />} />
    </Routes>
  );
}

export default App;
