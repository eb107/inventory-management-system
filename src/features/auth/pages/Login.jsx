import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

export default function Login() {
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await login(nome, senha);
      navigate("/inventory");
    } catch (err) {
      alert(err.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="text"
            placeholder="Usuário"
            onChange={(e) => setNome(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Senha"
            onChange={(e) => setSenha(e.target.value)}
          />
          <div className="flex justify-center text-blue-800"><Link to="/login/changepassword" className="hover:underline">Esqueceu a senha?</Link></div>
          <Button type="submit">Entrar</Button>
        </form>
      </div>
    </div>
  );
}
