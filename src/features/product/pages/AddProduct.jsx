import { useState, useEffect } from "react";
import Input from "../../../shared/ui/Input";
import Button from "../../../shared/ui/Button";

export default function AddProduct({ initialData, onSubmit, mode }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setCategory(initialData.category || "");
    }
  }, [initialData]);

  function handleSubmit(e) {
    e.preventDefault();

    onSubmit({
      name,
      category,
    });
  }

  return (
    <div className="p-4 sm:p-6 flex justify-center">
      <form
        className="w-full max-w-md bg-white shadow-sm sm:shadow-md rounded-xl p-5 sm:p-8 flex flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nome do produto"
        />

        <div className="flex flex-col gap-3">
          <label className="text-sm text-gray-600">Categoria:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione uma categoria</option>
            <option value="Hardware">Hardware</option>
            <option value="Periférico">Periférico</option>
            <option value="Rede">Rede</option>
          </select>
        </div>

        <Button type="submit">Salvar</Button>
      </form>
    </div>
  );
}
