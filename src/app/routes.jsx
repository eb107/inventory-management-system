import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import MainLayout from "../shared/layout/MainLayout";
import PrivateRoute from "../features/auth/components/PrivateRoute";
import InventoryList from "../features/inventory/pages/InventoryList";
import ProductCreate from "../features/product/pages/ProductCreate";
import ProductEdit from "../features/product/pages/ProductEdit";
import Products from "../features/product/pages/Products";

function Dashboard() {
  return <h2>Dashboard</h2>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/inventory/products" element={<Products />} />
        </Route>
      </Route>
    </Routes>
  );
}
