import { useAuth } from "../../features/auth/context/AuthContext";
import Button from "./Button";
import { Link } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-4">
      <Link to="/inventory">
        <h1 className="text-sm sm:text-xl font-semibold text-gray-800 bg-gray-200 rounded p-2 sm:p-4 border-2 border-gray-300">
          <span className="hidden sm:inline">Inventory System</span>
          <span className="sm:hidden">IS</span>
        </h1>
      </Link>

      <div className="flex items-center gap-2 sm:gap-4">
        {user && <span className="hiddeen sm:block text-gray-600 text-sm truncate max-w-[180px]">{user.nome}</span>}

        <Button onClick={logout}>Logout</Button>
      </div>
    </header>
  );
}
