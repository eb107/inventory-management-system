import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-200 text-gray-700 p-7 rounded-xl m-2">
      <h2 className="text-lg font-bold mb-6">Menu</h2>

      <nav className="flex flex-col gap-3">
        <Link to="/inventory" className="bg-gray-200 px-3 py-2 rounded font-semibold hover:bg-gray-300 transition">Inventário</Link>
        <Link to="/inventory/products" className="bg-gray-200 px-3 py-2 rounded font-semibold hover:bg-gray-300 transition">Produtos</Link>
      </nav>
    </aside>
  );
}
