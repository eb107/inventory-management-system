import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import { createInventoryItem } from "../../inventory/services/inventoryService";
import Button from "../../../shared/ui/Button";

export default function AddProductModal({ onClose, onAdded }) {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    async function load() {
      const data = await getProducts();
      setProducts(data);
    }
    load();
  }, []);

  function handleChange(id, value) {
    setQuantities((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  async function handleAdd(product) {
    const quantity = quantities[product.id] || 0;

    if (quantity <= 0) {
      alert("Informe uma quantidade válida");
      return;
    }

    await createInventoryItem({
      product_id: product.id,
      quantity,
    });

    onAdded();
    onClose();
  }

  async function handleAddAll(product) {
    const items = Object.entries(quantities);

    for (const [productId, quantity] of items) {
      if (quantity > 0) {
        await createInventoryItem({
          product_id: Number(productId),
          quantity,
        });
      }
    }

    onAdded();
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
      <div className="bg-white p-6 rounded w-full max-w-md mx-4">
        <h2 className="text-lg font-bold mb-4">Adicionar Produto</h2>
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2 p-2 sm:p-0 border rounded sm:border-none"
          >
            <span className="w-[100%] font-medium bg-gray-100">
              {product.name}
            </span>
            <div className="flex items-center bg-gray-200 gap-2">
              <button
                className="px-2 py-1 font-bold hover:cursor-pointer hover:text-blue-600"
                onClick={() =>
                  handleChange(
                    product.id,
                    Math.max(0, quantities[product.id] || 0) - 1,
                  )
                }
              >
                -
              </button>
              <input
                type="number"
                min="0"
                className="w-10 text-center border-none bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={quantities[product.id] || ""}
                onChange={(e) =>
                  handleChange(product.id, Number(e.target.value))
                }
              />
              <button
                className="px-2 py-1 font-bold hover:cursor-pointer hover:text-blue-600"
                onClick={() =>
                  handleChange(product.id, (quantities[product.id] || 0) + 1)
                }
              >
                +
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between">
          <Button variant="secondary" onClick={onClose}>
            Fechar
          </Button>
          <Button onClick={handleAddAll}>Adicionar</Button>{" "}
        </div>
      </div>
    </div>
  );
}
