import { useState } from "react";
import { BaseInput } from "../components/BaseInput";
import usePost from "../hooks/usePost";
import { useAuthStore } from "../stores/authStore";
import { BaseButton } from "../components/BaseButton";
import { BaseContainer } from "../components/BaseContainer";

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

    console.log(userData);
    // Daria para ver o token recebido do backend no console
    console.log(responseToken);

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
    <BaseContainer
      alignContent="center"
      className="bg-[#f1f1f1] h-screen"
      fullWidth={true}
    >
      <BaseContainer size="sm" alignContent="center" direction="col">
        <form className="flex flex-col gap-3 w-full" onSubmit={handleLogin}>
          <BaseInput
            id="email"
            autoComplete="email"
            autoFocus
            value={email}
            type="email"
            placeholder="Insira seu endereço de Email"
            onChange={setEmail}
            label="Email:"
            labelFor="email"
            requiredLabel={true}
          />

          <BaseInput
            id="password"
            value={password}
            type="password"
            placeholder="Insira seu endereço de password"
            onChange={setPassword}
            label="Password:"
            labelFor="password"
          />

          <BaseButton
            type="submit"
            className="rounded-sm mt-4"
            variant="primary"
            size="md"
          >
            Fazer Login
          </BaseButton>
        </form>
      </BaseContainer>
    </BaseContainer>
  );
}
