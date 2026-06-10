import { Link } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {
  const [inventoryOpen, setInventoryOpen] = useState(false);

  return (
    <aside className="w-64 bg-gray-200 text-gray-700 p-7 rounded-xl m-2">
      <h2 className="text-lg font-bold mb-6">Menu</h2>

      <nav className="flex flex-col gap-3">
        <div className="flex flex-col">
          <button
            onClick={() => setInventoryOpen((prev) => !prev)}
            className="flex justify-between items-center px-3 py-2 rounded font-semibold hover:bg-gray-300 transition cursor-pointer"
          >
            Inventário
            <span>{inventoryOpen ? "▲" : "▼"}</span>
          </button>

          {inventoryOpen && (
            <div className="flex flex-col mt-1 ml-3 gap-1 pl-3">
              <Link
                to="/inventory"
                className="text-sm font-semibold px-3 py-2 hover:bg-gray-300 transition cursor-pointer"
              >
                Em uso
              </Link>
              <Link
                to="/inventory/desuso"
                className="text-sm font-semibold px-3 py-2 hover:bg-gray-300 transition cursor-pointer"
              >
                Em Desuso
              </Link>
            </div>
          )}
        </div>

        <Link
          to="/inventory/products"
          className="bg-gray-200 px-3 py-2 rounded font-semibold hover:bg-gray-300 transition"
        >
          Produtos
        </Link>
      </nav>
    </aside>
  );
}
