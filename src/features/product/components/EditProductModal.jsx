import { useState, useEffect } from "react";
import Button from "../../../shared/ui/Button";
import { updateInventoryItem } from "../../inventory/services/inventoryService";

export default function EditProductModal({ product, onClose, onSaved }) {
  const [quantity, setQuantity] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // Inicia com a quantidade atual do produto
  useEffect(() => {
    if (product) {
      setQuantity(product.quantity ?? 0);
    }
  }, [product]);

  async function handleEdit() {
    try {
      setSaving(true);
      setError(null);
      await updateInventoryItem({ id: product.id, quantity });
      onSaved?.();
      onClose();
    } catch (err) {
      setError("Erro ao editar item!");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded w-full max-w-md mx-4">
        <h2 className="text-lg font-bold mb-4">Editar Quantidade</h2>
        <div className="flex justify-between items-center">
          <p className="text-gray-700 mb-3">{product?.name}</p>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <div className="flex items-center gap-3 bg-gray-100 rounded px-4 py-2 w-fit mb-6">
            <button
              className="text-xl font-bold px-2 hover:text-blue-600 hover:cursor-pointer"
              onClick={() => setQuantity((q) => Math.max(0, q - 1))}
            >
              -
            </button>
            <input
              type="number"
              min="0"
              className="w-10 text-center border-none bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
            />
            <button
              className="text-xl font-bold px-2 hover:text-blue-600 hover:cursor-pointer"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button variant="secondary" onClick={onClose} disabled={saving}>
            Fechar
          </Button>
          <Button onClick={handleEdit} disabled={saving}>
            {saving ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
