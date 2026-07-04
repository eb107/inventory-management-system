import { useState } from "react";
import Button from "../../../shared/ui/Button";
import Input from "../../../shared/ui/Input";

export default function ChangePassword() {
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const senhasDiferentes = senha.length > 0 && confirmarSenha.length > 0 && senha !== confirmarSenha;
    const podeSalvar = senha.length > 0 && confirmarSenha > 0 && senha == confirmarSenha;

    function handleSubmit(e) {
        e.preventDefault()
        if (!podeSalvar) return;
    }




    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm">
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <Input type="password" placeholder="Insira uma nova senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <div className="flex flex-col gap-2">
                        <Input type="password" placeholder="Confirme a nova senha" value={confirmarSenha} onChange={(e) => setConfirmarSenha(e.target.value)} />
                        {senhasDiferentes && (<span className="text-sm text-red-500">As senhas não coincidem</span>)}
                    </div>


                    <Button>Salvar</Button>
                </form>
            </div>
        </div>
    )
}