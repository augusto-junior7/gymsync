import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Registrar() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerError, setRegisterError] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("gymsync_token");
      import("@/lib/auth").then(({ isTokenValid }) => {
        if (isTokenValid(token)) navigate("/perfil");
      });
    } catch {
      // ignore
    }
  }, [navigate]);

  const handleRegister = async (e) => {
    e?.preventDefault?.();

    if (!navigator.onLine) {
      setRegisterError("Sem conexão. Verifique sua internet.");
      return;
    }

    setLoading(true);
    setRegisterError("");

    try {
      await axios.post(
        "http://localhost:3000/usuarios/registrar",
        { nome, email, senha },
        { timeout: 5000 },
      );

      // Após registrar com sucesso, redireciona para a tela de login
      navigate("/login");
    } catch (error) {
      if (error.response) {
        // Exibe a mensagem de erro que vem da sua API
        setRegisterError(error.response.data?.mensagem || "Erro no servidor");
      } else if (error.code === "ECONNABORTED") {
        setRegisterError("Tempo de resposta esgotado. Tente novamente.");
      } else if (error.request) {
        setRegisterError("Servidor indisponível. Tente novamente mais tarde.");
      } else {
        setRegisterError("Erro na requisição. Verifique sua conexão.");
      }
      console.error("Falha no registro:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-background">
      {/* Efeitos de iluminação de fundo */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#cafd00]/5 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#ece856]/5 rounded-full blur-[120px] pointer-events-none"></div>

      <section className="w-full max-w-md flex flex-col space-y-12 relative z-10">
        <header className="flex flex-col items-center space-y-2">
          <h1 className="font-headline font-black italic text-4xl tracking-tighter text-[#cafd00]">
            GYMSYNC
          </h1>
          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            Crie sua conta e comece a sincronizar.
          </p>
        </header>

        <form className="space-y-8" onSubmit={handleRegister}>
          <div className="space-y-6">
            {/* Campo Nome */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="nome"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Nome
              </Label>
              <Input
                id="nome"
                type="text"
                placeholder="Seu nome completo"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>

            {/* Campo E-mail */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="email"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                E-mail
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>

            {/* Campo Senha */}
            <div className="flex flex-col space-y-2">
              <Label
                htmlFor="senha"
                className="text-xs font-bold text-muted-foreground tracking-widest px-1 uppercase"
              >
                Senha
              </Label>
              <Input
                id="senha"
                type="password"
                placeholder="Mínimo de 8 caracteres"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                minLength={8}
                className="h-14 bg-accent/50 border-none rounded-xl px-4 text-foreground focus-visible:ring-2 focus-visible:ring-[#cafd00]"
              />
            </div>
          </div>

          {registerError && (
            <p className="text-sm text-red-500 text-center">{registerError}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className={`w-full h-16 bg-gradient-to-br from-[#cafd00] to-[#beee00] hover:from-[#beee00] hover:to-[#cafd00] text-[#4a5e00] font-headline font-black text-lg tracking-widest uppercase rounded-xl shadow-[0_8px_32px_rgba(202,253,0,0.15)] transition-transform active:scale-95 ${
              loading ? "opacity-70 pointer-events-none" : ""
            }`}
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <footer className="pt-4 text-center">
          <p className="text-muted-foreground text-sm font-medium">
            Já possui uma conta?
            <Link
              to="/login"
              className="text-[#cafd00] font-bold hover:underline underline-offset-4 ml-2"
            >
              Fazer Login
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}
