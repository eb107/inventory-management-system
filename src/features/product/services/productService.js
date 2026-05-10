const API_URL = "http://localhost/api/products.php";

export async function getProducts() {
  const response = await fetch(API_URL);
  return response.json();
}

export async function addProduct(product) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
}

export async function deleteProduct(id) {
  await fetch(API_URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });
}

export async function editProduct(id, product) {
  await fetch(API_URL, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id, ...product }),
  });
}
