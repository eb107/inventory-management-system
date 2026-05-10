const API_URL = "http://localhost/api/inventory.php";

// GET - listar inventory
export async function getInventory() {
  const response = await fetch(API_URL, {
    method: "GET",
    credentials: "include",
  });

  const data = await response.json();

  console.log("STATUS:", response.status);
  console.log("RESPONSE:", data);

  if (!response.ok) {
    throw new Error(data.message || "Erro ao buscar inventory");
  }

  return data;
}

// POST - adicionar item
export async function createInventoryItem(data) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar item");
  }

  return await response.json();
}

// PUT - atualizar quantidade
export async function updateInventoryItem(data) {
  const response = await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao atualizar item");
  }

  return await response.json();
}

// DELETE - remover item
export async function deleteInventoryItem(id) {
  const response = await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id }),
  });

  if (!response.ok) {
    throw new Error("Erro ao deletar item");
  }

  return await response.json();
}