import { Outlet } from "react-router-dom";
import { useAuth } from "../../features/auth/context/AuthContext";
import Header from "../ui/Header";
import Sidebar from "./SideBar";

export default function MainLayout() {
  return (
    <div className="flex flex-col">
      <Header />

      <div className="flex flex-1">
        <Sidebar />

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
