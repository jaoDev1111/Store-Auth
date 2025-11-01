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
  const [isVisiblePassword, setIsVisiblePassword] = useState<boolean>(false);
  const { registerData, responseToken } = usePost();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userData: IUserLogin = {
      email,
      password,
    };

    console.log(userData);
    console.log(e);
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
      className="bg-[#f1f1f1] h-screen px-4"
      fullWidth={true}
    >
      <BaseContainer
        className="border border-zinc-100 px-0 py-6 md:px-8 md:py-22 bg-white/20 shadow-xs rounded-md"
        size="xs"
        alignContent="center"
        direction="col"
      >
        <form
          className="flex flex-col gap-3 w-full md:w-[80%] px-8 md:px-0"
          onSubmit={handleLogin}
        >
          <BaseInput
            id="email"
            autoComplete="email"
            autoFocus
            value={email}
            type="email"
            placeholder="E-mail"
            onChange={setEmail}
            label="Email:"
            labelFor="email"
            requiredLabel={true}
          />

          <BaseInput
            id="password"
            value={password}
            type={isVisiblePassword ? "text" : "password"}
            placeholder="Senha"
            onChange={setPassword}
            label="Password:"
            labelFor="password"
            passwordToggleVisible={true} // habilita o toggle de senha
            isPasswordVisible={isVisiblePassword} // indica se o password está visível
            onTogglePassword={() => setIsVisiblePassword((prev) => !prev)}
            requiredLabel={true}
          />

          <BaseButton
            type="submit"
            className="rounded-sm mt-6"
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
