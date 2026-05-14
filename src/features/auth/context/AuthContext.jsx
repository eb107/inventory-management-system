import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  async function login(nome, senha) {
    try {
      const response = await fetch("https://epmdevelopment.com.br/ims-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ nome, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro no login");
      }

      // salva usuário
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      return data.user;
    } catch (error) {
      console.error("Erro no login:", error.message);
      throw error;
    }
  }

  async function logout() {
    await fetch("https://epmdevelopment.com.br/ims-api/logout.php", {
      method: "POST",
      credentials: "include",
    });

    localStorage.removeItem("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
