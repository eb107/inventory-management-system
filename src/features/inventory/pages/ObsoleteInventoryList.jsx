import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";
import Button from "../../../shared/ui/Button";
import AddProductModal from "../../product/components/AddProductModal";
import {
  getInventory,
  deleteInventoryItem,
} from "../services/inventoryService";
import { exportInventoryToExcel } from "../../../shared/utils/exportToExcel";

export default function InventoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inventoryItems, setInventoryItems] = useState([]);

  async function loadInventory() {
    const data = await getInventory();
    setInventoryItems(data);
  }

  useEffect(() => {
    loadInventory();
  }, []);

  async function handleDelete(id) {
    await deleteInventoryItem(id);

    setInventoryItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="flex-col justify-between items-center mb-6">
      <div className="p-6 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Produtos em Desuso</h2>

        <div className="flex gap-3">
          <Button onClick={() => exportInventoryToExcel(inventoryItems)}>
            EXCEL
          </Button>

          <Button onClick={() => setIsModalOpen(true)}>
            Adicionar Produto
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <AddProductModal
          onClose={() => setIsModalOpen(false)}
          onAdded={loadInventory}
        />
      )}

      <InventoryTable
        products={inventoryItems}
        onDelete={handleDelete}
        onRefresh={loadInventory}
      />
    </div>
  );
}
