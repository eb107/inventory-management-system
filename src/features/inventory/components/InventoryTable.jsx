import Button from "../../../shared/ui/Button";
import EditProductModal from "../../product/components/EditProductModal";
import { useState } from "react";

export default function InventoryTable({ products, onDelete, onRefresh }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [search, setSearch] = useState("");
  const filteredItems = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredItems.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  function CategoryBadge({ category }) {
    const styles = {
      Hardware: "bg-blue-100 text-blue-700",
      Periférico: "bg-purple-100 text-purple-700",
      Rede: "bg-green-100 text-green-700",
    };

    const style = styles[category] || "bg-gray-100 text-gray-600";

    return (
      <span className={`${style} px-3 py-1 rounded-full text-xs font-semibold`}>
        {category}
      </span>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <table className="min-w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
              Nome
            </th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
              Categoria
            </th>
            <th className="text-left px-6 py-3 text-sm font-semibold text-gray-600">
              Quantidade
            </th>
            <th className="text-left px-20 py-3 text-sm font-semibold text-gray-600">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(products) && products.length > 0 ? (
            currentItems.map((item) => (
              <tr key={item.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-4 text-gray-800 font-semibold">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <CategoryBadge category={item.category} />
                </td>
                <td className="px-6 py-4 text-gray-600 font-semibold">
                  {item.quantity}
                </td>
                <td className="px-6 py-4 flex gap-2">
                  <Button
                    variant="secondary"
                    onClick={() => setSelectedProduct(item)}
                  >
                    Editar
                  </Button>

                  <Button variant="danger" onClick={() => onDelete(item.id)}>
                    Excluir
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="text-center text-gray-500">
              <td colSpan="3" className="py-5">
                Nenhum Item no Inventário
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-1 p-2">
        <Button
          variant="secondary"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>

        <span className="text-gray-600">
          Página {currentPage} de {totalPages}
        </span>

        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Próxima
        </Button>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSaved={() => {
            setSelectedProduct(null);
            onRefresh?.();
          }}
        />
      )}
    </div>
  );
}
