import { useState } from "react";
import { BaseInput } from "../components/BaseInput";
import usePost from "../hooks/usePost";
import { useAuthStore } from "../stores/authStore";

interface IUserLogin {
  email: string;
  password: string;
}

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { registerData, responseToken } = usePost();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: IUserLogin = {
      email,
      password,
    };

    try {
      registerData<IUserLogin>({ url: "login", data: userData });
      useAuthStore.getState().login({ email, token: responseToken });
      // navigate('/dashboard') // Exemplo de navegação após login bem-sucedido
    } catch (error) {
      if (error instanceof Error) {
        console.error("Erro ao fazer login:", error.message);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <BaseInput
          value={email}
          type="email"
          placeholder="Insira seu endereço de Email"
          onChange={setEmail}
          label="Email:"
        />

        <BaseInput
          value={password}
          type="password"
          placeholder="Insira seu endereço de password"
          onChange={setPassword}
          label="Password:"
        />
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}
