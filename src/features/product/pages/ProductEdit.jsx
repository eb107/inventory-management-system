import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts, editProduct } from "../services/productService";
import AddProduct from "./AddProduct";
export default function ProductEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);
        const products = await getProducts();
        const found = products.find((p) => p.id === id);

        if (!found) {
          setError("Produto não encontrado!");
        } else {
          setProduct(found);
        }
      } catch (err) {
        setError("Erro ao carregar produto!");
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  async function handleEdit(data) {
    try {
      setSaving(true);
      await editProduct(id, data);
      navigate("/inventory/products");
    } catch (err) {
      setError("Erro ao atualizar o produto!");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Carregando produto...</p>;
  if (!product) return <p>Produto não encontrado</p>;

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Editar Produto
      </h2>

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full max-w-md">
          {error}
        </p>
      )}

      {saving && (
        <p className="bg-blue-100 text-blue-700 px-4 py-2 rounded mb-4 w-full max-w-md">
          Salvando alterações...
        </p>
      )}

      <AddProduct initialData={product} onSubmit={handleEdit} />
    </div>
  );
}
