import { useState } from "react";

// Hook responsável de pegar os dados do formulário e enviar para o backend (Servidor) - Faz a requisição POST ou seja, utilize em componentes que precisam enviar dados para o servidor (ex: Login, Cadastro, etc), em handleSubmit
export default function usePost() {
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [responseToken, setResponseToken] = useState("");

  async function registerData<T>({
    url,
    data,
    token,
  }: {
    url: string;
    data: T;
    token?: string;
  }) {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    // Em caso de ter token, adiciona no header da requisição.
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    try {
      // Faz a requisição POST para o endpoint fornecido
      const res = await fetch(`https://api.example.com/${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(data),
      });

      setSuccess(true);
      const resData = await res.json();
      setResponseToken(resData.token); // Salvar o token na variável reativa
    } catch (error) {
      if (error instanceof Error) {
        setError(error);
      }
    }
  }
  return {
    registerData,
    success,
    error,
    responseToken,
  };
}
