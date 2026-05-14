import Button from "../../../shared/ui/Button";
import { Link } from "react-router-dom";
import {
  deleteProduct,
  getProducts,
} from "../services/productService";
import { useState, useEffect } from "react";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);
  const totalPages = Math.max(Math.ceil(filteredProducts.length / itemsPerPage), 1);

  useEffect(() => {
    async function loadProducts() {
      const data = await getProducts();
      setProducts(data);
    }

    loadProducts();
  }, []);

  async function handleDelete(id) {
    try {
      await deleteProduct(id);

      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.log("Erro ao deletar:", error);
    }
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [search]);

  return (
    <div className="p-1">
      <h2 className="text-2xl font-bold text-gray-800">Produtos</h2>

      <div className="p-4 flex justify-between">
        <input
          type="search"
          className="border-b border-gray-300 focus:outline-none"
          placeholder="Buscar Item"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/product/create">
          <Button>Novo Item</Button>
        </Link>
      </div>

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
              <th className="text-left px-20 py-3 text-sm font-semibold text-gray-600">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(products) &&
              currentProducts.map((product) => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4 text-gray-800">{product.name}</td>
                  <td className="px-6 py-4 text-gray-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <Link to={`/product/edit/${product.id}`}>
                      <Button>Editar</Button>
                    </Link>

                    <Button onClick={() => handleDelete(product.id)}>
                      Excluir
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex justify-between items-center mt-1 p-2">
          <Button
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
      </div>
    </div>
  );
}
