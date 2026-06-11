import { useEffect, useState } from "react";
import InventoryTable from "../components/InventoryTable";
import Button from "../../../shared/ui/Button";
import AddProductModal from "../../product/components/AddProductModal";
import {
  getObsoleteInventory,
  deleteObsoleteInventoryItem,
} from "../services/ObsoleteInventoryService";
import { exportObsoleteInventoryToExcel } from "../../../shared/utils/exportToExcel";

export default function InventoryList() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ObsoleteInventoryItems, setObsoleteInventoryItems] = useState([]);

  async function loadObsoleteInventory() {
    const data = await getObsoleteInventory();
    setObsoleteInventoryItems(data);
  }

  useEffect(() => {
    loadObsoleteInventory();
  }, []);

  async function handleDelete(id) {
    await deleteObsoleteInventoryItem(id);

    setObsoleteInventoryItems((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <div className="flex-col justify-between items-center mb-6">
      <div className="p-6 flex justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Produtos em Desuso</h2>

        <div className="flex gap-3">
          <Button onClick={() => exportObsoleteInventoryToExcel(ObsoleteInventoryItems)}>
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
          onAdded={loadObsoleteInventory}
        />
      )}

      <InventoryTable
        products={ObsoleteInventoryItems}
        onDelete={handleDelete}
        onRefresh={loadObsoleteInventory}
      />
    </div>
  );
}
