import { useNavigate } from "react-router-dom";
import { addProduct } from "../../product/services/productService";
import InventoryForm from "../../inventory/components/InventoryForm";
import { useState } from "react";

export default function ProductCreate() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleCreate(data) {
    try {
      setLoading(true);
      await addProduct(data);
      navigate("/inventory/products");
    } catch (err) {
      setError("Erro ao criar produto!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-15 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Criar Produto</h2>

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full max-w-md">
          {error}
        </p>
      )}
      {loading && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full max-w-md">
          Salvando...
        </p>
      )}

      <InventoryForm onSubmit={handleCreate} mode="create" />
    </div>
  );
}
