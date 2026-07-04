import { Routes, Route } from "react-router-dom";
import Login from "../features/auth/pages/Login";
import MainLayout from "../shared/layout/MainLayout";
import PrivateRoute from "../features/auth/components/PrivateRoute";
import InventoryList from "../features/inventory/pages/InventoryList";
import ObsoleteInventoryList from "../features/inventory/pages/ObsoleteInventoryList";
import ProductCreate from "../features/product/pages/ProductCreate";
import ProductEdit from "../features/product/pages/ProductEdit";
import ProductsPage from "../features/product/pages/ProductsPage";
import ChangePassword from "../features/auth/pages/ChangePassword";

function Dashboard() {
  return <h2>Dashboard</h2>;
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/login/changepassword" element={<ChangePassword />} />

      <Route element={<PrivateRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<InventoryList />} />
          <Route path="/inventory/desuso" element={<ObsoleteInventoryList />} />
          <Route path="/product/create" element={<ProductCreate />} />
          <Route path="/product/edit/:id" element={<ProductEdit />} />
          <Route path="/inventory/products" element={<ProductsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
